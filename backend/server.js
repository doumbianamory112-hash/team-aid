import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use((err, _req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ message: 'JSON invalide.' });
  }
  next(err);
});

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'team_aid',
  waitForConnections: true,
  connectionLimit: 10,
});

const safeDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

app.get('/api/health', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 as ok');
    res.json({ ok: true, db: rows[0].ok === 1 });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
});

app.get('/api/formations', async (_req, res) => {
  const [rows] = await pool.query('SELECT id, nom FROM formations WHERE active = 1 ORDER BY id');
  res.json(rows);
});

app.get('/api/pays', async (_req, res) => {
  const [rows] = await pool.query('SELECT id, nom FROM pays ORDER BY nom');
  res.json(rows);
});

app.get('/api/stats', async (_req, res) => {
  const [[total]] = await pool.query('SELECT COUNT(*) as total FROM inscriptions WHERE deleted_at IS NULL');
  const [[trash]] = await pool.query('SELECT COUNT(*) as total FROM corbeille');
  const [[formations]] = await pool.query('SELECT COUNT(*) as total FROM formations WHERE active = 1');
  const [[pays]] = await pool.query('SELECT COUNT(*) as total FROM (SELECT DISTINCT pays_id FROM inscriptions WHERE deleted_at IS NULL) t');
  res.json({ total: total.total, trash: trash.total, formations: formations.total, pays: pays.total });
});

app.post('/api/register', async (req, res) => {
  const {
    nom,
    prenom,
    sexe,
    dateNaissance,
    telephone,
    email,
    ville,
    paysId,
    formationId,
    niveauEtude,
    motivation,
  } = req.body;

  if (!nom || !prenom || !email || !telephone || !ville || !paysId || !formationId || !niveauEtude || !motivation) {
    return res.status(400).json({ message: 'Veuillez remplir tous les champs obligatoires.' });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO inscriptions (nom, prenom, sexe, date_naissance, telephone, email, ville, pays_id, formation_id, niveau_etude, motivation, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [nom, prenom, sexe, dateNaissance, telephone, email, ville, paysId, formationId, niveauEtude, motivation, safeDate]
    );

    res.status(201).json({ message: 'Inscription enregistrée avec succès.', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l’inscription.', error: error.message });
  }
});

app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email et mot de passe requis.' });
  }

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@team-aid.local';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (email.toLowerCase() === adminEmail.toLowerCase() && password === adminPassword) {
    return res.json({
      message: 'Connexion réussie.',
      user: { email: adminEmail, role: 'admin' },
    });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ? AND role = ?', [email, 'admin']);
    const user = rows[0];
    if (!user) {
      return res.status(401).json({ message: 'Identifiants invalides.' });
    }

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      return res.status(401).json({ message: 'Identifiants invalides.' });
    }

    return res.json({ message: 'Connexion réussie.', user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    return res.status(401).json({ message: 'Identifiants invalides.' });
  }
});

app.get('/api/inscriptions', async (req, res) => {
  const { search = '', formation = '', pays = '' } = req.query;
  let query = `
    SELECT i.*, f.nom AS formation, p.nom AS pays
    FROM inscriptions i
    JOIN formations f ON f.id = i.formation_id
    JOIN pays p ON p.id = i.pays_id
    WHERE i.deleted_at IS NULL
  `;
  const params = [];

  if (search) {
    query += ' AND (i.nom LIKE ? OR i.prenom LIKE ? OR i.email LIKE ?)';
    const value = `%${search}%`;
    params.push(value, value, value);
  }

  if (formation) {
    query += ' AND i.formation_id = ?';
    params.push(Number(formation));
  }

  if (pays) {
    query += ' AND i.pays_id = ?';
    params.push(Number(pays));
  }

  query += ' ORDER BY i.id DESC LIMIT 50';
  const [rows] = await pool.query(query, params);
  res.json(rows);
});

app.get('/api/corbeille', async (req, res) => {
  const [rows] = await pool.query(`
    SELECT c.*, i.nom, i.prenom, i.email, i.telephone, i.niveau_etude, f.nom AS formation, p.nom AS pays
    FROM corbeille c
    JOIN inscriptions i ON i.id = c.inscription_id
    JOIN formations f ON f.id = i.formation_id
    JOIN pays p ON p.id = i.pays_id
    ORDER BY c.deleted_at DESC
  `);
  res.json(rows);
});

app.post('/api/inscriptions/:id/delete', async (req, res) => {
  const { id } = req.params;
  await pool.query('UPDATE inscriptions SET deleted_at = NOW() WHERE id = ?', [id]);
  await pool.query('INSERT INTO corbeille (inscription_id) VALUES (?)', [id]);
  res.json({ message: 'Inscription déplacée en corbeille.' });
});

app.post('/api/inscriptions/:id/restore', async (req, res) => {
  const { id } = req.params;
  await pool.query('UPDATE inscriptions SET deleted_at = NULL WHERE id = ?', [id]);
  await pool.query('DELETE FROM corbeille WHERE inscription_id = ?', [id]);
  res.json({ message: 'Inscription restaurée.' });
});

app.post('/api/inscriptions/:id/destroy', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM corbeille WHERE inscription_id = ?', [id]);
    await pool.query('DELETE FROM inscriptions WHERE id = ?', [id]);
    res.json({ message: 'Inscription supprimée définitivement.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression définitive.', error: error.message });
  }
});

app.post('/api/corbeille/clear', async (_req, res) => {
  try {
    await pool.query(`
      DELETE i, c
      FROM inscriptions i
      JOIN corbeille c ON c.inscription_id = i.id
    `);
    res.json({ message: 'Corbeille vidée avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors du vidage de la corbeille.', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});

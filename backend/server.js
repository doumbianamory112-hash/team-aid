import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 5000);

/* =========================================================
   CONFIGURATION
========================================================= */

const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:4173',
  'http://127.0.0.1:4173',
  'http://localhost:8080',
  'http://127.0.0.1:8080'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error('Origine non autorisée par CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

/* =========================================================
   CONTENT SECURITY POLICY
========================================================= */

app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https:",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data: https:",
      "connect-src 'self' https: http:",
      "media-src 'self' data: blob: https:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'"
    ].join('; ')
  );

  next();
});

/* =========================================================
   GESTION DES ERREURS JSON
========================================================= */

app.use((err, _req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      message: 'JSON invalide.'
    });
  }

  next(err);
});

/* =========================================================
   CONNEXION MYSQL
========================================================= */

const poolConfig = {
  waitForConnections: true,
  connectionLimit: 10
};

/*
  Railway fournit MYSQL_URL.
  En local, le code peut utiliser DB_HOST / DB_USER etc.
*/

const pool = mysql.createPool(
  process.env.MYSQL_URL || {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'team_aid',
    ...poolConfig
  }
);

if (process.env.MYSQL_URL || process.env.DATABASE_URL) {
  console.log('MySQL: connexion via MYSQL_URL/DATABASE_URL');
} else {
  console.log('MySQL: connexion via DB_HOST/DB_USER/DB_NAME');
}

/* =========================================================
   TEST DATABASE
========================================================= */

app.get('/api/health', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 AS ok');

    res.json({
      ok: true,
      db: rows[0].ok === 1
    });
  } catch (error) {
    console.error('Database health error:', error);

    res.status(500).json({
      ok: false,
      error: error.message
    });
  }
});

/* =========================================================
   FORMATIONS
========================================================= */

app.get('/api/formations', async (_req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, nom FROM formations WHERE active = 1 ORDER BY id'
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Erreur lors du chargement des formations.'
    });
  }
});

/* =========================================================
   PAYS
========================================================= */

app.get('/api/pays', async (_req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, nom FROM pays ORDER BY nom'
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Erreur lors du chargement des pays.'
    });
  }
});

/* =========================================================
   STATISTIQUES
========================================================= */

app.get('/api/stats', async (_req, res) => {
  try {
    const [[total]] = await pool.query(
      'SELECT COUNT(*) AS total FROM inscriptions WHERE deleted_at IS NULL'
    );

    const [[trash]] = await pool.query(
      'SELECT COUNT(*) AS total FROM corbeille'
    );

    const [[formations]] = await pool.query(
      'SELECT COUNT(*) AS total FROM formations WHERE active = 1'
    );

    const [[pays]] = await pool.query(
      `SELECT COUNT(*) AS total
       FROM (
         SELECT DISTINCT pays_id
         FROM inscriptions
         WHERE deleted_at IS NULL
       ) t`
    );

    res.json({
      total: total.total,
      trash: trash.total,
      formations: formations.total,
      pays: pays.total
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Erreur lors du chargement des statistiques.'
    });
  }
});

/* =========================================================
   INSCRIPTION
========================================================= */

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
    pays,
    formation,
    niveauEtude,
    motivation
  } = req.body;

  if (
    !nom ||
    !prenom ||
    !email ||
    !telephone ||
    !ville ||
    !niveauEtude ||
    !motivation
  ) {
    return res.status(400).json({
      message: 'Veuillez remplir tous les champs obligatoires.'
    });
  }

  try {
    const resolvePaysId = async (paysValue) => {
      const normalized = String(paysValue ?? '').trim();
      if (!normalized) return null;

      const numericValue = Number(normalized);
      if (Number.isInteger(numericValue) && numericValue > 0) {
        return numericValue;
      }

      const [rows] = await pool.query(
        'SELECT id FROM pays WHERE nom = ? LIMIT 1',
        [normalized]
      );

      if (rows[0]?.id) {
        return Number(rows[0].id);
      }

      const [result] = await pool.query(
        'INSERT INTO pays (nom) VALUES (?)',
        [normalized]
      );

      return Number(result.insertId);
    };

    const resolveFormationId = async (formationValue) => {
      const normalized = String(formationValue ?? '').trim();
      if (!normalized) return null;

      const numericValue = Number(normalized);
      if (Number.isInteger(numericValue) && numericValue > 0) {
        return numericValue;
      }

      const [rows] = await pool.query(
        'SELECT id FROM formations WHERE nom = ? LIMIT 1',
        [normalized]
      );

      if (rows[0]?.id) {
        return Number(rows[0].id);
      }

      const [result] = await pool.query(
        'INSERT INTO formations (nom, active) VALUES (?, 1)',
        [normalized]
      );

      return Number(result.insertId);
    };

    const finalPaysId = await resolvePaysId(paysId ?? pays);
    const finalFormationId = await resolveFormationId(formationId ?? formation);

    if (!finalPaysId || !finalFormationId) {
      return res.status(400).json({
        message: 'Veuillez sélectionner un pays et une formation.'
      });
    }

    const safeDate = new Date()
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');

    const [result] = await pool.query(
      `INSERT INTO inscriptions
      (
        nom,
        prenom,
        sexe,
        date_naissance,
        telephone,
        email,
        ville,
        pays_id,
        formation_id,
        niveau_etude,
        motivation,
        created_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nom,
        prenom,
        sexe,
        dateNaissance,
        telephone,
        email,
        ville,
        finalPaysId,
        finalFormationId,
        niveauEtude,
        motivation,
        safeDate
      ]
    );

    res.status(201).json({
      message: 'Inscription enregistrée avec succès.',
      id: result.insertId
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Erreur lors de l’inscription.',
      error: error.message
    });
  }
});

/* =========================================================
   ADMIN LOGIN
========================================================= */

app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'Email et mot de passe requis.'
    });
  }

  const adminEmail =
    process.env.ADMIN_EMAIL || 'admin@team-aid.local';

  const adminPassword =
    process.env.ADMIN_PASSWORD || 'admin123';

  if (
    email.toLowerCase() === adminEmail.toLowerCase() &&
    password === adminPassword
  ) {
    return res.json({
      message: 'Connexion réussie.',
      user: {
        email: adminEmail,
        role: 'admin'
      }
    });
  }

  try {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE email = ? AND role = ?',
      [email, 'admin']
    );

    const user = rows[0];

    if (!user) {
      return res.status(401).json({
        message: 'Identifiants invalides.'
      });
    }

    const ok = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!ok) {
      return res.status(401).json({
        message: 'Identifiants invalides.'
      });
    }

    return res.json({
      message: 'Connexion réussie.',
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);

    return res.status(401).json({
      message: 'Identifiants invalides.'
    });
  }
});

/* =========================================================
   LISTE DES INSCRIPTIONS
========================================================= */

app.get('/api/inscriptions', async (req, res) => {
  try {
    const {
      search = '',
      formation = '',
      pays = ''
    } = req.query;

    let query = `
      SELECT
        i.*,
        f.nom AS formation,
        p.nom AS pays
      FROM inscriptions i
      JOIN formations f ON f.id = i.formation_id
      JOIN pays p ON p.id = i.pays_id
      WHERE i.deleted_at IS NULL
    `;

    const params = [];

    if (search) {
      query += `
        AND (
          i.nom LIKE ?
          OR i.prenom LIKE ?
          OR i.email LIKE ?
        )
      `;

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
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Erreur lors du chargement des inscriptions.'
    });
  }
});

/* =========================================================
   CORBEILLE
========================================================= */

app.get('/api/corbeille', async (_req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        c.*,
        i.nom,
        i.prenom,
        i.email,
        i.telephone,
        i.niveau_etude,
        f.nom AS formation,
        p.nom AS pays
      FROM corbeille c
      JOIN inscriptions i
        ON i.id = c.inscription_id
      JOIN formations f
        ON f.id = i.formation_id
      JOIN pays p
        ON p.id = i.pays_id
      ORDER BY c.deleted_at DESC
    `);

    res.json(rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Erreur lors du chargement de la corbeille.'
    });
  }
});

/* =========================================================
   SUPPRIMER UNE INSCRIPTION
========================================================= */

app.post('/api/inscriptions/:id/delete', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query(
      'UPDATE inscriptions SET deleted_at = NOW() WHERE id = ?',
      [id]
    );

    await pool.query(
      'INSERT INTO corbeille (inscription_id) VALUES (?)',
      [id]
    );

    res.json({
      message: 'Inscription déplacée en corbeille.'
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Erreur lors du déplacement vers la corbeille.'
    });
  }
});

/* =========================================================
   RESTAURER UNE INSCRIPTION
========================================================= */

app.post('/api/inscriptions/:id/restore', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query(
      'UPDATE inscriptions SET deleted_at = NULL WHERE id = ?',
      [id]
    );

    await pool.query(
      'DELETE FROM corbeille WHERE inscription_id = ?',
      [id]
    );

    res.json({
      message: 'Inscription restaurée.'
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Erreur lors de la restauration.'
    });
  }
});

/* =========================================================
   SUPPRESSION DEFINITIVE
========================================================= */

app.post('/api/inscriptions/:id/destroy', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query(
      'DELETE FROM corbeille WHERE inscription_id = ?',
      [id]
    );

    await pool.query(
      'DELETE FROM inscriptions WHERE id = ?',
      [id]
    );

    res.json({
      message: 'Inscription supprimée définitivement.'
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Erreur lors de la suppression définitive.',
      error: error.message
    });
  }
});

/* =========================================================
   VIDER LA CORBEILLE
========================================================= */

app.post('/api/corbeille/clear', async (_req, res) => {
  try {
    await pool.query(`
      DELETE i, c
      FROM inscriptions i
      JOIN corbeille c
        ON c.inscription_id = i.id
    `);

    res.json({
      message: 'Corbeille vidée avec succès.'
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Erreur lors du vidage de la corbeille.',
      error: error.message
    });
  }
});

/* =========================================================
   FRONTEND
========================================================= */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendDist = path.resolve(
  __dirname,
  '../frontend/dist'
);

console.log('Frontend directory:', frontendDist);

/*
  Vérification simple du dossier frontend.
*/

app.use(
  express.static(frontendDist, {
    index: false
  })
);

/*
  Route principale.
*/

app.get('/', (_req, res) => {
  res.sendFile(
    path.join(frontendDist, 'index.html'),
    (error) => {
      if (error) {
        console.error(
          'Frontend index.html introuvable:',
          error.message
        );

        res.status(500).send(
          'Frontend non disponible. Le dossier frontend/dist n’a pas été généré.'
        );
      }
    }
  );
});

/*
  Favicon.
  Évite une erreur inutile dans la console si aucun favicon
  n'est présent.
*/

app.get('/favicon.ico', (_req, res) => {
  res.status(204).end();
});

/*
  Routes frontend supplémentaires.
  Important pour React/Vite et autres SPA.
*/

app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({
      message: 'Route API introuvable.'
    });
  }

  res.sendFile(
    path.join(frontendDist, 'index.html'),
    (error) => {
      if (error) {
        console.error(
          'Erreur frontend:',
          error.message
        );

        if (!res.headersSent) {
          res.status(500).send(
            'Frontend non disponible.'
          );
        }
      }
    }
  );
});

/* =========================================================
   DEMARRAGE
========================================================= */

app.listen(port, '0.0.0.0', () => {
  console.log(
    `Backend running on http://0.0.0.0:${port}`
  );
});
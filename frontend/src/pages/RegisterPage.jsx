import { useState } from 'react';
import { apiUrl } from '../utils/api';

const shareMessage = 'Rejoignez TEAM AID et accédez à des formations gratuites qui changent des vies ! Inscrivez-vous maintenant : ';

const FORMATIONS = [
  'Développement Web',
  'Design Graphique',
  'Marketing Digital',
  'Bureautique',
  'Comptabilité',
  'Réseaux et Sécurité',
  'Communication',
  'Gestion de Projet',
  'Entrepreneuriat',
  'Leadership',
];

const PAYS = [
  'Mali', 'Sénégal', 'Côte d\'Ivoire', 'Burkina Faso', 'Guinée', 'Niger', 'Togo', 'Bénin', 'Cameroun', 'Gabon',
  'Mauritanie', 'Tchad', 'Congo', 'RD Congo', 'Madagascar', 'Algérie', 'Maroc', 'Tunisie', 'Égypte', 'Libye',
  'France', 'Belgique', 'Canada', 'États-Unis', 'Brésil', 'Nigeria', 'Ghana', 'Kenya', 'Ethiopie', 'Afrique du Sud',
  'Allemagne', 'Espagne', 'Italie', 'Portugal', 'Suisse', 'Pays-Bas', 'Royaume-Uni', 'Suisse', 'Sénégal',
  'Congo', 'Guinée-Bissau', 'Cap-Vert', 'Sierra Leone', 'Liberia', 'Gambie', 'Mali', 'Maurice', 'Seychelles', 'Tanzanie'
];

export default function RegisterPage() {
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    sexe: 'M',
    dateNaissance: '',
    telephone: '',
    email: '',
    ville: '',
    pays: '',
    formation: '',
    niveauEtude: '',
    motivation: '',
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      pays: form.pays.trim(),
      formation: form.formation.trim(),
    };

    const response = await fetch(apiUrl('/api/register'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (response.ok) {
      setSuccess(true);
    } else {
      alert(data.message || 'Erreur');
    }
  };

  const shareLink = 'https://team-aid.local';

  const handleShare = (type) => {
    const url = `${shareMessage}${shareLink}`;
    if (type === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(url)}`, '_blank');
    } else if (type === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}`, '_blank');
    } else if (type === 'copy') {
      navigator.clipboard.writeText(url);
      alert('Lien copié !');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-6 rounded-2xl border border-cyan-400/40 bg-slate-900/80 p-4 text-center text-sm text-cyan-200">
          <div className="flex flex-wrap justify-center gap-4">
            <span>Données sécurisées</span>
            <span>2 minutes seulement</span>
            <span>100% gratuit</span>
          </div>
        </div>

        <div className="rounded-3xl border border-cyan-500/40 bg-slate-900/80 p-8 glow-card">
          <h1 className="text-3xl font-bold text-cyan-300">Inscription TEAM AID</h1>

          <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
            <input className="rounded-xl border border-cyan-400/30 bg-slate-950 p-3" name="nom" placeholder="Nom" value={form.nom} onChange={handleChange} required />
            <input className="rounded-xl border border-cyan-400/30 bg-slate-950 p-3" name="prenom" placeholder="Prénom" value={form.prenom} onChange={handleChange} required />
            <select className="rounded-xl border border-cyan-400/30 bg-slate-950 p-3" name="sexe" value={form.sexe} onChange={handleChange}>
              <option value="M">M</option>
              <option value="F">F</option>
              <option value="Autre">Autre</option>
            </select>
            <input type="date" className="rounded-xl border border-cyan-400/30 bg-slate-950 p-3" name="dateNaissance" value={form.dateNaissance} onChange={handleChange} required />
            <input className="rounded-xl border border-cyan-400/30 bg-slate-950 p-3" name="telephone" placeholder="Téléphone" value={form.telephone} onChange={handleChange} required />
            <input type="email" className="rounded-xl border border-cyan-400/30 bg-slate-950 p-3" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
            <input className="rounded-xl border border-cyan-400/30 bg-slate-950 p-3" name="ville" placeholder="Ville" value={form.ville} onChange={handleChange} required />

            <select className="rounded-xl border border-cyan-400/30 bg-slate-950 p-3 text-slate-100 w-full" name="pays" value={form.pays} onChange={handleChange} required>
              <option value="">-- Sélectionnez votre pays --</option>
              {[...new Set(PAYS)].sort().map((pays) => (
                <option key={pays} value={pays} className="bg-white text-slate-900">{pays}</option>
              ))}
            </select>

            <select className="rounded-xl border border-cyan-400/30 bg-slate-950 p-3 text-slate-100 w-full" name="formation" value={form.formation} onChange={handleChange} required>
              <option value="">-- Sélectionnez une formation --</option>
              {FORMATIONS.map((formation) => (
                <option key={formation} value={formation} className="bg-white text-slate-900">{formation}</option>
              ))}
            </select>

            <input className="rounded-xl border border-cyan-400/30 bg-slate-950 p-3" name="niveauEtude" placeholder="Niveau d’étude" value={form.niveauEtude} onChange={handleChange} required />
            <textarea className="rounded-xl border border-cyan-400/30 bg-slate-950 p-3 md:col-span-2" name="motivation" placeholder="Motivation" rows="4" value={form.motivation} onChange={handleChange} required />
            <button type="submit" className="md:col-span-2 rounded-xl bg-blue-500 px-5 py-4 text-lg font-bold text-white shadow-[0_0_25px_rgba(10,132,255,0.7)]">
              Envoyer mon inscription — Gratuit
            </button>
          </form>

          {success && (
            <div className="mt-6 rounded-2xl border border-cyan-400/40 bg-slate-800 p-5 text-center">
              <div className="text-xl font-bold text-cyan-300">Inscription confirmée !</div>
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                <button onClick={() => handleShare('whatsapp')} className="rounded-full bg-emerald-500 px-4 py-2 font-semibold">WhatsApp</button>
                <button onClick={() => handleShare('facebook')} className="rounded-full bg-blue-600 px-4 py-2 font-semibold">Facebook</button>
                <button onClick={() => handleShare('copy')} className="rounded-full border border-cyan-400 px-4 py-2 font-semibold">Copier le lien</button>
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button onClick={() => handleShare('whatsapp')} className="rounded-full bg-emerald-500 px-4 py-2 font-semibold">WhatsApp</button>
            <button onClick={() => handleShare('facebook')} className="rounded-full bg-blue-600 px-4 py-2 font-semibold">Facebook</button>
            <button onClick={() => handleShare('copy')} className="rounded-full border border-cyan-400 px-4 py-2 font-semibold">Copier le lien</button>
          </div>

          <p className="mt-8 text-center text-xs text-slate-400">
            Votre confidentialité est respectée. Les données sont traitées uniquement pour votre inscription et l’accompagnement TEAM AID.
          </p>
        </div>
      </div>
    </div>
  );
}

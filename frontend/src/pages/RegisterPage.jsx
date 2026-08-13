import { useEffect, useRef, useState } from 'react';
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/styles';
import { apiUrl } from '../utils/api';

const shareMessage = 'Rejoignez TEAM AID et accédez à des formations gratuites qui changent des vies ! Inscrivez-vous maintenant : ';

const FORMATIONS = [
  'Art Oratoire',
  'Français',
  'Informatique Bureautique',
  'Maintenance des ordinateurs',
  'Programmation Informatique',
   'Ventes',
  'Developpement personnel',
   'La lecture',
  'La liberté financière',
  'Anglais',
];

const PAYS = [
  { nom: 'Afghanistan', drapeau: '🇦🇫' },
  { nom: 'Afrique du Sud', drapeau: '🇿🇦' },
  { nom: 'Albanie', drapeau: '🇦🇱' },
  { nom: 'Algérie', drapeau: '🇩🇿' },
  { nom: 'Allemagne', drapeau: '🇩🇪' },
  { nom: 'Andorre', drapeau: '🇦🇩' },
  { nom: 'Angola', drapeau: '🇦🇴' },
  { nom: 'Antigua-et-Barbuda', drapeau: '🇦🇬' },
  { nom: 'Arabie saoudite', drapeau: '🇸🇦' },
  { nom: 'Argentine', drapeau: '🇦🇷' },
  { nom: 'Arménie', drapeau: '🇦🇲' },
  { nom: 'Australie', drapeau: '🇦🇺' },
  { nom: 'Autriche', drapeau: '🇦🇹' },
  { nom: 'Azerbaïdjan', drapeau: '🇦🇿' },

  { nom: 'Bahamas', drapeau: '🇧🇸' },
  { nom: 'Bahreïn', drapeau: '🇧🇭' },
  { nom: 'Bangladesh', drapeau: '🇧🇩' },
  { nom: 'Barbade', drapeau: '🇧🇧' },
  { nom: 'Belgique', drapeau: '🇧🇪' },
  { nom: 'Belize', drapeau: '🇧🇿' },
  { nom: 'Bénin', drapeau: '🇧🇯' },
  { nom: 'Bhoutan', drapeau: '🇧🇹' },
  { nom: 'Biélorussie', drapeau: '🇧🇾' },
  { nom: 'Bolivie', drapeau: '🇧🇴' },
  { nom: 'Bosnie-Herzégovine', drapeau: '🇧🇦' },
  { nom: 'Botswana', drapeau: '🇧🇼' },
  { nom: 'Brésil', drapeau: '🇧🇷' },
  { nom: 'Brunei', drapeau: '🇧🇳' },
  { nom: 'Bulgarie', drapeau: '🇧🇬' },
  { nom: 'Burkina Faso', drapeau: '🇧🇫' },
  { nom: 'Burundi', drapeau: '🇧🇮' },

  { nom: 'Cabo Verde', drapeau: '🇨🇻' },
  { nom: 'Cambodge', drapeau: '🇰🇭' },
  { nom: 'Cameroun', drapeau: '🇨🇲' },
  { nom: 'Canada', drapeau: '🇨🇦' },
  { nom: 'Chili', drapeau: '🇨🇱' },
  { nom: 'Chine', drapeau: '🇨🇳' },
  { nom: 'Chypre', drapeau: '🇨🇾' },
  { nom: 'Colombie', drapeau: '🇨🇴' },
  { nom: 'Comores', drapeau: '🇰🇲' },
  { nom: 'Congo', drapeau: '🇨🇬' },
  { nom: 'Costa Rica', drapeau: '🇨🇷' },
  { nom: 'Côte d’Ivoire', drapeau: '🇨🇮' },
  { nom: 'Croatie', drapeau: '🇭🇷' },
  { nom: 'Cuba', drapeau: '🇨🇺' },

  { nom: 'Danemark', drapeau: '🇩🇰' },
  { nom: 'Djibouti', drapeau: '🇩🇯' },
  { nom: 'Dominique', drapeau: '🇩🇲' },

  { nom: 'Égypte', drapeau: '🇪🇬' },
  { nom: 'El Salvador', drapeau: '🇸🇻' },
  { nom: 'Émirats arabes unis', drapeau: '🇦🇪' },
  { nom: 'Équateur', drapeau: '🇪🇨' },
  { nom: 'Érythrée', drapeau: '🇪🇷' },
  { nom: 'Espagne', drapeau: '🇪🇸' },
  { nom: 'Estonie', drapeau: '🇪🇪' },
  { nom: 'Eswatini', drapeau: '🇸🇿' },
  { nom: 'États-Unis', drapeau: '🇺🇸' },
  { nom: 'Éthiopie', drapeau: '🇪🇹' },

  { nom: 'Fidji', drapeau: '🇫🇯' },
  { nom: 'Finlande', drapeau: '🇫🇮' },
  { nom: 'France', drapeau: '🇫🇷' },

  { nom: 'Gabon', drapeau: '🇬🇦' },
  { nom: 'Gambie', drapeau: '🇬🇲' },
  { nom: 'Géorgie', drapeau: '🇬🇪' },
  { nom: 'Ghana', drapeau: '🇬🇭' },
  { nom: 'Grèce', drapeau: '🇬🇷' },
  { nom: 'Grenade', drapeau: '🇬🇩' },
  { nom: 'Guatemala', drapeau: '🇬🇹' },
  { nom: 'Guinée', drapeau: '🇬🇳' },
  { nom: 'Guinée-Bissau', drapeau: '🇬🇼' },
  { nom: 'Guinée équatoriale', drapeau: '🇬🇶' },
  { nom: 'Guyana', drapeau: '🇬🇾' },

  { nom: 'Haïti', drapeau: '🇭🇹' },
  { nom: 'Honduras', drapeau: '🇭🇳' },
  { nom: 'Hongrie', drapeau: '🇭🇺' },

  { nom: 'Îles Marshall', drapeau: '🇲🇭' },
  { nom: 'Îles Salomon', drapeau: '🇸🇧' },
  { nom: 'Inde', drapeau: '🇮🇳' },
  { nom: 'Indonésie', drapeau: '🇮🇩' },
  { nom: 'Irak', drapeau: '🇮🇶' },
  { nom: 'Iran', drapeau: '🇮🇷' },
  { nom: 'Irlande', drapeau: '🇮🇪' },
  { nom: 'Islande', drapeau: '🇮🇸' },
  { nom: 'Israël', drapeau: '🇮🇱' },
  { nom: 'Italie', drapeau: '🇮🇹' },

  { nom: 'Jamaïque', drapeau: '🇯🇲' },
  { nom: 'Japon', drapeau: '🇯🇵' },
  { nom: 'Jordanie', drapeau: '🇯🇴' },

  { nom: 'Kazakhstan', drapeau: '🇰🇿' },
  { nom: 'Kenya', drapeau: '🇰🇪' },
  { nom: 'Kirghizistan', drapeau: '🇰🇬' },
  { nom: 'Kiribati', drapeau: '🇰🇮' },
  { nom: 'Koweït', drapeau: '🇰🇼' },

  { nom: 'Laos', drapeau: '🇱🇦' },
  { nom: 'Lesotho', drapeau: '🇱🇸' },
  { nom: 'Lettonie', drapeau: '🇱🇻' },
  { nom: 'Liban', drapeau: '🇱🇧' },
  { nom: 'Liberia', drapeau: '🇱🇷' },
  { nom: 'Libye', drapeau: '🇱🇾' },
  { nom: 'Liechtenstein', drapeau: '🇱🇮' },
  { nom: 'Lituanie', drapeau: '🇱🇹' },
  { nom: 'Luxembourg', drapeau: '🇱🇺' },

  { nom: 'Macédoine du Nord', drapeau: '🇲🇰' },
  { nom: 'Madagascar', drapeau: '🇲🇬' },
  { nom: 'Malaisie', drapeau: '🇲🇾' },
  { nom: 'Malawi', drapeau: '🇲🇼' },
  { nom: 'Maldives', drapeau: '🇲🇻' },
  { nom: 'Mali', drapeau: '🇲🇱' },
  { nom: 'Malte', drapeau: '🇲🇹' },
  { nom: 'Maroc', drapeau: '🇲🇦' },
  { nom: 'Maurice', drapeau: '🇲🇺' },
  { nom: 'Mauritanie', drapeau: '🇲🇷' },
  { nom: 'Mexique', drapeau: '🇲🇽' },
  { nom: 'Micronésie', drapeau: '🇫🇲' },
  { nom: 'Moldavie', drapeau: '🇲🇩' },
  { nom: 'Monaco', drapeau: '🇲🇨' },
  { nom: 'Mongolie', drapeau: '🇲🇳' },
  { nom: 'Monténégro', drapeau: '🇲🇪' },
  { nom: 'Mozambique', drapeau: '🇲🇿' },
  { nom: 'Myanmar', drapeau: '🇲🇲' },

  { nom: 'Namibie', drapeau: '🇳🇦' },
  { nom: 'Nauru', drapeau: '🇳🇷' },
  { nom: 'Népal', drapeau: '🇳🇵' },
  { nom: 'Nicaragua', drapeau: '🇳🇮' },
  { nom: 'Niger', drapeau: '🇳🇪' },
  { nom: 'Nigeria', drapeau: '🇳🇬' },
  { nom: 'Norvège', drapeau: '🇳🇴' },
  { nom: 'Nouvelle-Zélande', drapeau: '🇳🇿' },

  { nom: 'Oman', drapeau: '🇴🇲' },

  { nom: 'Ouganda', drapeau: '🇺🇬' },
  { nom: 'Ouzbékistan', drapeau: '🇺🇿' },

  { nom: 'Pakistan', drapeau: '🇵🇰' },
  { nom: 'Palaos', drapeau: '🇵🇼' },
  { nom: 'Palestine', drapeau: '🇵🇸' },
  { nom: 'Panama', drapeau: '🇵🇦' },
  { nom: 'Papouasie-Nouvelle-Guinée', drapeau: '🇵🇬' },
  { nom: 'Paraguay', drapeau: '🇵🇾' },
  { nom: 'Pays-Bas', drapeau: '🇳🇱' },
  { nom: 'Pérou', drapeau: '🇵🇪' },
  { nom: 'Philippines', drapeau: '🇵🇭' },
  { nom: 'Pologne', drapeau: '🇵🇱' },
  { nom: 'Portugal', drapeau: '🇵🇹' },

  { nom: 'Qatar', drapeau: '🇶🇦' },

  { nom: 'République centrafricaine', drapeau: '🇨🇫' },
  { nom: 'République démocratique du Congo', drapeau: '🇨🇩' },
  { nom: 'République dominicaine', drapeau: '🇩🇴' },
  { nom: 'République de Corée', drapeau: '🇰🇷' },
  { nom: 'République populaire démocratique de Corée', drapeau: '🇰🇵' },
  { nom: 'République tchèque', drapeau: '🇨🇿' },
  { nom: 'Roumanie', drapeau: '🇷🇴' },
  { nom: 'Royaume-Uni', drapeau: '🇬🇧' },
  { nom: 'Russie', drapeau: '🇷🇺' },
  { nom: 'Rwanda', drapeau: '🇷🇼' },

  { nom: 'Saint-Christophe-et-Niévès', drapeau: '🇰🇳' },
  { nom: 'Sainte-Lucie', drapeau: '🇱🇨' },
  { nom: 'Saint-Marin', drapeau: '🇸🇲' },
  { nom: 'Saint-Vincent-et-les-Grenadines', drapeau: '🇻🇨' },
  { nom: 'Samoa', drapeau: '🇼🇸' },
  { nom: 'Sao Tomé-et-Principe', drapeau: '🇸🇹' },
  { nom: 'Sénégal', drapeau: '🇸🇳' },
  { nom: 'Serbie', drapeau: '🇷🇸' },
  { nom: 'Seychelles', drapeau: '🇸🇨' },
  { nom: 'Sierra Leone', drapeau: '🇸🇱' },
  { nom: 'Singapour', drapeau: '🇸🇬' },
  { nom: 'Slovaquie', drapeau: '🇸🇰' },
  { nom: 'Slovénie', drapeau: '🇸🇮' },
  { nom: 'Somalie', drapeau: '🇸🇴' },
  { nom: 'Soudan', drapeau: '🇸🇩' },
  { nom: 'Soudan du Sud', drapeau: '🇸🇸' },
  { nom: 'Sri Lanka', drapeau: '🇱🇰' },
  { nom: 'Suède', drapeau: '🇸🇪' },
  { nom: 'Suisse', drapeau: '🇨🇭' },
  { nom: 'Suriname', drapeau: '🇸🇷' },
  { nom: 'Syrie', drapeau: '🇸🇾' },

  { nom: 'Tadjikistan', drapeau: '🇹🇯' },
  { nom: 'Tanzanie', drapeau: '🇹🇿' },
  { nom: 'Tchad', drapeau: '🇹🇩' },
  { nom: 'Thaïlande', drapeau: '🇹🇭' },
  { nom: 'Timor-Leste', drapeau: '🇹🇱' },
  { nom: 'Togo', drapeau: '🇹🇬' },
  { nom: 'Tonga', drapeau: '🇹🇴' },
  { nom: 'Trinité-et-Tobago', drapeau: '🇹🇹' },
  { nom: 'Tunisie', drapeau: '🇹🇳' },
  { nom: 'Türkiye', drapeau: '🇹🇷' },
  { nom: 'Turkménistan', drapeau: '🇹🇲' },
  { nom: 'Tuvalu', drapeau: '🇹🇻' },

  { nom: 'Ukraine', drapeau: '🇺🇦' },
  { nom: 'Uruguay', drapeau: '🇺🇾' },

  { nom: 'Vanuatu', drapeau: '🇻🇺' },
  { nom: 'Vatican', drapeau: '🇻🇦' },
  { nom: 'Venezuela', drapeau: '🇻🇪' },
  { nom: 'Viêt Nam', drapeau: '🇻🇳' },

  { nom: 'Yémen', drapeau: '🇾🇪' },

  { nom: 'Zambie', drapeau: '🇿🇲' },
  { nom: 'Zimbabwe', drapeau: '🇿🇼' }
];

const PAYS_OPTIONS = [...new Map(PAYS.map((pays) => [pays.nom, pays])).values()];

export default function RegisterPage() {
  const phoneInputRef = useRef(null);
  const itiRef = useRef(null);
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

  useEffect(() => {
    if (!phoneInputRef.current) return undefined;

    const iti = intlTelInput(phoneInputRef.current, {
      initialCountry: 'ml',
      countryOrder: ['ml', 'fr', 'ci', 'sn', 'bf', 'gn', 'tg', 'bj', 'cm', 'ga', 'us', 'gb'],
      countrySearch: true,
      showFlags: true,
      separateDialCode: true,
      countrySelectorMode: 'AUTO',
      countryNameLocale: 'fr',
      formatAsYouType: true,
      loadUtils: () => import('intl-tel-input/utils'),
      placeholderNumberType: 'MOBILE',
      customPlaceholder: function (_, countryData) {
        return countryData && countryData.dialCode ? ` ${countryData.dialCode}` : '';
      },
    });

    itiRef.current = iti;

    const syncPhoneValue = () => {
      if (!intlTelInput.utils) {
        return;
      }

      const number = iti.getNumber();
      setForm((prev) => ({ ...prev, telephone: number || '' }));
    };

    phoneInputRef.current.addEventListener('input', syncPhoneValue);
    phoneInputRef.current.addEventListener('countrychange', syncPhoneValue);

    syncPhoneValue();

    return () => {
      if (itiRef.current) {
        itiRef.current.destroy();
        itiRef.current = null;
      }
    };
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (itiRef.current && !itiRef.current.isValidNumber()) {
      alert('Veuillez saisir un numéro de téléphone valide.');
      return;
    }

    const fullPhone = itiRef.current ? itiRef.current.getNumber() : form.telephone.trim();

    const payload = {
      ...form,
      telephone: fullPhone,
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

  const shareLink = 'https://team-aid-production.up.railway.app';

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
    <div className="register-page-shell min-h-screen bg-slate-950 text-slate-100">
      <div className="register-bg" aria-hidden="true" />

      <div className="register-content mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="mb-6 rounded-2xl border border-cyan-400/40 bg-slate-900/80 p-4 text-center text-sm text-cyan-200 backdrop-blur-sm">
          <div className="flex flex-wrap justify-center gap-4">
            <span>Données sécurisées</span>
            <span>2 minutes seulement</span>
            <span>100% gratuit</span>
          </div>
        </div>

        <div className="register-form rounded-3xl border border-cyan-500/40 bg-slate-900/80 p-8 glow-card backdrop-blur-sm">
          <h1 className="text-3xl font-bold text-cyan-300">Inscription TEAM AID</h1>

          <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
            <input className="rounded-xl border border-cyan-400/30 bg-slate-950 p-3" name="nom" placeholder="Nom" value={form.nom} onChange={handleChange} required />
            <input className="rounded-xl border border-cyan-400/30 bg-slate-950 p-3" name="prenom" placeholder="Prénom" value={form.prenom} onChange={handleChange} required />
            <select className="rounded-xl border border-cyan-400/30 bg-slate-950 p-3" name="sexe" value={form.sexe} onChange={handleChange}>
              <option value="M">M</option>
              <option value="F">F</option>
              <option value="Autre">Autre</option>
            </select>
            <div className="date-field">
              <label htmlFor="dateNaissance" className="mb-2 block text-sm font-medium text-slate-200">
                Date de naissance
              </label>
              <p className="mb-2 text-xs text-slate-400">
                Veuillez sélectionner votre date de naissance
              </p>
              <input
                id="dateNaissance"
                type="date"
                className="w-full rounded-xl border border-cyan-400/30 bg-slate-950 p-3 text-slate-100"
                name="dateNaissance"
                value={form.dateNaissance}
                onChange={handleChange}
                aria-label="Sélectionnez votre date de naissance"
                title="Sélectionnez votre date de naissance"
                required
              />
            </div>
            <div className="md:col-span-1">
              <label className="mb-2 block text-sm text-slate-300">Téléphone</label>
              <input
                ref={phoneInputRef}
                className="rounded-xl border border-cyan-400/30 bg-slate-950 p-3"
                name="telephone"
                placeholder="Numéro de téléphone"
                defaultValue=""
                required
              />
            </div>
            <input type="email" className="rounded-xl border border-cyan-400/30 bg-slate-950 p-3" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
            <input className="rounded-xl border border-cyan-400/30 bg-slate-950 p-3" name="ville" placeholder="Ville" value={form.ville} onChange={handleChange} required />

            <select className="rounded-xl border border-cyan-400/30 bg-slate-950 p-3 text-slate-100 w-full" name="pays" value={form.pays} onChange={handleChange} required>
              <option value="">-- Sélectionnez votre pays --</option>
              {PAYS_OPTIONS.map((pays) => (
                <option key={pays.nom} value={pays.nom} className="bg-white text-slate-900">
                  {pays.drapeau} {pays.nom}
                </option>
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

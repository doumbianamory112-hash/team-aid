const trustBadges = [
  'Inscription 100% gratuite',
  'Résultat en 24h',
  'Vos données protégées',
];

const whyJoin = [
  { title: 'Formations pratiques', text: 'Apprenez vite avec des contenus utiles et immédiatement applicables.' },
  { title: 'Réseau communautaire', text: 'Interagissez, partagez et grandissez au sein d’une communauté engagée.' },
  { title: 'Ouverture internationale', text: 'Accédez à des opportunités de travail et d’échange à l’échelle mondiale.' },
];

const steps = ['Remplir le formulaire', 'Confirmation', 'Commencer à apprendre'];

const formationsList = [
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

const countriesList = [
  { name: 'Pays du monde', flag: '🌍' },
  { name: 'Afghanistan', flag: '🇦🇫' },
  { name: 'Afrique du Sud', flag: '🇿🇦' },
  { name: 'Albanie', flag: '🇦🇱' },
  { name: 'Algérie', flag: '🇩🇿' },
  { name: 'Allemagne', flag: '🇩🇪' },
  { name: 'Andorre', flag: '🇦🇩' },
  { name: 'Angola', flag: '🇦🇴' },
  { name: 'Antigua-et-Barbuda', flag: '🇦🇬' },
  { name: 'Arabie saoudite', flag: '🇸🇦' },
  { name: 'Argentine', flag: '🇦🇷' },
  { name: 'Arménie', flag: '🇦🇲' },
  { name: 'Australie', flag: '🇦🇺' },
  { name: 'Autriche', flag: '🇦🇹' },
  { name: 'Azerbaïdjan', flag: '🇦🇿' },
  { name: 'Bahamas', flag: '🇧🇸' },
  { name: 'Bahreïn', flag: '🇧🇭' },
  { name: 'Bangladesh', flag: '🇧🇩' },
  { name: 'Barbade', flag: '🇧🇧' },
  { name: 'Belgique', flag: '🇧🇪' },
  { name: 'Belize', flag: '🇧🇿' },
  { name: 'Bénin', flag: '🇧🇯' },
  { name: 'Bhoutan', flag: '🇧🇹' },
  { name: 'Biélorussie', flag: '🇧🇾' },
  { name: 'Bolivie', flag: '🇧🇴' },
  { name: 'Bosnie-Herzégovine', flag: '🇧🇦' },
  { name: 'Botswana', flag: '🇧🇼' },
  { name: 'Brésil', flag: '🇧🇷' },
  { name: 'Brunei', flag: '🇧🇳' },
  { name: 'Bulgarie', flag: '🇧🇬' },
  { name: 'Burkina Faso', flag: '🇧🇫' },
  { name: 'Burundi', flag: '🇧🇮' },
  { name: 'Cabo Verde', flag: '🇨🇻' },
  { name: 'Cambodge', flag: '🇰🇭' },
  { name: 'Cameroun', flag: '🇨🇲' },
  { name: 'Canada', flag: '🇨🇦' },
  { name: 'Chili', flag: '🇨🇱' },
  { name: 'Chine', flag: '🇨🇳' },
  { name: 'Chypre', flag: '🇨🇾' },
  { name: 'Colombie', flag: '🇨🇴' },
  { name: 'Comores', flag: '🇰🇲' },
  { name: 'Congo', flag: '🇨🇬' },
  { name: 'Corée du Nord', flag: '🇰🇵' },
  { name: 'Corée du Sud', flag: '🇰🇷' },
  { name: 'Costa Rica', flag: '🇨🇷' },
  { name: 'Côte d’Ivoire', flag: '🇨🇮' },
  { name: 'Croatie', flag: '🇭🇷' },
  { name: 'Cuba', flag: '🇨🇺' },
  { name: 'Danemark', flag: '🇩🇰' },
  { name: 'Djibouti', flag: '🇩🇯' },
  { name: 'Dominique', flag: '🇩🇲' },
  { name: 'Égypte', flag: '🇪🇬' },
  { name: 'Émirats arabes unis', flag: '🇦🇪' },
  { name: 'Équateur', flag: '🇪🇨' },
  { name: 'Érythrée', flag: '🇪🇷' },
  { name: 'Espagne', flag: '🇪🇸' },
  { name: 'Estonie', flag: '🇪🇪' },
  { name: 'Eswatini', flag: '🇸🇿' },
  { name: 'États-Unis', flag: '🇺🇸' },
  { name: 'Éthiopie', flag: '🇪🇹' },
  { name: 'Fidji', flag: '🇫🇯' },
  { name: 'Finlande', flag: '🇫🇮' },
  { name: 'France', flag: '🇫🇷' },
  { name: 'Gabon', flag: '🇬🇦' },
  { name: 'Gambie', flag: '🇬🇲' },
  { name: 'Géorgie', flag: '🇬🇪' },
  { name: 'Ghana', flag: '🇬🇭' },
  { name: 'Grèce', flag: '🇬🇷' },
  { name: 'Grenade', flag: '🇬🇩' },
  { name: 'Guatemala', flag: '🇬🇹' },
  { name: 'Guinée', flag: '🇬🇳' },
  { name: 'Guinée-Bissau', flag: '🇬🇼' },
  { name: 'Guinée équatoriale', flag: '🇬🇶' },
  { name: 'Guyana', flag: '🇬🇾' },
  { name: 'Haïti', flag: '🇭🇹' },
  { name: 'Honduras', flag: '🇭🇳' },
  { name: 'Hongrie', flag: '🇭🇺' },
  { name: 'Îles Marshall', flag: '🇲🇭' },
  { name: 'Îles Salomon', flag: '🇸🇧' },
  { name: 'Inde', flag: '🇮🇳' },
  { name: 'Indonésie', flag: '🇮🇩' },
  { name: 'Irak', flag: '🇮🇶' },
  { name: 'Iran', flag: '🇮🇷' },
  { name: 'Irlande', flag: '🇮🇪' },
  { name: 'Islande', flag: '🇮🇸' },
  { name: 'Israël', flag: '🇮🇱' },
  { name: 'Italie', flag: '🇮🇹' },
  { name: 'Jamaïque', flag: '🇯🇲' },
  { name: 'Japon', flag: '🇯🇵' },
  { name: 'Jordanie', flag: '🇯🇴' },
  { name: 'Kazakhstan', flag: '🇰🇿' },
  { name: 'Kenya', flag: '🇰🇪' },
  { name: 'Kirghizistan', flag: '🇰🇬' },
  { name: 'Kiribati', flag: '🇰🇮' },
  { name: 'Koweït', flag: '🇰🇼' },
  { name: 'Laos', flag: '🇱🇦' },
  { name: 'Lesotho', flag: '🇱🇸' },
  { name: 'Lettonie', flag: '🇱🇻' },
  { name: 'Liban', flag: '🇱🇧' },
  { name: 'Liberia', flag: '🇱🇷' },
  { name: 'Libye', flag: '🇱🇾' },
  { name: 'Liechtenstein', flag: '🇱🇮' },
  { name: 'Lituanie', flag: '🇱🇹' },
  { name: 'Luxembourg', flag: '🇱🇺' },
  { name: 'Macédoine du Nord', flag: '🇲🇰' },
  { name: 'Madagascar', flag: '🇲🇬' },
  { name: 'Malaisie', flag: '🇲🇾' },
  { name: 'Malawi', flag: '🇲🇼' },
  { name: 'Maldives', flag: '🇲🇻' },
  { name: 'Mali', flag: '🇲🇱' },
  { name: 'Malte', flag: '🇲🇹' },
  { name: 'Maroc', flag: '🇲🇦' },
  { name: 'Maurice', flag: '🇲🇺' },
  { name: 'Mauritanie', flag: '🇲🇷' },
  { name: 'Mexique', flag: '🇲🇽' },
  { name: 'Micronésie', flag: '🇫🇲' },
  { name: 'Moldavie', flag: '🇲🇩' },
  { name: 'Monaco', flag: '🇲🇨' },
  { name: 'Mongolie', flag: '🇲🇳' },
  { name: 'Monténégro', flag: '🇲🇪' },
  { name: 'Mozambique', flag: '🇲🇿' },
  { name: 'Myanmar', flag: '🇲🇲' },
  { name: 'Namibie', flag: '🇳🇦' },
  { name: 'Nauru', flag: '🇳🇷' },
  { name: 'Népal', flag: '🇳🇵' },
  { name: 'Nicaragua', flag: '🇳🇮' },
  { name: 'Niger', flag: '🇳🇪' },
  { name: 'Nigeria', flag: '🇳🇬' },
  { name: 'Norvège', flag: '🇳🇴' },
  { name: 'Nouvelle-Zélande', flag: '🇳🇿' },
  { name: 'Oman', flag: '🇴🇲' },
  { name: 'Ouganda', flag: '🇺🇬' },
  { name: 'Ouzbékistan', flag: '🇺🇿' },
  { name: 'Pakistan', flag: '🇵🇰' },
  { name: 'Palaos', flag: '🇵🇼' },
  { name: 'Panama', flag: '🇵🇦' },
  { name: 'Papouasie-Nouvelle-Guinée', flag: '🇵🇬' },
  { name: 'Paraguay', flag: '🇵🇾' },
  { name: 'Pays-Bas', flag: '🇳🇱' },
  { name: 'Pérou', flag: '🇵🇪' },
  { name: 'Philippines', flag: '🇵🇭' },
  { name: 'Pologne', flag: '🇵🇱' },
  { name: 'Portugal', flag: '🇵🇹' },
  { name: 'Qatar', flag: '🇶🇦' },
  { name: 'République centrafricaine', flag: '🇨🇫' },
  { name: 'République démocratique du Congo', flag: '🇨🇩' },
  { name: 'République dominicaine', flag: '🇩🇴' },
  { name: 'République tchèque', flag: '🇨🇿' },
  { name: 'Roumanie', flag: '🇷🇴' },
  { name: 'Royaume-Uni', flag: '🇬🇧' },
  { name: 'Russie', flag: '🇷🇺' },
  { name: 'Rwanda', flag: '🇷🇼' },
  { name: 'Saint-Christophe-et-Niévès', flag: '🇰🇳' },
  { name: 'Sainte-Lucie', flag: '🇱🇨' },
  { name: 'Saint-Marin', flag: '🇸🇲' },
  { name: 'Saint-Vincent-et-les-Grenadines', flag: '🇻🇨' },
  { name: 'Salvador', flag: '🇸🇻' },
  { name: 'Samoa', flag: '🇼🇸' },
  { name: 'Sao Tomé-et-Principe', flag: '🇸🇹' },
  { name: 'Sénégal', flag: '🇸🇳' },
  { name: 'Serbie', flag: '🇷🇸' },
  { name: 'Seychelles', flag: '🇸🇨' },
  { name: 'Sierra Leone', flag: '🇸🇱' },
  { name: 'Singapour', flag: '🇸🇬' },
  { name: 'Slovaquie', flag: '🇸🇰' },
  { name: 'Slovénie', flag: '🇸🇮' },
  { name: 'Somalie', flag: '🇸🇴' },
  { name: 'Soudan', flag: '🇸🇩' },
  { name: 'Soudan du Sud', flag: '🇸🇸' },
  { name: 'Sri Lanka', flag: '🇱🇰' },
  { name: 'Suède', flag: '🇸🇪' },
  { name: 'Suisse', flag: '🇨🇭' },
  { name: 'Suriname', flag: '🇸🇷' },
  { name: 'Syrie', flag: '🇸🇾' },
  { name: 'Tadjikistan', flag: '🇹🇯' },
  { name: 'Tanzanie', flag: '🇹🇿' },
  { name: 'Tchad', flag: '🇹🇩' },
  { name: 'Thaïlande', flag: '🇹🇭' },
  { name: 'Timor oriental', flag: '🇹🇱' },
  { name: 'Togo', flag: '🇹🇬' },
  { name: 'Tonga', flag: '🇹🇴' },
  { name: 'Trinité-et-Tobago', flag: '🇹🇹' },
  { name: 'Tunisie', flag: '🇹🇳' },
  { name: 'Turkménistan', flag: '🇹🇲' },
  { name: 'Tuvalu', flag: '🇹🇻' },
  { name: 'Türkiye', flag: '🇹🇷' },
  { name: 'Ukraine', flag: '🇺🇦' },
  { name: 'Uruguay', flag: '🇺🇾' },
  { name: 'Vanuatu', flag: '🇻🇺' },
  { name: 'Vatican', flag: '🇻🇦' },
  { name: 'Venezuela', flag: '🇻🇪' },
  { name: 'Vietnam', flag: '🇻🇳' },
  { name: 'Yémen', flag: '🇾🇪' },
  { name: 'Zambie', flag: '🇿🇲' },
  { name: 'Zimbabwe', flag: '🇿🇼' }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-2xl font-bold text-cyan-300 text-cyan-glow">TEAM AID</div>
          <a href="/register" className="w-full rounded-full border border-cyan-400 bg-cyan-500/10 px-5 py-3 text-center text-sm font-semibold text-cyan-200 shadow-[0_0_20px_rgba(0,229,255,0.5)] transition hover:bg-cyan-500/20 sm:w-auto">
            S’inscrire
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 pb-12">
        <section className="grid gap-10 py-8 md:grid-cols-2">
          <div>
            <h1 className="max-w-xl text-4xl font-extrabold leading-tight text-white md:text-6xl">
              Rejoignez une communauté de formation et d’accompagnement qui change des vies
            </h1>
            <p className="mt-5 text-2xl font-semibold text-cyan-300 text-cyan-glow">Inscrivez-vous gratuitement aujourd’hui</p>
            <div className="mt-8 rounded-2xl border border-cyan-400/40 bg-slate-900/70 p-5 glow-card">
              <div className="flex items-center justify-between text-sm text-cyan-200">
                <span>Personnes déjà inscrites</span>
                <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-cyan-300">Temps réel</span>
              </div>
              <div className="mt-4 text-5xl font-black text-cyan-300 text-cyan-glow">284</div>
            </div>
            <div className="mt-8">
              <a href="/register" className="inline-flex rounded-full bg-blue-500 px-6 py-4 text-lg font-bold text-white shadow-[0_0_25px_rgba(10,132,255,0.7)] transition hover:scale-105">
                S’inscrire maintenant — C’est gratuit
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {trustBadges.map((badge) => (
                <span key={badge} className="rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-cyan-400/40 bg-slate-900/70 p-6 glow-card">
            <div className="grid gap-4 md:grid-cols-2">
              {whyJoin.map((item, index) => (
                <div key={index} className="rounded-2xl border border-cyan-400/40 bg-slate-800/80 p-4">
                  <div className="text-lg font-bold text-cyan-300">{item.title}</div>
                  <p className="mt-2 text-sm text-slate-300">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-3xl font-bold text-white">Pourquoi rejoindre TEAM AID</h2>
          <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {whyJoin.map((item, index) => (
              <div key={index} className="rounded-2xl border border-cyan-500/40 bg-slate-900/70 p-5 glow-card min-h-[140px]">
                <div className="text-xl font-semibold text-cyan-300">{item.title}</div>
                <p className="mt-3 text-slate-300">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-3xl font-bold text-white">Nos formations disponibles</h2>
          <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {formationsList.map((formation) => (
              <div key={formation} className="rounded-2xl border border-cyan-500/40 bg-slate-900/70 p-5 min-h-[112px]">
                <div className="text-lg font-semibold text-cyan-300">{formation}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-3xl font-bold text-white">Pays couverts</h2>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {countriesList.map((country) => (
              <span key={country.name} className="w-full rounded-2xl border border-cyan-400/40 bg-slate-800 px-4 py-3 text-sm text-cyan-100 sm:w-auto">
                <span className="mr-2 text-lg leading-none">{country.flag}</span>
                {country.name}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-3xl font-bold text-white">Comment ça marche</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step} className="rounded-2xl border border-cyan-500/40 bg-slate-900/70 p-5 text-center glow-card">
                <div className="text-3xl font-black text-cyan-300">0{index + 1}</div>
                <div className="mt-3 text-lg font-semibold text-white">{step}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 text-center">
          <h2 className="text-4xl font-black text-white">Prêt à transformer votre avenir ?</h2>
          <a href="/register" className="mt-6 inline-flex rounded-full bg-blue-500 px-7 py-4 text-lg font-bold text-white shadow-[0_0_25px_rgba(10,132,255,0.7)]">
            Rejoignez TEAM AID maintenant
          </a>
        </section>
      </main>

      <footer className="border-t border-cyan-400/20 py-6 text-center text-slate-400">
        © 2026 TEAM AID
      </footer>
    </div>
  );
}

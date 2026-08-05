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

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-cyan-300 text-cyan-glow">TEAM AID</div>
          <a href="/register" className="rounded-full border border-cyan-400 bg-cyan-500/10 px-5 py-2 text-sm font-semibold text-cyan-200 shadow-[0_0_20px_rgba(0,229,255,0.5)]">S’inscrire</a>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-12">
        <section className="grid items-center gap-10 py-8 md:grid-cols-2">
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
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {whyJoin.map((item, index) => (
              <div key={index} className="rounded-2xl border border-cyan-500/40 bg-slate-900/70 p-5 glow-card">
                <div className="text-xl font-semibold text-cyan-300">{item.title}</div>
                <p className="mt-3 text-slate-300">{item.text}</p>
              </div>
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

import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [stats, setStats] = useState({ total: 0, trash: 0, formations: 0, pays: 0 });
  const [inscriptions, setInscriptions] = useState([]);
  const [corbeille, setCorbeille] = useState([]);
  const [filters, setFilters] = useState({ search: '', formation: '', pays: '' });
  const [formations, setFormations] = useState([]);
  const [pays, setPays] = useState([]);

  const logout = () => {
    localStorage.removeItem('teamAidAdmin');
    localStorage.removeItem('teamAidAdminEmail');
    window.location.href = '/admin';
  };

  const load = async () => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const [statsRes, insRes, trashRes, formationsRes, paysRes] = await Promise.all([
      fetch(`${apiUrl}/api/stats`),
      fetch(`${apiUrl}/api/inscriptions?search=${filters.search}&formation=${filters.formation}&pays=${filters.pays}`),
      fetch(`${apiUrl}/api/corbeille`),
      fetch(`${apiUrl}/api/formations`),
      fetch(`${apiUrl}/api/pays`),
    ]);

    setStats(await statsRes.json());
    setInscriptions(await insRes.json());
    setCorbeille(await trashRes.json());
    setFormations(await formationsRes.json());
    setPays(await paysRes.json());
  };

  useEffect(() => {
    load();
  }, [filters]);

  const softDelete = async (id) => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    await fetch(`${apiUrl}/api/inscriptions/${id}/delete`, { method: 'POST' });
    load();
  };

  const restore = async (id) => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    await fetch(`${apiUrl}/api/inscriptions/${id}/restore`, { method: 'POST' });
    load();
  };

  const destroy = async (id) => {
    if (!window.confirm('Supprimer définitivement cette inscription ? Cette action est irréversible.')) {
      return;
    }
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    await fetch(`${apiUrl}/api/inscriptions/${id}/destroy`, { method: 'POST' });
    load();
  };

  const clearTrash = async () => {
    if (!window.confirm('Vider complètement la corbeille ? Toutes les inscriptions supprimées définitivement seront perdues.')) {
      return;
    }
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    await fetch(`${apiUrl}/api/corbeille/clear`, { method: 'POST' });
    load();
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-slate-100">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-4xl font-black text-cyan-300">Dashboard TEAM AID</h1>
          <button onClick={logout} className="rounded-xl border border-cyan-400/40 bg-slate-800 px-4 py-2 text-sm font-semibold">Se déconnecter</button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-cyan-400/40 bg-slate-900 p-5"><p>Total inscriptions</p><h2 className="text-3xl font-bold text-cyan-300">{stats.total}</h2></div>
          <div className="rounded-2xl border border-cyan-400/40 bg-slate-900 p-5"><p>Corbeille</p><h2 className="text-3xl font-bold text-cyan-300">{stats.trash}</h2></div>
          <div className="rounded-2xl border border-cyan-400/40 bg-slate-900 p-5"><p>Formations actives</p><h2 className="text-3xl font-bold text-cyan-300">{stats.formations}</h2></div>
          <div className="rounded-2xl border border-cyan-400/40 bg-slate-900 p-5"><p>Pays représentés</p><h2 className="text-3xl font-bold text-cyan-300">{stats.pays}</h2></div>
        </div>

        <div className="mt-10 rounded-2xl border border-cyan-400/30 bg-slate-900 p-4">
          <h2 className="text-2xl font-bold text-white">Gestion des inscriptions</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-4">
            <input className="rounded-xl border border-cyan-400/30 bg-slate-950 p-3" placeholder="Recherche" onChange={(e) => setFilters({ ...filters, search: e.target.value })} />
            <select className="rounded-xl border border-cyan-400/30 bg-slate-950 p-3" onChange={(e) => setFilters({ ...filters, formation: e.target.value })}>
              <option value="">Toutes formations</option>
              {formations.map((item) => <option key={item.id} value={item.id}>{item.nom}</option>)}
            </select>
            <select className="rounded-xl border border-cyan-400/30 bg-slate-950 p-3" onChange={(e) => setFilters({ ...filters, pays: e.target.value })}>
              <option value="">Tous pays</option>
              {pays.map((item) => <option key={item.id} value={item.id}>{item.nom}</option>)}
            </select>
            <button onClick={load} className="rounded-xl bg-cyan-500 px-5 py-3 font-bold">Actualiser</button>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="text-cyan-300">
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Téléphone</th>
                  <th>Niveau d'étude</th>
                  <th>Formation</th>
                  <th>Pays</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {inscriptions.map((item) => (
                  <tr key={item.id} className="border-t border-cyan-400/20">
                    <td>{item.nom} {item.prenom}</td>
                    <td><a href={`mailto:${item.email}`} className="text-cyan-300">{item.email}</a></td>
                    <td>{item.telephone}</td>
                    <td>{item.niveau_etude}</td>
                    <td>{item.formation}</td>
                    <td>{item.pays}</td>
                    <td><button onClick={() => softDelete(item.id)} className="rounded bg-red-500 px-3 py-1 text-xs">Supprimer</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-cyan-400/30 bg-slate-900 p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h2 className="text-2xl font-bold text-white">Corbeille</h2>
            <button onClick={clearTrash} className="rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white md:ml-auto">Vider la corbeille</button>
          </div>
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="text-cyan-300">
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Téléphone</th>
                  <th>Niveau d'étude</th>
                  <th>Formation</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {corbeille.map((item) => (
                  <tr key={item.id} className="border-t border-cyan-400/20">
                    <td>{item.nom} {item.prenom}</td>
                    <td>{item.email}</td>
                    <td>{item.telephone}</td>
                    <td>{item.niveau_etude}</td>
                    <td>{item.formation}</td>
                    <td className="flex gap-2">
                      <button onClick={() => restore(item.inscription_id)} className="rounded bg-emerald-500 px-3 py-1 text-xs">Restaurer</button>
                      <button onClick={() => destroy(item.inscription_id)} className="rounded bg-red-600 px-3 py-1 text-xs">Supprimer</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

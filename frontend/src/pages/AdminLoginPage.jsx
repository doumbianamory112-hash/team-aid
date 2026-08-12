import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { apiUrl } from '../utils/api';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(apiUrl('/api/admin/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Connexion impossible');
      }

      localStorage.setItem('teamAidAdmin', 'true');
      localStorage.setItem('teamAidAdminEmail', data.user.email);
      navigate('/dashboard');
    } catch (err) {
      console.error('Erreur login admin:', err);
      setError(err.message || 'Impossible de se connecter au serveur admin.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-md items-center justify-center px-6 py-10">
        <div className="w-full rounded-3xl border border-cyan-400/40 bg-slate-900 p-8 glow-card">
          <h1 className="text-3xl font-black text-cyan-300">Connexion admin</h1>
          <p className="mt-2 text-sm text-slate-300">Accédez au tableau de bord pour gérer les inscriptions.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input className="w-full rounded-xl border border-cyan-400/30 bg-slate-950 p-3" type="email" placeholder="Email admin" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            <input className="w-full rounded-xl border border-cyan-400/30 bg-slate-950 p-3" type="password" placeholder="Mot de passe" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
            {error && <div className="text-sm text-red-400">{error}</div>}
            <button type="submit" className="w-full rounded-xl bg-blue-500 px-5 py-3 font-bold text-white">Se connecter</button>
          </form>
        </div>
      </div>
    </div>
  );
}

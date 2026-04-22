import { useState } from 'react';
import logo from '../../imports/imagotipo.png';

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-[#3C2415]/70 backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-[#6F4E37]/20">
          <div className="flex flex-col items-center mb-8">
            <img src={logo} alt="Casa Tueste" className="w-48 mb-4" />
            <h1 className="text-[#3C2415] text-center">Sistema de Gestión</h1>
            <p className="text-[#6F4E37]/70 text-center mt-2">Bienvenido al café de tus sueños</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-[#3C2415] mb-2">
                Usuario
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-[#6F4E37]/30 focus:outline-none focus:ring-2 focus:ring-[#6F4E37] bg-white"
                placeholder="Ingrese su usuario"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-[#3C2415] mb-2">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-[#6F4E37]/30 focus:outline-none focus:ring-2 focus:ring-[#6F4E37] bg-white"
                placeholder="Ingrese su contraseña"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#6F4E37] hover:bg-[#5a3d2b] text-white py-3 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Iniciar Sesión
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-[#6F4E37]/60">
            <p>Usuario demo: admin / Contraseña: admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}

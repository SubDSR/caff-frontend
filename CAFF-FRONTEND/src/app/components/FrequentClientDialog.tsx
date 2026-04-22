import { useState } from 'react';
import { X, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { FrequentClient } from '../types';

interface FrequentClientDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyBenefit: (dni: string) => void;
  clients: FrequentClient[];
}

export function FrequentClientDialog({
  isOpen,
  onClose,
  onApplyBenefit,
  clients
}: FrequentClientDialogProps) {
  const [dni, setDni] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'warning', text: string } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const client = clients.find(c => c.dni === dni);

    if (!client) {
      setMessage({ type: 'error', text: 'Cliente no registrado en el sistema' });
      return;
    }

    if (client.saldo_cafes <= 0) {
      setMessage({ type: 'warning', text: 'Cliente sin saldo de cafés disponibles' });
      return;
    }

    onApplyBenefit(dni);
    setMessage({ type: 'success', text: `Beneficio aplicado! Saldo restante: ${client.saldo_cafes - 1} café(s)` });
    setTimeout(() => {
      setDni('');
      setMessage(null);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#6F4E37]/20">
          <h3 className="text-[#3C2415]">Cliente Frecuente</h3>
          <button onClick={onClose} className="text-[#6F4E37]/50 hover:text-[#6F4E37]">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-4">
          <div className="mb-4">
            <label htmlFor="dni" className="block text-[#3C2415] mb-2">
              DNI del Cliente
            </label>
            <input
              id="dni"
              type="text"
              value={dni}
              onChange={(e) => {
                setDni(e.target.value);
                setMessage(null);
              }}
              className="w-full px-4 py-3 rounded-lg border border-[#6F4E37]/30 focus:outline-none focus:ring-2 focus:ring-[#6F4E37] bg-white"
              placeholder="Ingrese el DNI"
              maxLength={8}
              required
            />
          </div>

          {message && (
            <div className={`mb-4 p-3 rounded-lg flex items-center gap-2 ${
              message.type === 'success' ? 'bg-green-100 text-green-800' :
              message.type === 'error' ? 'bg-red-100 text-red-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {message.type === 'success' && <CheckCircle className="w-5 h-5" />}
              {message.type === 'error' && <XCircle className="w-5 h-5" />}
              {message.type === 'warning' && <AlertCircle className="w-5 h-5" />}
              <span>{message.text}</span>
            </div>
          )}

          <div className="bg-[#f5f5f5] rounded-lg p-4 mb-4 border border-[#6F4E37]/10">
            <h4 className="text-[#3C2415] mb-2">Información del Beneficio</h4>
            <ul className="text-sm text-[#6F4E37]/70 space-y-1">
              <li>• Descuento del 100% en un café</li>
              <li>• Se descontará 1 café del saldo</li>
              <li>• El beneficio se aplica automáticamente</li>
            </ul>
          </div>

          <button
            type="submit"
            className="w-full bg-[#6F4E37] hover:bg-[#5a3d2b] text-white py-3 rounded-lg transition-colors"
          >
            Aplicar Beneficio
          </button>
        </form>
      </div>
    </div>
  );
}

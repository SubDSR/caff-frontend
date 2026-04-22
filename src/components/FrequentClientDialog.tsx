import type { FormEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { X, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import type { OperationFeedback } from '../types';

interface FrequentClientDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyBenefit: (dni: string) => OperationFeedback;
}

export function FrequentClientDialog({
  isOpen,
  onClose,
  onApplyBenefit,
}: FrequentClientDialogProps) {
  const [dni, setDni] = useState('');
  const [message, setMessage] = useState<OperationFeedback | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setDni('');
      setMessage(null);
    }

    return () => {
      if (closeTimeoutRef.current !== null) {
        window.clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const feedback = onApplyBenefit(dni.trim());
    setMessage(feedback);

    if (feedback.type === 'success') {
      closeTimeoutRef.current = window.setTimeout(() => {
        setDni('');
        setMessage(null);
        onClose();
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#6F4E37]/20">
          <h3 className="text-[#3C2415]">Cliente Frecuente</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-[#6F4E37]/50 hover:text-[#6F4E37]"
            aria-label="Cerrar modal de cliente frecuente"
          >
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
                setDni(e.target.value.replace(/\D/g, ''));
                setMessage(null);
              }}
              className="w-full px-4 py-3 rounded-lg border border-[#6F4E37]/30 focus:outline-none focus:ring-2 focus:ring-[#6F4E37] bg-white"
              placeholder="Ingrese el DNI"
              inputMode="numeric"
              pattern="[0-9]{8}"
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

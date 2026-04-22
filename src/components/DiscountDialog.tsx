import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface DiscountDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyDiscount: (discount: number) => void;
  currentDiscount: number;
}

export function DiscountDialog({
  isOpen,
  onClose,
  onApplyDiscount,
  currentDiscount
}: DiscountDialogProps) {
  const [discount, setDiscount] = useState(currentDiscount.toString());

  useEffect(() => {
    if (isOpen) {
      setDiscount(currentDiscount.toString());
    }
  }, [currentDiscount, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const discountValue = parseFloat(discount);
    if (discountValue >= 0 && discountValue <= 100) {
      onApplyDiscount(discountValue);
      onClose();
    }
  };

  const handleClose = () => {
    setDiscount(currentDiscount.toString());
    onClose();
  };

  const presetDiscounts = [5, 10, 15, 20, 25, 50];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#6F4E37]/20">
          <h3 className="text-[#3C2415]">Aplicar Descuento</h3>
          <button
            type="button"
            onClick={handleClose}
            className="text-[#6F4E37]/50 hover:text-[#6F4E37]"
            aria-label="Cerrar modal de descuento"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-4">
          <div className="mb-4">
            <label htmlFor="discount" className="block text-[#3C2415] mb-2">
              Porcentaje de Descuento
            </label>
            <div className="relative">
              <input
                id="discount"
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-[#6F4E37]/30 focus:outline-none focus:ring-2 focus:ring-[#6F4E37] bg-white"
                placeholder="0"
                inputMode="decimal"
                min="0"
                max="100"
                step="0.01"
                required
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6F4E37]/70">%</span>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-[#3C2415] mb-2">Descuentos rápidos:</p>
            <div className="grid grid-cols-3 gap-2">
              {presetDiscounts.map(preset => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setDiscount(preset.toString())}
                  className="px-4 py-2 bg-[#f5f5f5] hover:bg-[#6F4E37] hover:text-white rounded-lg border border-[#6F4E37]/20 transition-colors"
                >
                  {preset}%
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setDiscount('0');
                onApplyDiscount(0);
                onClose();
              }}
              className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
            >
              Quitar Descuento
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#6F4E37] hover:bg-[#5a3d2b] text-white py-3 rounded-lg transition-colors"
            >
              Aplicar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

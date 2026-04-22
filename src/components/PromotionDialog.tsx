import { X, Tag } from 'lucide-react';
import type { Promotion } from '../types';

interface PromotionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyPromotion: (promotion: Promotion) => void;
  promotions: Promotion[];
}

export function PromotionDialog({
  isOpen,
  onClose,
  onApplyPromotion,
  promotions
}: PromotionDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#6F4E37]/20">
          <h3 className="text-[#3C2415]">Promociones Disponibles</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-[#6F4E37]/50 hover:text-[#6F4E37]"
            aria-label="Cerrar modal de promociones"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="px-6 py-4 overflow-y-auto">
          <div className="grid gap-4">
            {promotions.map((promotion) => (
              <button
                type="button"
                key={promotion.id}
                onClick={() => {
                  onApplyPromotion(promotion);
                  onClose();
                }}
                className="bg-gradient-to-r from-[#6F4E37]/10 to-[#D4A574]/10 hover:from-[#6F4E37]/20 hover:to-[#D4A574]/20 rounded-xl p-4 border border-[#6F4E37]/20 transition-all text-left"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#6F4E37] flex items-center justify-center flex-shrink-0">
                    <Tag className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[#3C2415] mb-1">{promotion.name}</h4>
                    <p className="text-sm text-[#6F4E37]/70 mb-2">{promotion.conditions}</p>
                    <p className="text-green-600">Descuento: {promotion.discount}%</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {promotions.length === 0 && (
            <div className="text-center py-8 text-[#6F4E37]/50">
              <Tag className="w-16 h-16 mx-auto mb-4" />
              <p>No hay promociones disponibles</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

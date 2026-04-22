import { Trash2, Plus, Minus, RotateCcw, XCircle, ShoppingCart as CartIcon } from 'lucide-react';
import type { CartItem } from '../types';

interface ShoppingCartProps {
  items: CartItem[];
  discount: number;
  canRepeatOrder: boolean;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onRepeatOrder: () => void;
  onCheckout: () => void;
}

export function ShoppingCart({
  items,
  discount,
  canRepeatOrder,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onRepeatOrder,
  onCheckout
}: ShoppingCartProps) {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = subtotal * (discount / 100);
  const total = subtotal - discountAmount;

  return (
    <div className="bg-white border-l border-[#6F4E37]/20 flex flex-col h-full">
      <div className="px-6 py-4 border-b border-[#6F4E37]/20">
        <div className="flex items-center gap-2 text-[#3C2415]">
          <CartIcon className="w-6 h-6" />
          <h3>Carrito de Compras</h3>
        </div>
        <p className="text-sm text-[#6F4E37]/70 mt-1">
          {items.length} {items.length === 1 ? 'producto' : 'productos'}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 min-h-0">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-[#6F4E37]/50">
            <CartIcon className="w-16 h-16 mb-4" />
            <p className="text-center">El carrito está vacío</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map(item => (
              <div
                key={item.id}
                className="bg-[#f5f5f5] rounded-lg p-3 border border-[#6F4E37]/10"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-[#3C2415] flex-1">{item.name}</h4>
                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-700 ml-2"
                    aria-label={`Eliminar ${item.name} del carrito`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 flex items-center justify-center bg-white border border-[#6F4E37]/30 rounded hover:bg-[#6F4E37]/10"
                      disabled={item.quantity <= 1}
                      aria-label={`Reducir cantidad de ${item.name}`}
                    >
                      <Minus className="w-4 h-4 text-[#6F4E37]" />
                    </button>
                    <span className="w-8 text-center text-[#3C2415]">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center bg-white border border-[#6F4E37]/30 rounded hover:bg-[#6F4E37]/10"
                      aria-label={`Aumentar cantidad de ${item.name}`}
                    >
                      <Plus className="w-4 h-4 text-[#6F4E37]" />
                    </button>
                  </div>
                  <p className="text-[#6F4E37]">
                    S/ {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-[#6F4E37]/20 px-6 py-4 bg-[#f5f5f5]">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-[#3C2415]">
            <span>Subtotal:</span>
            <span>S/ {subtotal.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Descuento ({discount}%):</span>
              <span>- S/ {discountAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-[#3C2415] pt-2 border-t border-[#6F4E37]/20">
            <span>Total:</span>
            <span>S/ {total.toFixed(2)}</span>
          </div>
        </div>

        <div className="space-y-2">
            <button
              type="button"
              onClick={onCheckout}
              disabled={items.length === 0}
              className="w-full bg-[#6F4E37] hover:bg-[#5a3d2b] text-white py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Realizar Orden
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={onClearCart}
              disabled={items.length === 0}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <XCircle className="w-4 h-4" />
              Anular
            </button>

            <button
              type="button"
              onClick={onRepeatOrder}
              disabled={!canRepeatOrder}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-[#8B6F47] hover:bg-[#75593a] text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RotateCcw className="w-4 h-4" />
              Repetir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

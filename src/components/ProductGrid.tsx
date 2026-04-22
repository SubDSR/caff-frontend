import type { ReactNode } from 'react';
import { Coffee, IceCream, Cookie, Cake, Package } from 'lucide-react';
import type { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  selectedCategory: string | null;
}

const categoryIcons: Record<string, ReactNode> = {
  'Cafés': <Coffee className="w-6 h-6" />,
  'Bebidas Frías': <IceCream className="w-6 h-6" />,
  'Snacks': <Cookie className="w-6 h-6" />,
  'Postres': <Cake className="w-6 h-6" />,
};

export function ProductGrid({ products, onAddToCart, selectedCategory }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-[#6F4E37]/50">
        <div className="text-center">
          <Package className="w-16 h-16 mx-auto mb-4" />
          <p>No hay productos en esta categoría</p>
        </div>
      </div>
    );
  }

  if (selectedCategory === null) {
    return (
      <div className="h-full overflow-y-auto px-6 py-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map(product => (
            <button
              type="button"
              key={product.id}
              onClick={() => onAddToCart(product)}
              className="bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-200 border border-[#6F4E37]/10 hover:border-[#6F4E37]/40 group"
            >
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#6F4E37]/20 to-[#D4A574]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {categoryIcons[product.category]}
                </div>
                <h4 className="text-[#3C2415] line-clamp-2">{product.name}</h4>
                <p className="text-[#6F4E37]">S/ {product.price.toFixed(2)}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto px-6 py-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4 text-[#3C2415]">
          {categoryIcons[selectedCategory]}
          <h3>{selectedCategory}</h3>
          <span className="text-sm text-[#6F4E37]/70">
            ({products.length} {products.length === 1 ? 'producto' : 'productos'})
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map(product => (
            <button
              type="button"
              key={product.id}
              onClick={() => onAddToCart(product)}
              className="bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-200 border border-[#6F4E37]/10 hover:border-[#6F4E37]/40 group"
            >
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#6F4E37]/20 to-[#D4A574]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {categoryIcons[product.category]}
                </div>
                <h4 className="text-[#3C2415] line-clamp-2">{product.name}</h4>
                <p className="text-[#6F4E37]">S/ {product.price.toFixed(2)}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

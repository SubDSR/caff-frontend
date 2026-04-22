import { Search, Gift, Percent, Tag, LogOut } from 'lucide-react';

interface TopBarProps {
  onFrequentClient: () => void;
  onDiscount: () => void;
  onPromotion: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onLogout: () => void;
}

export function TopBar({
  onFrequentClient,
  onDiscount,
  onPromotion,
  searchQuery,
  onSearchChange,
  onLogout
}: TopBarProps) {
  return (
    <header className="bg-white border-b border-[#6F4E37]/20 shadow-sm">
      <div className="px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src="/favicon.png" alt="Casa Tueste" className="w-10 h-10" />
          <div>
            <h2 className="text-[#3C2415]">Casa Tueste</h2>
            <p className="text-sm text-[#6F4E37]/70">Sistema POS</p>
          </div>
        </div>

        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6F4E37]/50" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#6F4E37]/30 focus:outline-none focus:ring-2 focus:ring-[#6F4E37] bg-white"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onFrequentClient}
            className="flex items-center gap-2 px-4 py-2 bg-[#6F4E37] hover:bg-[#5a3d2b] text-white rounded-lg transition-colors"
            title="Cliente Frecuente"
          >
            <Gift className="w-5 h-5" />
            <span className="hidden md:inline">Beneficios</span>
          </button>

          <button
            type="button"
            onClick={onDiscount}
            className="flex items-center gap-2 px-4 py-2 bg-[#8B6F47] hover:bg-[#75593a] text-white rounded-lg transition-colors"
            title="Aplicar Descuento"
          >
            <Percent className="w-5 h-5" />
            <span className="hidden md:inline">Descuento</span>
          </button>

          <button
            type="button"
            onClick={onPromotion}
            className="flex items-center gap-2 px-4 py-2 bg-[#D4A574] hover:bg-[#c19460] text-white rounded-lg transition-colors"
            title="Promociones"
          >
            <Tag className="w-5 h-5" />
            <span className="hidden md:inline">Promociones</span>
          </button>

          <button
            type="button"
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            title="Cerrar Sesión"
            aria-label="Cerrar sesión"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

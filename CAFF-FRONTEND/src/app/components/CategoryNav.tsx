import { Coffee, IceCream, Cookie, Cake, Grid3x3 } from 'lucide-react';

interface CategoryNavProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  'Cafés': <Coffee className="w-5 h-5" />,
  'Bebidas Frías': <IceCream className="w-5 h-5" />,
  'Snacks': <Cookie className="w-5 h-5" />,
  'Postres': <Cake className="w-5 h-5" />,
};

export function CategoryNav({ categories, selectedCategory, onSelectCategory }: CategoryNavProps) {
  return (
    <div className="bg-white border-b border-[#6F4E37]/20 px-6 py-4">
      <div className="flex items-center gap-3 overflow-x-auto">
        <button
          onClick={() => onSelectCategory(null)}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all whitespace-nowrap ${
            selectedCategory === null
              ? 'bg-[#6F4E37] text-white shadow-lg'
              : 'bg-white border-2 border-[#6F4E37]/20 text-[#3C2415] hover:border-[#6F4E37]/40'
          }`}
        >
          <Grid3x3 className="w-5 h-5" />
          <span>Todos los Productos</span>
        </button>

        {categories.map(category => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-[#6F4E37] text-white shadow-lg'
                : 'bg-white border-2 border-[#6F4E37]/20 text-[#3C2415] hover:border-[#6F4E37]/40'
            }`}
          >
            {categoryIcons[category]}
            <span>{category}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { toast, Toaster } from 'sonner';
import { Login } from './components/Login';
import { TopBar } from './components/TopBar';
import { CategoryNav } from './components/CategoryNav';
import { ProductGrid } from './components/ProductGrid';
import { ShoppingCart } from './components/ShoppingCart';
import { FrequentClientDialog } from './components/FrequentClientDialog';
import { DiscountDialog } from './components/DiscountDialog';
import { PromotionDialog } from './components/PromotionDialog';
import { Product, CartItem, FrequentClient, Promotion } from './types';

const initialProducts: Product[] = [
  { id: '1', name: 'Espresso', price: 6.50, category: 'Cafés' },
  { id: '2', name: 'Cappuccino', price: 8.00, category: 'Cafés' },
  { id: '3', name: 'Latte', price: 8.50, category: 'Cafés' },
  { id: '4', name: 'Americano', price: 7.00, category: 'Cafés' },
  { id: '5', name: 'Mocha', price: 9.50, category: 'Cafés' },
  { id: '6', name: 'Frappé de Café', price: 12.00, category: 'Bebidas Frías' },
  { id: '7', name: 'Smoothie de Frutas', price: 11.00, category: 'Bebidas Frías' },
  { id: '8', name: 'Limonada Frozen', price: 9.00, category: 'Bebidas Frías' },
  { id: '9', name: 'Croissant', price: 6.00, category: 'Snacks' },
  { id: '10', name: 'Sándwich de Pollo', price: 14.00, category: 'Snacks' },
  { id: '11', name: 'Ensalada Cesar', price: 15.00, category: 'Snacks' },
  { id: '12', name: 'Brownie', price: 7.50, category: 'Postres' },
  { id: '13', name: 'Cheesecake', price: 10.00, category: 'Postres' },
  { id: '14', name: 'Tarta de Manzana', price: 9.00, category: 'Postres' },
];

const mockClients: FrequentClient[] = [
  { dni: '12345678', saldo_cafes: 5 },
  { dni: '87654321', saldo_cafes: 3 },
  { dni: '11111111', saldo_cafes: 0 },
  { dni: '22222222', saldo_cafes: 10 },
];

const mockPromotions: Promotion[] = [
  {
    id: '1',
    name: '2x1 en Cafés',
    discount: 50,
    conditions: 'Válido en compras de 2 o más cafés del mismo tipo'
  },
  {
    id: '2',
    name: 'Combo Desayuno',
    discount: 20,
    conditions: 'Café + Croissant: 20% de descuento'
  },
  {
    id: '3',
    name: 'Happy Hour',
    discount: 30,
    conditions: 'De 3pm a 5pm: 30% en bebidas frías'
  },
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products] = useState<Product[]>(initialProducts);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [clients, setClients] = useState<FrequentClient[]>(mockClients);
  const [lastOrder, setLastOrder] = useState<CartItem[]>([]);

  const [showFrequentClient, setShowFrequentClient] = useState(false);
  const [showDiscount, setShowDiscount] = useState(false);
  const [showPromotion, setShowPromotion] = useState(false);

  const categories = Array.from(new Set(products.map(p => p.category)));

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast.success(`${product.name} agregado al carrito`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    const item = cartItems.find(i => i.id === productId);
    setCartItems(prev => prev.filter(item => item.id !== productId));
    if (item) {
      toast.info(`${item.name} eliminado del carrito`);
    }
  };

  const handleClearCart = () => {
    setCartItems([]);
    setDiscount(0);
    toast.info('Carrito anulado');
  };

  const handleRepeatOrder = () => {
    if (lastOrder.length > 0) {
      setCartItems(lastOrder);
      toast.success('Orden repetida');
    } else {
      toast.error('No hay orden anterior para repetir');
    }
  };

  const handleCheckout = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal - (subtotal * (discount / 100));

    toast.success(`Orden realizada! Total: S/ ${total.toFixed(2)}`, {
      description: 'Comprobante generado exitosamente'
    });

    setLastOrder([...cartItems]);
    setCartItems([]);
    setDiscount(0);
  };

  const handleApplyBenefit = (dni: string) => {
    const client = clients.find(c => c.dni === dni);
    if (!client || client.saldo_cafes <= 0) return;

    const coffeeInCart = cartItems.find(item => item.category === 'Cafés');
    if (!coffeeInCart) {
      toast.error('Debe tener al menos un café en el carrito');
      return;
    }

    setClients(prev =>
      prev.map(c =>
        c.dni === dni ? { ...c, saldo_cafes: c.saldo_cafes - 1 } : c
      )
    );

    const coffeePrice = coffeeInCart.price;
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountPercentage = (coffeePrice / subtotal) * 100;

    setDiscount(prev => prev + discountPercentage);
    toast.success('Beneficio de cliente frecuente aplicado!');
  };

  const handleApplyPromotion = (promotion: Promotion) => {
    setDiscount(promotion.discount);
    toast.success(`Promoción "${promotion.name}" aplicada!`);
  };

  if (!isLoggedIn) {
    return (
      <>
        <Login onLogin={() => setIsLoggedIn(true)} />
        <Toaster position="top-right" richColors />
      </>
    );
  }

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="h-screen flex flex-col bg-[#f5f5f5]">
      <TopBar
        onFrequentClient={() => setShowFrequentClient(true)}
        onDiscount={() => setShowDiscount(true)}
        onPromotion={() => setShowPromotion(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onLogout={() => setIsLoggedIn(false)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <CategoryNav
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 overflow-hidden">
            <ProductGrid
              products={filteredProducts}
              onAddToCart={handleAddToCart}
              selectedCategory={selectedCategory}
            />
          </div>

        <div className="w-96 flex-shrink-0">
          <ShoppingCart
            items={cartItems}
            discount={discount}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            onRepeatOrder={handleRepeatOrder}
            onCheckout={handleCheckout}
          />
        </div>
      </div>

      <FrequentClientDialog
        isOpen={showFrequentClient}
        onClose={() => setShowFrequentClient(false)}
        onApplyBenefit={handleApplyBenefit}
        clients={clients}
      />

      <DiscountDialog
        isOpen={showDiscount}
        onClose={() => setShowDiscount(false)}
        onApplyDiscount={setDiscount}
        currentDiscount={discount}
      />

      <PromotionDialog
        isOpen={showPromotion}
        onClose={() => setShowPromotion(false)}
        onApplyPromotion={handleApplyPromotion}
        promotions={mockPromotions}
      />
        </div>
      </div>
    </>
  );
}
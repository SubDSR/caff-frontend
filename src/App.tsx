import { lazy, Suspense, useDeferredValue, useMemo, useState } from 'react';
import { toast, Toaster } from 'sonner';
import { Login } from './components/Login';
import { TopBar } from './components/TopBar';
import { CategoryNav } from './components/CategoryNav';
import { ProductGrid } from './components/ProductGrid';
import { ShoppingCart } from './components/ShoppingCart';
import { AVAILABLE_PROMOTIONS, INITIAL_CLIENTS, INITIAL_PRODUCTS, PRODUCT_CATEGORIES } from './data/pos-data';
import type { CartItem, OperationFeedback, Product, Promotion } from './types';

const FrequentClientDialog = lazy(async () => {
  const module = await import('./components/FrequentClientDialog');
  return { default: module.FrequentClientDialog };
});

const DiscountDialog = lazy(async () => {
  const module = await import('./components/DiscountDialog');
  return { default: module.DiscountDialog };
});

const PromotionDialog = lazy(async () => {
  const module = await import('./components/PromotionDialog');
  return { default: module.PromotionDialog };
});

const cloneCartItems = (items: CartItem[]) => items.map((item) => ({ ...item }));

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [clients, setClients] = useState(() => INITIAL_CLIENTS.map((client) => ({ ...client })));
  const [lastOrder, setLastOrder] = useState<CartItem[]>([]);

  const [showFrequentClient, setShowFrequentClient] = useState(false);
  const [showDiscount, setShowDiscount] = useState(false);
  const [showPromotion, setShowPromotion] = useState(false);

  const normalizedSearchQuery = deferredSearchQuery.trim().toLowerCase();
  const filteredProducts = useMemo(() => {
    if (!normalizedSearchQuery && selectedCategory === null) {
      return INITIAL_PRODUCTS;
    }

    return INITIAL_PRODUCTS.filter((product) => {
      const matchesSearch =
        !normalizedSearchQuery ||
        product.name.toLowerCase().includes(normalizedSearchQuery) ||
        product.category.toLowerCase().includes(normalizedSearchQuery);
      const matchesCategory = selectedCategory === null || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [normalizedSearchQuery, selectedCategory]);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
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
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    const item = cartItems.find((cartItem) => cartItem.id === productId);
    setCartItems((prev) => prev.filter((cartItem) => cartItem.id !== productId));
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
      setCartItems(cloneCartItems(lastOrder));
      setDiscount(0);
      toast.success('Orden repetida');
    } else {
      toast.error('No hay orden anterior para repetir');
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      return;
    }

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal - (subtotal * (discount / 100));

    toast.success(`Orden realizada! Total: S/ ${total.toFixed(2)}`, {
      description: 'Comprobante generado exitosamente'
    });

    setLastOrder(cloneCartItems(cartItems));
    setCartItems([]);
    setDiscount(0);
  };

  const handleApplyBenefit = (dni: string): OperationFeedback => {
    const client = clients.find((currentClient) => currentClient.dni === dni);
    if (!client) {
      return { type: 'error', text: 'Cliente no registrado en el sistema' };
    }

    if (client.saldo_cafes <= 0) {
      return { type: 'warning', text: 'Cliente sin saldo de cafés disponibles' };
    }

    const coffeeInCart = cartItems.find((item) => item.category === 'Cafés');
    if (!coffeeInCart) {
      toast.error('Debe tener al menos un café en el carrito');
      return { type: 'error', text: 'Debe tener al menos un café en el carrito' };
    }

    const nextBalance = client.saldo_cafes - 1;
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const coffeeDiscountPercentage = (coffeeInCart.price / subtotal) * 100;

    setClients((prev) =>
      prev.map((currentClient) =>
        currentClient.dni === dni
          ? { ...currentClient, saldo_cafes: nextBalance }
          : currentClient
      )
    );
    setDiscount((prev) => Math.min(prev + coffeeDiscountPercentage, 100));

    toast.success('Beneficio de cliente frecuente aplicado!');

    return {
      type: 'success',
      text: `Beneficio aplicado! Saldo restante: ${nextBalance} café(s)`,
    };
  };

  const handleApplyPromotion = (promotion: Promotion) => {
    setDiscount(Math.min(promotion.discount, 100));
    toast.success(`Promoción "${promotion.name}" aplicada!`);
  };

  const isAnyDialogOpen = showFrequentClient || showDiscount || showPromotion;

  if (!isLoggedIn) {
    return (
      <>
        <Toaster position="top-right" richColors />
        <Login onLogin={() => setIsLoggedIn(true)} />
      </>
    );
  }

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="flex h-screen flex-col bg-[#f5f5f5]">
        <TopBar
          onFrequentClient={() => setShowFrequentClient(true)}
          onDiscount={() => setShowDiscount(true)}
          onPromotion={() => setShowPromotion(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onLogout={() => setIsLoggedIn(false)}
        />

        <div className="flex flex-1 flex-col overflow-hidden">
          <CategoryNav
            categories={PRODUCT_CATEGORIES}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          <div className="flex flex-1 overflow-hidden">
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
                canRepeatOrder={lastOrder.length > 0}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onClearCart={handleClearCart}
                onRepeatOrder={handleRepeatOrder}
                onCheckout={handleCheckout}
              />
            </div>
          </div>

          {isAnyDialogOpen ? (
            <Suspense fallback={null}>
              <FrequentClientDialog
                isOpen={showFrequentClient}
                onClose={() => setShowFrequentClient(false)}
                onApplyBenefit={handleApplyBenefit}
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
                promotions={AVAILABLE_PROMOTIONS}
              />
            </Suspense>
          ) : null}
        </div>
      </div>
    </>
  );
}

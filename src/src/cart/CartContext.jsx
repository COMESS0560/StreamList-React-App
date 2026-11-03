import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import products from './products.js';

const STORAGE_KEY = 'streamlist-week3-shopping-cart';
const CartContext = createContext(null);
export const isSubscription = (product) => Number(product.id) <= 4;
export const formatPrice = (price) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);

function readSavedCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || typeof saved !== 'object' || Array.isArray(saved)) return {};
    const result = {};
    for (const [id, quantity] of Object.entries(saved)) {
      const product = products.find((item) => String(item.id) === String(id));
      if (!product) continue;
      const amount = Number(quantity);
      if (!Number.isInteger(amount) || amount < 1) continue;
      result[product.id] = isSubscription(product) ? 1 : Math.min(amount, 99);
    }
    return result;
  } catch { return {}; }
}

export function CartProvider({ children }) {
  const [quantities, setQuantities] = useState(readSavedCart);
  const [notice, setNotice] = useState('');
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(quantities)); } catch { setNotice('Cart changes could not be saved in this browser.'); }
  }, [quantities]);

  const items = useMemo(() => products.filter((p) => quantities[p.id] > 0).map((p) => ({ ...p, quantity: quantities[p.id] })), [quantities]);
  const cartCount = items.reduce((sum, product) => sum + product.quantity, 0);
  const total = items.reduce((sum, product) => sum + product.price * product.quantity, 0);

  function addItem(product) {
    if (isSubscription(product) && quantities[product.id]) {
      setNotice('You can only add one of each subscription.');
      return;
    }
    setQuantities((prev) => ({ ...prev, [product.id]: isSubscription(product) ? 1 : Math.min(99, (prev[product.id] || 0) + 1) }));
    setNotice(`${product.service} added to your cart.`);
  }
  function setQuantity(product, count) {
    if (isSubscription(product)) return;
    setQuantities((prev) => {
      const next = { ...prev };
      if (count <= 0) delete next[product.id];
      else next[product.id] = Math.min(99, Math.max(1, count));
      return next;
    });
  }
  function removeItem(product) {
    setQuantities((prev) => { const next = { ...prev }; delete next[product.id]; return next; });
    setNotice(`${product.service} removed from your cart.`);
  }
  function clearCart() { setQuantities({}); setNotice('Your cart has been cleared.'); }
  const value = { products, quantities, items, cartCount, total, notice, setNotice, addItem, setQuantity, removeItem, clearCart };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
}

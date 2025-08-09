import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartCtx = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem("violet_cart")) || []; }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem("violet_cart", JSON.stringify(items));
  }, [items]);

  // ⬇️ NEW: supports variants via a unique "key" (id:size:color)
  const add = (product, qty = 1, opts = {}) => {
    const key = (opts.size || opts.color)
      ? `${product.id}:${opts.size || ""}:${opts.color || ""}`
      : product.id;

    setItems(prev => {
      const i = prev.findIndex(x => x.key === key);
      if (i >= 0) {
        const copy = [...prev];
        copy[i] = { ...copy[i], qty: copy[i].qty + qty };
        return copy;
      }
      return [
        ...prev,
        {
          key,
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.images?.[0],
          qty,
          size: opts.size || null,
          color: opts.color || null,
        }
      ];
    });
  };

  const remove = (key) => setItems(prev => prev.filter(x => x.key !== key));
  const setQty  = (key, qty) => setItems(prev => prev.map(x => x.key === key ? { ...x, qty: Math.max(1, qty) } : x));
  const clear   = () => setItems([]);

  const totals = useMemo(() => {
    const count    = items.reduce((s, x) => s + x.qty, 0);
    const subtotal = items.reduce((s, x) => s + x.qty * x.price, 0);
    const shipping = subtotal > 7500 ? 0 : (items.length ? 990 : 0);
    const total    = subtotal + shipping;
    return { count, subtotal, shipping, total };
  }, [items]);

  return (
    <CartCtx.Provider value={{ items, add, remove, setQty, clear, totals }}>
      {children}
    </CartCtx.Provider>
  );
}
export const useCart = () => useContext(CartCtx);

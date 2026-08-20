import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types/product';
import { PRODUCTS } from '../data/products';
import { useSound } from './SoundContext';

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (product: Product, packSize?: number, quantity?: number) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  discountCode: string;
  discountAmount: number;
  discountError: string;
  applyDiscount: (code: string) => boolean;
  removeDiscount: () => void;
  freeShippingThreshold: number;
  shippingCost: number;
  finalTotal: number;
  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { playAddToCart, playWhoosh } = useSound();

  // Initialize with 1 default item (12-pack of AEROVA ZERO) so the showcase cart looks lively right away!
  const [items, setItems] = useState<CartItem[]>(() => {
    const defaultProduct = PRODUCTS[0];
    const defaultPack = defaultProduct.packOptions[1]; // 12-can case
    return [
      {
        id: `${defaultProduct.id}-${defaultPack.size}`,
        productId: defaultProduct.id,
        product: defaultProduct,
        packSize: defaultPack.size,
        packTitle: defaultPack.title,
        price: defaultPack.price,
        quantity: 1,
      },
    ];
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [discountCode, setDiscountCode] = useState<string>('');
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [discountError, setDiscountError] = useState<string>('');

  const freeShippingThreshold = 50;

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Recalculate discount if cart updates
  useEffect(() => {
    if (discountCode.toUpperCase() === 'ZEROGRAVITY' || discountCode.toUpperCase() === 'AEROVA20') {
      setDiscountAmount(Number((subtotal * 0.2).toFixed(2)));
    } else if (discountCode.toUpperCase() === 'ORBIT50') {
      setDiscountAmount(Number((subtotal * 0.5).toFixed(2)));
    } else {
      setDiscountAmount(0);
    }
  }, [subtotal, discountCode]);

  const shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 4.99;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  const openCart = () => {
    playWhoosh();
    setIsOpen(true);
  };
  const closeCart = () => {
    playWhoosh();
    setIsOpen(false);
  };
  const toggleCart = () => {
    playWhoosh();
    setIsOpen((prev) => !prev);
  };

  const openCheckout = () => {
    setIsOpen(false);
    setIsCheckoutOpen(true);
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
  };

  const addToCart = (product: Product, packSize = 12, quantity = 1) => {
    playAddToCart();
    const pack = product.packOptions.find((p) => p.size === packSize) || product.packOptions[0];
    const itemId = `${product.id}-${pack.size}`;

    setItems((prevItems) => {
      const existing = prevItems.find((i) => i.id === itemId);
      if (existing) {
        return prevItems.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity + quantity } : i
        );
      } else {
        return [
          ...prevItems,
          {
            id: itemId,
            productId: product.id,
            product,
            packSize: pack.size,
            packTitle: pack.title,
            price: pack.price,
            quantity,
          },
        ];
      }
    });

    setIsOpen(true);
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const applyDiscount = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === 'ZEROGRAVITY' || trimmed === 'AEROVA20') {
      setDiscountCode(trimmed);
      setDiscountError('');
      return true;
    } else if (trimmed === 'ORBIT50') {
      setDiscountCode(trimmed);
      setDiscountError('');
      return true;
    } else {
      setDiscountError('Invalid code. Try "ZEROGRAVITY" for 20% off.');
      return false;
    }
  };

  const removeDiscount = () => {
    setDiscountCode('');
    setDiscountAmount(0);
    setDiscountError('');
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        totalItems,
        subtotal,
        discountCode,
        discountAmount,
        discountError,
        applyDiscount,
        removeDiscount,
        freeShippingThreshold,
        shippingCost,
        finalTotal,
        isCheckoutOpen,
        openCheckout,
        closeCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import Header from '../components/cliente/Header';
import ProductCard from '../components/cliente/ProductCard';
import CartDrawer from '../components/cliente/CartDrawer';
import OrderConfirmModal from '../components/cliente/OrderConfirmModal';
import productData from '../data/productos.json';

export default function MenuPage() {
    const { restaurantId } = useParams();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState('');

    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    useEffect(() => {
        // Simular si un producto esta activo
        const activeProducts = productData.filter(p => p.activo);
        setProducts(activeProducts);

        // categorias
        const cats = [...new Set(activeProducts.map(p => p.categoria))];
        setCategories(cats);
        if (cats.length > 0) setActiveCategory(cats[0]);
    }, []);

    const handleAddToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => item.id === product.id ? { ...item, cantidad: item.cantidad + 1 } : item);
            }
            return [...prev, { ...product, cantidad: 1 }];
        });
        // feedback
        setIsCartOpen(true);
    };

    const updateQuantity = (id, newQuantity) => {
        setCart(prev => prev.map(item => item.id === id ? { ...item, cantidad: newQuantity } : item));
    };

    const removeItem = (id) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const handleConfirmOrder = () => {
        setIsCartOpen(false);
        setIsConfirmOpen(true);
        setCart([]); // reiniciar despues de una orden
    };

    const cartItemsCount = cart.reduce((acc, item) => acc + item.cantidad, 0);

    const filteredProducts = products.filter(p => p.categoria === activeCategory);

    return (
        <div className="min-h-screen pb-28 bg-bg-light relative">
            <Header />

            {/* categorias */}
            <div className="bg-white border-b border-slate-200 sticky top-[65px] md:top-[73px] z-30 shadow-sm">
                <div className="container px-4 mx-auto max-w-4xl overflow-x-auto hide-scrollbar">
                    <div className="flex space-x-3 py-4">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`flex-none px-5 py-2.5 rounded-full text-sm font-bold transition-all ${activeCategory === cat
                                        ? 'bg-primary text-white shadow-md transform scale-105'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <main className="container max-w-4xl px-4 py-8 mx-auto animate-in fade-in duration-500">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAdd={handleAddToCart}
                        />
                    ))}
                </div>
            </main>

            {/*boton de carrito */}
            {cartItemsCount > 0 && (
                <button
                    onClick={() => setIsCartOpen(true)}
                    className="fixed bottom-8 right-8 z-30 w-16 h-16 bg-action text-white rounded-full shadow-2xl shadow-action/40 flex items-center justify-center hover:bg-[#c46914] transition-all hover:scale-110 active:scale-95 animate-in slide-in-from-bottom-8 bounce-in"
                >
                    <div className="relative">
                        <ShoppingBag size={28} />
                        <span className="absolute -top-3 -right-3 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-xs font-bold shadow-sm border-2 border-action">
                            {cartItemsCount}
                        </span>
                    </div>
                </button>
            )}

            {/* Carrito */}
            <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartItems={cart}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
                onConfirm={handleConfirmOrder}
            />

            {/* Confirmation Modal */}
            <OrderConfirmModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
            />

            {/* CSS internal to hide scrollbar in tabs */}
            <style dangerouslySetInnerHTML={{
                __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
        </div>
    );
}

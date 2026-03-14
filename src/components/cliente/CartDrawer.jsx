import React from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import Button from '../ui/Button';

export default function CartDrawer({ isOpen, onClose, cartItems, updateQuantity, removeItem, onConfirm }) {
    const total = cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-40 bg-black/50 transition-opacity" onClick={onClose} />
            )}
            <div className={`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex items-center justify-between p-5 border-b border-slate-200">
                    <div className="flex items-center text-primary font-bold text-2xl font-display">
                        <ShoppingBag className="mr-3 text-action" size={28} /> Tu Pedido
                    </div>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 p-5 overflow-y-auto bg-slate-50">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4">
                            <ShoppingBag size={64} className="opacity-20" />
                            <p className="text-lg">Tu carrito está vacío</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                                    <div className="flex-1 min-w-0 pr-4">
                                        <h4 className="font-semibold text-slate-800 line-clamp-2 leading-tight">{item.nombre}</h4>
                                        <p className="text-primary font-bold text-sm mt-2">${(item.precio * item.cantidad).toLocaleString('es-CO')}</p>
                                    </div>
                                    <div className="flex flex-col items-end justify-between gap-3">
                                        <button
                                            className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                        <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                                            <button
                                                className="p-1.5 text-slate-500 hover:text-action disabled:opacity-50 transition-colors"
                                                onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                                                disabled={item.cantidad <= 1}
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className="w-8 text-center font-bold text-sm">{item.cantidad}</span>
                                            <button
                                                className="p-1.5 text-slate-500 hover:text-action transition-colors"
                                                onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="p-5 bg-white border-t border-slate-200 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)]">
                        <div className="flex justify-between items-center mb-5">
                            <span className="text-slate-500 font-medium">Total a pagar</span>
                            <span className="text-3xl font-bold text-primary">${total.toLocaleString('es-CO')}</span>
                        </div>
                        <Button variant="action" className="w-full py-4 text-lg font-bold shadow-md shadow-action/30 rounded-xl" onClick={onConfirm}>
                            Confirmar Pedido
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
}

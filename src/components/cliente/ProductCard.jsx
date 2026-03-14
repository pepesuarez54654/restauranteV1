import React from 'react';
import Button from '../ui/Button';
import { Plus } from 'lucide-react';

export default function ProductCard({ product, onAdd }) {
    return (
        <div className="flex flex-col overflow-hidden bg-white border rounded-xl shadow-sm border-slate-200 hover:shadow-md transition-shadow">
            <div className="relative h-48 sm:h-56">
                <img
                    src={product.imagen || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400'}
                    alt={product.nombre}
                    className="object-cover w-full h-full"
                />
                <div className="absolute top-2 right-2 px-2 py-1 text-sm font-bold bg-white rounded-lg shadow-sm text-primary">
                    ${product.precio.toLocaleString('es-CO')}
                </div>
            </div>
            <div className="flex flex-col flex-1 p-4">
                <h3 className="text-lg font-bold font-display text-slate-800 line-clamp-1">{product.nombre}</h3>
                <p className="mt-1 text-sm text-slate-500 line-clamp-2 flex-1">{product.descripcion}</p>
                <div className="mt-4 pt-4 border-t border-slate-100">
                    <Button variant="action" className="w-full" onClick={() => onAdd(product)}>
                        <Plus size={18} className="mr-2" /> Agregar
                    </Button>
                </div>
            </div>
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import { Clock, ChevronRight } from 'lucide-react';
import Badge from '../ui/Badge';
import pedidosData from '../../data/pedidos.json';

const COLUMNAS = [
    { id: 'Recibido', titulo: 'Recibido', color: 'blue' },
    { id: 'En preparación', titulo: 'En Preparación', color: 'yellow' },
    { id: 'Listo', titulo: 'Listo', color: 'green' },
    { id: 'Entregado', titulo: 'Entregado', color: 'gray' },
];

export default function PedidosKanban() {
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        // Simulated fetch
        setPedidos(pedidosData);
    }, []);

    const moveOrder = (id, curState) => {
        const curIndex = COLUMNAS.findIndex(c => c.id === curState);
        if (curIndex < COLUMNAS.length - 1) {
            const nextState = COLUMNAS[curIndex + 1].id;
            setPedidos(prev => prev.map(p => p.id === id ? { ...p, estado: nextState } : p));
        }
    };

    const renderColumna = (col) => {
        const colPedidos = pedidos.filter(p => p.estado === col.id);

        return (
            <div key={col.id} className="flex flex-col bg-slate-50/80 rounded-2xl min-w-[320px] w-[320px] max-w-sm border border-slate-200 hide-scrollbar overflow-hidden h-full">
                <div className="p-4 border-b border-slate-200 bg-slate-100 flex justify-between items-center sticky top-0 z-10">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full bg-${col.color}-500 shadow-sm`}></span>
                        {col.titulo}
                    </h3>
                    <span className="bg-white text-slate-600 px-2.5 py-1 rounded-lg text-xs font-bold shadow-sm border border-slate-200">
                        {colPedidos.length}
                    </span>
                </div>

                <div className="flex-1 p-3 space-y-3 overflow-y-auto">
                    {colPedidos.map(pedido => (
                        <div key={pedido.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow relative group">
                            <div className="flex justify-between items-start mb-3">
                                <span className="font-bold text-slate-900 border-b-[3px] border-primary/20 pb-0.5 text-lg leading-none">#{pedido.id.split('-')[1]}</span>
                                <Badge variant={col.color}>{pedido.origen}</Badge>
                            </div>

                            <div className="text-sm text-slate-600 mb-4 space-y-1.5">
                                {pedido.items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-start gap-2">
                                        <span className="font-semibold text-slate-800">{item.cantidad}x</span>
                                        <span className="flex-1 line-clamp-2 leading-tight">{item.nombre}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                                <div className="flex items-center text-xs font-medium text-slate-500 bg-slate-50 px-2 py-1 rounded-md">
                                    <Clock size={14} className="mr-1.5" /> {pedido.hora}
                                </div>
                                <div className="font-bold text-primary">
                                    ${pedido.total.toLocaleString('es-CO')}
                                </div>
                            </div>

                            {/* Action Button Overlay */}
                            {col.id !== 'Entregado' && (
                                <div className="absolute inset-0 bg-slate-900/5 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                                    <button
                                        onClick={() => moveOrder(pedido.id, pedido.estado)}
                                        className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold shadow-xl hover:bg-[#15542d] hover:scale-105 active:scale-95 transition-all flex items-center"
                                    >
                                        Avanzar <ChevronRight size={20} className="ml-1 -mr-1" />
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                    {colPedidos.length === 0 && (
                        <div className="h-24 flex items-center justify-center text-sm font-medium text-slate-400 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                            Sin pedidos
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="h-[calc(100vh-7rem)] flex flex-col pt-2 animate-in fade-in duration-500">
            <div className="flex items-center justify-between mb-6 flex-none px-2">
                <div>
                    <h2 className="text-2xl font-bold font-display text-slate-800">Tablero de Pedidos</h2>
                    <p className="text-slate-500 text-sm mt-1">Pasa el cursor sobre una tarjeta para avanzar su estado</p>
                </div>
            </div>

            <div className="flex-1 flex gap-5 overflow-x-auto pb-4 hide-scrollbar snap-x px-2 h-full">
                {COLUMNAS.map(col => (
                    <div key={col.id} className="snap-center h-full">
                        {renderColumna(col)}
                    </div>
                ))}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
        </div>
    );
}

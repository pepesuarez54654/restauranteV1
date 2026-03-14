import React, { useState, useEffect } from 'react';
import { DollarSign, ShoppingBag, CheckCircle, TrendingUp } from 'lucide-react';
import Badge from '../ui/Badge';
import pedidosData from '../../data/pedidos.json';

export default function Dashboard() {
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        // Simulated fetch
        setPedidos(pedidosData);
    }, []);

    const activeOrders = pedidos.filter(p => !['Entregado'].includes(p.estado));
    const completedOrders = pedidos.filter(p => p.estado === 'Entregado');
    const dailyRevenue = completedOrders.reduce((acc, p) => acc + p.total, 0);

    const getStatusBadge = (estado) => {
        switch (estado) {
            case 'Recibido': return <Badge variant="blue">Recibido</Badge>;
            case 'En preparación': return <Badge variant="yellow">En prepa.</Badge>;
            case 'Listo': return <Badge variant="green">Listo</Badge>;
            case 'Entregado': return <Badge variant="gray">Entregado</Badge>;
            default: return <Badge variant="gray">{estado}</Badge>;
        }
    };

    const statCards = [
        { title: 'Pedidos Activos', value: activeOrders.length, icon: <ShoppingBag className="text-blue-500" size={24} />, trend: '+2 en hora actual' },
        { title: 'Completados Hoy', value: completedOrders.length, icon: <CheckCircle className="text-green-500" size={24} />, trend: '100% éxito éxito de meta' },
        { title: 'Ingresos del Día', value: `$${dailyRevenue.toLocaleString('es-CO')}`, icon: <DollarSign className="text-action" size={24} />, trend: '+15.2% vs ayer' },
    ];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold font-display text-slate-800">Panel General</h2>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {statCards.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-slate-50 rounded-xl">
                                {stat.icon}
                            </div>
                        </div>
                        <h3 className="text-slate-500 text-sm font-medium mb-1">{stat.title}</h3>
                        <div className="text-3xl font-bold text-slate-800 font-display">{stat.value}</div>
                        <div className="mt-4 flex items-center text-xs text-slate-500">
                            <TrendingUp size={14} className="mr-1.5 text-green-500" /> {stat.trend}
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Orders Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="text-lg font-bold font-display text-slate-800">Pedidos Recientes</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-600">
                        <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Pedido</th>
                                <th className="px-6 py-4 font-semibold">Origen</th>
                                <th className="px-6 py-4 font-semibold">Resumen</th>
                                <th className="px-6 py-4 font-semibold text-right">Total</th>
                                <th className="px-6 py-4 font-semibold text-center">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pedidos.slice(0, 5).map((pedido, i) => (
                                <tr key={pedido.id} className={`hover:bg-slate-50 transition-colors ${i !== 4 ? "border-b border-slate-50" : ""}`}>
                                    <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">
                                        #{pedido.id.split('-')[1]}
                                        <div className="text-xs text-slate-400 font-normal mt-0.5">{pedido.hora}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-medium inline-flex items-center px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-700">
                                            {pedido.origen}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="max-w-[250px] truncate text-slate-500" title={pedido.items.map(i => `${i.cantidad}x ${i.nombre}`).join(', ')}>
                                            {pedido.items.map(i => `${i.cantidad}x ${i.nombre}`).join(', ')}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-right text-slate-700">
                                        ${pedido.total.toLocaleString('es-CO')}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {getStatusBadge(pedido.estado)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

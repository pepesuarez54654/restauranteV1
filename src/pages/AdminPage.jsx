import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from '../components/admin/Sidebar';
import Dashboard from '../components/admin/Dashboard';
import PedidosKanban from '../components/admin/PedidosKanban';
import MenuManager from '../components/admin/MenuManager';
import MesasGrid from '../components/admin/MesasGrid';

export default function AdminPage() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-bg-light flex">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex flex-col flex-1 md:pl-64 transition-all duration-300 min-w-0">
                <header className="flex items-center p-4 bg-white border-b border-slate-200 md:hidden sticky top-0 z-30 shadow-sm">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <Menu size={24} />
                    </button>
                    <h1 className="ml-4 text-xl font-bold text-primary font-display">DeliBot Admin</h1>
                </header>

                <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
                    <Routes>
                        <Route path="/" element={<Navigate to="dashboard" replace />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="pedidos" element={<PedidosKanban />} />
                        <Route path="menu" element={<MenuManager />} />
                        <Route path="mesas" element={<MesasGrid />} />
                        <Route path="config" element={
                            <div className="p-8 text-center text-slate-500 bg-white rounded-2xl border border-dashed border-slate-300 shadow-sm mt-4">
                                Configuración del restaurante próximamente solo en cines
                            </div>
                        } />
                    </Routes>
                </main>
            </div>
        </div>
    );
}

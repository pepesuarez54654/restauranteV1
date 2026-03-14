import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, UtensilsCrossed, Monitor, Settings } from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
    const links = [
        { to: '/admin/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { to: '/admin/pedidos', label: 'Pedidos', icon: <ShoppingBag size={20} /> },
        { to: '/admin/menu', label: 'Menú', icon: <UtensilsCrossed size={20} /> },
        { to: '/admin/mesas', label: 'Mesas', icon: <Monitor size={20} /> },
        { to: '/admin/config', label: 'Configuración', icon: <Settings size={20} /> },
    ];

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-40 bg-black/50 md:hidden animate-in fade-in" onClick={onClose} />
            )}

            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col`}>
                <div className="flex items-center justify-center p-6 border-b border-slate-200">
                    <h1 className="text-2xl font-bold font-display text-primary">DeliBot Admin</h1>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {links.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) =>
                                `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                }`
                            }
                            onClick={() => {
                                if (window.innerWidth < 768) onClose();
                            }}
                        >
                            <span className="mr-3">{link.icon}</span>
                            {link.label}
                        </NavLink>
                    ))}
                </nav>
            </aside>
        </>
    );
}

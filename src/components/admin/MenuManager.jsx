import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Image as ImageIcon } from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Toggle from '../ui/Toggle';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import productosData from '../../data/productos.json';

export default function MenuManager() {
    const [productos, setProductos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '', descripcion: '', precio: '', categoria: 'Platos', imagen: '', activo: true
    });

    useEffect(() => {
        setProductos(productosData);
    }, []);

    const handleToggleActivo = (id) => {
        setProductos(prev => prev.map(p => p.id === id ? { ...p, activo: !p.activo } : p));
    };

    const handleDelete = (id) => {
        if (window.confirm("¿Seguro que deseas eliminar este producto?")) {
            setProductos(prev => prev.filter(p => p.id !== id));
        }
    };

    const openAddModal = () => {
        setEditingId(null);
        setFormData({ nombre: '', descripcion: '', precio: '', categoria: 'Platos', imagen: '', activo: true });
        setIsModalOpen(true);
    };

    const openEditModal = (product) => {
        setEditingId(product.id);
        setFormData({ ...product });
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            setProductos(prev => prev.map(p => p.id === editingId ? { ...formData, id: editingId, precio: Number(formData.precio) } : p));
        } else {
            const newId = `p${Date.now()}`;
            setProductos(prev => [{ ...formData, id: newId, precio: Number(formData.precio) }, ...prev]);
        }
        setIsModalOpen(false);
    };

    const filteredProducts = productos.filter(p =>
        p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.categoria.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500 max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold font-display text-slate-800">Gestión de Menú</h2>
                    <p className="text-slate-500 text-sm mt-1">Administra los productos, precios y disponibilidad</p>
                </div>
                <Button variant="action" onClick={openAddModal} className="shrink-0 shadow-sm shadow-action/20">
                    <Plus size={20} className="mr-2" /> Agregar Producto
                </Button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="Buscar por nombre o categoría..."
                            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-600">
                        <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 font-semibold w-16">Img</th>
                                <th className="px-6 py-4 font-semibold">Producto</th>
                                <th className="px-6 py-4 font-semibold text-center">Categoría</th>
                                <th className="px-6 py-4 font-semibold text-right">Precio</th>
                                <th className="px-6 py-4 font-semibold text-center">Estado</th>
                                <th className="px-6 py-4 font-semibold text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((p, i) => (
                                <tr key={p.id} className={`hover:bg-slate-50 transition-colors ${i !== filteredProducts.length - 1 ? 'border-b border-slate-50' : ''}`}>
                                    <td className="px-6 py-3">
                                        <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden border border-slate-200 flex items-center justify-center text-slate-400">
                                            {p.imagen ? (
                                                <img src={p.imagen} alt={p.nombre} className="w-full h-full object-cover" />
                                            ) : (
                                                <ImageIcon size={20} />
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-3">
                                        <div className="font-bold text-slate-800 text-base">{p.nombre}</div>
                                        <div className="text-xs text-slate-500 line-clamp-1 max-w-xs mt-0.5">{p.descripcion}</div>
                                    </td>
                                    <td className="px-6 py-3 text-center">
                                        <Badge variant="blue">{p.categoria}</Badge>
                                    </td>
                                    <td className="px-6 py-3 font-bold text-right text-primary">
                                        ${p.precio.toLocaleString('es-CO')}
                                    </td>
                                    <td className="px-6 py-3 text-center">
                                        <div className="flex justify-center">
                                            <Toggle
                                                checked={p.activo}
                                                onChange={() => handleToggleActivo(p.id)}
                                            />
                                        </div>
                                        <div className="text-[10px] mt-1 text-slate-400 font-medium tracking-wide uppercase">
                                            {p.activo ? 'Visible' : 'Oculto'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-3 text-right">
                                        <div className="flex justify-end gap-1.5">
                                            <button
                                                onClick={() => openEditModal(p)}
                                                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100"
                                                title="Editar"
                                            >
                                                <Edit2 size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(p.id)}
                                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                                                title="Eliminar"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredProducts.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                                        No se encontraron productos coincidentes.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? 'Editar Producto' : 'Nuevo Producto'}>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <Input
                        label="Nombre del producto"
                        required
                        value={formData.nombre}
                        onChange={e => setFormData({ ...formData, nombre: e.target.value })}
                    />
                    <div className="flex flex-col">
                        <label className="mb-1.5 text-sm font-medium text-slate-700">Descripción</label>
                        <textarea
                            className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary block w-full rounded-lg sm:text-sm resize-none h-24 transition-colors"
                            value={formData.descripcion}
                            onChange={e => setFormData({ ...formData, descripcion: e.target.value })}
                            required
                        ></textarea>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            type="number"
                            label="Precio (COP)"
                            required
                            min="0"
                            value={formData.precio}
                            onChange={e => setFormData({ ...formData, precio: e.target.value })}
                        />
                        <div className="flex flex-col">
                            <label className="mb-1.5 text-sm font-medium text-slate-700">Categoría</label>
                            <select
                                className="px-3 py-2 bg-white border shadow-sm border-slate-300 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary block w-full rounded-lg sm:text-sm transition-colors"
                                value={formData.categoria}
                                onChange={e => setFormData({ ...formData, categoria: e.target.value })}
                            >
                                <option value="Entradas">Entradas</option>
                                <option value="Platos">Platos</option>
                                <option value="Bebidas">Bebidas</option>
                                <option value="Postres">Postres</option>
                            </select>
                        </div>
                    </div>
                    <Input
                        label="URL de Imagen (opcional)"
                        type="url"
                        value={formData.imagen}
                        onChange={e => setFormData({ ...formData, imagen: e.target.value })}
                    />
                    <div className="pt-2 pb-2 flex items-center justify-between bg-slate-50 px-4 py-3 rounded-xl border border-slate-100">
                        <div>
                            <span className="block text-sm font-bold text-slate-800">Estado del producto</span>
                            <span className="text-xs text-slate-500">¿Será visible para los clientes?</span>
                        </div>
                        <Toggle checked={formData.activo} onChange={() => setFormData({ ...formData, activo: !formData.activo })} />
                    </div>
                    <div className="pt-6 border-t border-slate-100 flex justify-end gap-3 mt-6">
                        <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                        <Button type="submit" variant="primary" className="px-6">{editingId ? 'Guardar Cambios' : 'Crear Producto'}</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

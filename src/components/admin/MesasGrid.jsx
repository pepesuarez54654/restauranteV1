import React, { useState, useEffect } from 'react';
import { QrCode, Users } from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import mesasData from '../../data/mesas.json';

export default function MesasGrid() {
    const [mesas, setMesas] = useState([]);
    const [selectedMesa, setSelectedMesa] = useState(null);

    useEffect(() => {
        setMesas(mesasData);
    }, []);

    const openQrModal = (mesa) => {
        setSelectedMesa(mesa);
    };

    const closeQrModal = () => {
        setSelectedMesa(null);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 max-w-6xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold font-display text-slate-800">Mapa de Mesas</h2>
                    <p className="text-slate-500 text-sm mt-1">Supervisa la ocupación y genera códigos QR</p>
                </div>
                <div className="flex gap-4 text-sm font-medium">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div> Libre
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div> Ocupada
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {mesas.map(mesa => (
                    <div
                        key={mesa.id}
                        className={`relative bg-white p-5 rounded-2xl shadow-sm border-2 transition-all hover:shadow-md flex flex-col items-center text-center ${mesa.estado === 'Libre' ? 'border-transparent hover:border-green-200' : 'border-red-100 bg-red-50/10'
                            }`}
                    >
                        <div className={`absolute top-3 right-3 w-3 h-3 rounded-full ${mesa.estado === 'Libre' ? 'bg-green-500' : 'bg-red-500'}`}></div>

                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 mt-2 ${mesa.estado === 'Libre' ? 'bg-slate-100 text-slate-400' : 'bg-red-100 text-red-500'}`}>
                            <Users size={32} />
                        </div>

                        <h3 className="text-xl font-bold font-display text-slate-800 mb-1">Mesa {mesa.numero}</h3>
                        <Badge variant={mesa.estado === 'Libre' ? 'green' : 'red'} className="mb-4">
                            {mesa.estado}
                        </Badge>

                        <Button
                            variant={mesa.estado === 'Libre' ? 'outline' : 'ghost'}
                            className="w-full mt-auto"
                            onClick={() => openQrModal(mesa)}
                        >
                            <QrCode size={16} className="mr-2" /> Ver QR
                        </Button>
                    </div>
                ))}
            </div>

            <Modal isOpen={!!selectedMesa} onClose={closeQrModal} title={`Mesa ${selectedMesa?.numero} - RestauranteDemo`}>
                <div className="flex flex-col items-center py-6 text-center animate-in zoom-in duration-300">
                    <p className="text-slate-500 mb-6">Escanea este código para acceder al menú desde tu mesa.</p>

                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-8 flex items-center justify-center">
                        {/* Mock QR since we don't have qrcode.react dependency. Oversized Icon used as placeholder. */}
                        <QrCode size={200} className="text-slate-800" strokeWidth={1} />
                    </div>

                    <div className="bg-slate-50 border border-slate-100 px-6 py-3 rounded-lg text-sm text-slate-600 font-mono mb-6 w-full truncate">
                        https://delibot.app/menu/1?mesa={selectedMesa?.numero}
                    </div>

                    <div className="w-full flex gap-3">
                        <Button variant="outline" className="flex-1" onClick={closeQrModal}>Cerrar</Button>
                        <Button variant="primary" className="flex-1" onClick={() => {
                            alert('Código QR descargado!');
                            closeQrModal();
                        }}>Descargar QR</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

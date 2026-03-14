import React from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { CheckCircle2 } from 'lucide-react';

export default function OrderConfirmModal({ isOpen, onClose }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="¡Pedido Enviado!">
            <div className="flex flex-col items-center py-6 text-center animate-in zoom-in duration-500">
                <CheckCircle2 size={96} className="text-green-500 mb-6 drop-shadow-sm" />
                <h4 className="text-3xl font-bold text-slate-800 mb-3 font-display">¡Todo listo!</h4>
                <p className="text-slate-600 mb-8 max-w-sm text-lg leading-relaxed">
                    Hemos recibido tu pedido correctamente. Te notificaremos por WhatsApp sobre el estado de preparación.
                </p>
                <Button variant="primary" className="w-full max-w-xs py-3 text-lg" onClick={onClose}>
                    Entendido
                </Button>
            </div>
        </Modal>
    );
}

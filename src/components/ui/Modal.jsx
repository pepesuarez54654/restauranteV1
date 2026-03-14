import React from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-black bg-opacity-50 transition-opacity">
            <div className="relative w-full max-w-lg p-4 mx-auto my-6">
                <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-2xl font-semibold font-display text-primary">
                            {title}
                        </h3>
                        <button
                            className="p-1 ml-auto bg-transparent border-0 text-slate-500 float-right text-3xl leading-none font-semibold outline-none focus:outline-none hover:text-slate-800 transition-colors"
                            onClick={onClose}
                        >
                            <X size={24} />
                        </button>
                    </div>
                    <div className="relative p-6 flex-auto">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

import React from 'react';

export default function Toggle({ checked, onChange, label }) {
    return (
        <label className="flex items-center cursor-pointer">
            <div className="relative">
                <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
                <div className={`block w-10 h-6 rounded-full transition-colors ${checked ? 'bg-primary' : 'bg-gray-300'}`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${checked ? 'transform translate-x-4' : ''}`}></div>
            </div>
            {label && <div className="ml-3 text-sm font-medium text-gray-700">{label}</div>}
        </label>
    );
}

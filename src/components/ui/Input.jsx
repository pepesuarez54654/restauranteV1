import React from 'react';

export default function Input({ label, error, className = '', ...props }) {
    return (
        <div className={`flex flex-col mb-4 ${className}`}>
            {label && <label className="mb-1 text-sm font-medium text-slate-700">{label}</label>}
            <input
                className={`px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-primary block w-full rounded-md sm:text-sm focus:ring-1 transition-colors ${error ? 'border-red-500' : ''}`}
                {...props}
            />
            {error && <span className="mt-1 text-sm text-red-500">{error}</span>}
        </div>
    );
}

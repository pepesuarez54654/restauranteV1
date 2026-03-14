import React from 'react';

export default function Button({ children, variant = 'primary', className = '', ...props }) {
    const baseStyle = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    const variants = {
        primary: 'bg-primary text-white hover:bg-[#15542d] focus:ring-primary',
        action: 'bg-action text-white hover:bg-[#c46914] focus:ring-action',
        outline: 'border-2 border-primary text-primary hover:bg-primary/10 focus:ring-primary',
        ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
        danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
    };
    const classes = `${baseStyle} ${variants[variant]} px-4 py-2 ${className}`;

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
}

import React from 'react';

export default function Header({ restaurantName = "RestauranteDemo" }) {
    return (
        <header className="sticky top-0 z-40 w-full bg-white shadow-sm border-b border-slate-200">
            <div className="container px-4 py-3 mx-auto flex items-center justify-between max-w-2xl">
                <h1 className="text-2xl font-bold text-primary font-display line-clamp-1">
                    {restaurantName}
                </h1>
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                    {restaurantName.charAt(0)}
                </div>
            </div>
        </header>
    );
}

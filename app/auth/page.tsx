'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Smartphone, Eye, EyeOff } from 'lucide-react';

export default function AuthPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showRegisterPassword, setShowRegisterPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Login State
    const [loginIdentifier, setLoginIdentifier] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    // Register State
    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        acceptTerms: false
    });

    const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setRegisterData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Login:', { loginIdentifier, loginPassword });
        // Implement login logic here
    };

    const handleRegisterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Register:', registerData);
        // Implement register logic here
    };

    return (
        <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-16">

                {/* Back to Home */}
                <div className="max-w-4xl mx-auto">
                    <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-red-600 transition-colors text-sm font-medium">
                        ← Volver al inicio
                    </Link>
                </div>

                {/* Login Section */}
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-px bg-red-600 flex-1"></div>
                        <h2 className="text-2xl font-medium text-gray-600">Inicia Sesión</h2>
                        <div className="h-px bg-red-600 flex-1"></div>
                    </div>

                    <div className="text-center text-gray-500 mb-8 text-sm">
                        Correo electrónico de steren.com.mx
                    </div>

                    <form onSubmit={handleLoginSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

                        {/* Inputs */}
                        <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">
                                    Correo Electrónico <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    value={loginIdentifier}
                                    onChange={(e) => setLoginIdentifier(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors bg-white text-gray-800"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">
                                    Contraseña <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors bg-white text-gray-800"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <div className="md:col-span-2 flex flex-col items-start gap-2">
                                <button type="submit" className="px-6 py-2 border border-red-600 text-red-600 text-xs font-bold rounded-sm hover:bg-red-50 transition-colors uppercase">
                                    Iniciar Sesión
                                </button>
                                <Link href="#" className="text-xs text-red-600 hover:underline">
                                    ¿Olvidaste tu contraseña?
                                </Link>
                                <p className="text-[10px] text-red-500 mt-2">* Campos obligatorios</p>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Register Section */}
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-px bg-red-600 flex-1"></div>
                        <h2 className="text-2xl font-medium text-gray-600">Crear una cuenta</h2>
                        <div className="h-px bg-red-600 flex-1"></div>
                    </div>

                    <form onSubmit={handleRegisterSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            {/* Name */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">
                                    Nombre <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={registerData.name}
                                    onChange={handleRegisterChange}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors bg-white text-gray-800"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">
                                    Teléfono <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={registerData.phone}
                                    onChange={handleRegisterChange}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors bg-white text-gray-800"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">
                                    Correo Electrónico <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={registerData.email}
                                    onChange={handleRegisterChange}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors bg-white text-gray-800"
                                />
                            </div>

                            {/* Empty div to align grid if needed, or just let it flow */}
                            <div className="hidden md:block"></div>

                            {/* Password */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">
                                    Contraseña <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showRegisterPassword ? "text" : "password"}
                                        name="password"
                                        value={registerData.password}
                                        onChange={handleRegisterChange}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors bg-white text-gray-800"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showRegisterPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                                <p className="text-[10px] text-gray-400 mt-1 bg-gray-100 p-1">
                                    Seguridad de la contraseña: {registerData.password ? (registerData.password.length >= 8 ? 'Fuerte' : 'Débil') : 'Sin contraseña'}
                                </p>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">
                                    Confirmar Contraseña <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="password_confirmation"
                                        value={registerData.password_confirmation}
                                        onChange={handleRegisterChange}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors bg-white text-gray-800"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 mt-8">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="acceptTerms"
                                    checked={registerData.acceptTerms}
                                    onChange={handleRegisterChange}
                                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-600"
                                />
                                <span className="text-xs text-gray-500 uppercase font-bold">
                                    Acepto <Link href="#" className="text-red-600 hover:underline">Términos, Condiciones</Link> y <Link href="#" className="text-red-600 hover:underline">Políticas de Privacidad</Link>
                                </span>
                            </label>
                        </div>

                        <div className="mt-4">
                            <p className="text-[10px] text-red-500 mb-6">* Campos obligatorios</p>
                            <button
                                type="submit"
                                className="w-full md:w-auto px-8 py-3 bg-red-600 text-white font-bold rounded-sm hover:bg-red-700 transition-colors uppercase text-sm"
                            >
                                Crear una cuenta
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

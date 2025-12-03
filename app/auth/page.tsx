'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Smartphone, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Env } from '../../env';

export default function AuthPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showRegisterPassword, setShowRegisterPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

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

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            console.log('Attempting Admin Login to:', Env.login);
            // 1. Attempt Admin Login
            const adminResponse = await fetch(Env.login, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    email: loginIdentifier,
                    password: loginPassword,
                }),
            });

            console.log('Admin Response Status:', adminResponse.status);

            if (adminResponse.ok) {
                console.log('Admin Login Success, redirecting...');
                //window.location.href = 'https://admin.tojoshop.com';
                return;
            }

            console.log('Admin Login Failed, attempting Customer Login to:', Env.loginCustomer);

            // 2. If Admin Login fails, Attempt Customer Login
            const customerResponse = await fetch(Env.loginCustomer, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    email: loginIdentifier,
                    password: loginPassword,
                }),
            });

            console.log('Customer Response Status:', customerResponse.status);

            if (customerResponse.ok) {
                console.log('Customer Login Success, redirecting...');
                router.push('/');
                return;
            } else {
                // Both failed
                console.warn('Both logins failed.');
                setError('Credenciales incorrectas. Por favor verifica tu correo y contraseña.');
            }

        } catch (err: any) {
            console.error('Login Critical Error:', err);
            console.error('Error Name:', err.name);
            console.error('Error Message:', err.message);
            // NetworkError usually has no status code, but let's check if it's a fetch error
            if (err.name === 'TypeError' && err.message === 'Failed to fetch') {
                setError('Error de conexión (CORS o Red). Revisa la consola para más detalles.');
            } else {
                setError(`Error inesperado: ${err.message}`);
            }
        } finally {
            setLoading(false);
        }
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

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-sm flex items-center gap-3 text-red-600 text-sm">
                            <AlertCircle className="w-5 h-5 shrink-0" />
                            <p>{error}</p>
                        </div>
                    )}

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
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-6 py-2 border border-red-600 text-red-600 text-xs font-bold rounded-sm hover:bg-red-50 transition-colors uppercase disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                                            <span>Cargando...</span>
                                        </>
                                    ) : (
                                        'Iniciar Sesión'
                                    )}
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

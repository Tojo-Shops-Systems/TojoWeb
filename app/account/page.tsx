'use client';

import { useState, useEffect } from 'react';
import { Env } from '../../env';
import Link from 'next/link';
import { User, Package, MapPin, Heart, CreditCard, LogOut, Edit, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Header from '../../shared/components/header/header';
import Footer from '../../shared/components/footer/footer';
import Categories from '../../shared/components/categories/categories';

interface UserData {
    name: string;
    email: string;
    phone?: string;
}

export default function AccountPage() {
    const router = useRouter();
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                console.log('Fetching user data from:', Env.user);
                const response = await fetch(Env.user, {
                    credentials: 'include'
                });

                console.log('User fetch response status:', response.status);

                if (response.ok) {
                    const data = await response.json();
                    console.log('User fetch data:', data);
                    if (data.result && data.user) {
                        setUser(data.user);
                    } else {
                        console.warn('User data structure mismatch or missing user:', data);
                    }
                } else {
                    console.warn('User fetch failed, redirecting to auth');
                    // If not authenticated, redirect to login
                    router.push('/auth');
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [router]);

    const handleLogout = async () => {
        try {
            await fetch(Env.logout, {
                method: 'POST',
                credentials: 'include'
            });
            window.location.href = '/';
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const handleCategoryClick = (categoryId: string) => {
        router.push(`/?category=${categoryId}`);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header products={[]} />
            <Categories onCategoryClick={handleCategoryClick} />

            <main className="flex-grow bg-white py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* Sidebar */}
                        <div className="w-full lg:w-64 shrink-0 space-y-1">
                            <h2 className="text-lg font-bold text-gray-800 mb-4 px-4">Mi Cuenta</h2>

                            <nav className="space-y-1">
                                <Link href="#" className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-red-600 transition-colors rounded-sm">
                                    <Package className="w-5 h-5" />
                                    <span className="text-sm font-medium">Mis pedidos</span>
                                </Link>
                                <Link href="#" className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-red-600 transition-colors rounded-sm">
                                    <Heart className="w-5 h-5" />
                                    <span className="text-sm font-medium">Mi lista de deseos</span>
                                </Link>
                                <Link href="#" className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-red-600 transition-colors rounded-sm">
                                    <MapPin className="w-5 h-5" />
                                    <span className="text-sm font-medium">Mis direcciones</span>
                                </Link>
                                <div className="flex items-center gap-3 px-4 py-2 bg-red-50 text-red-600 border-l-4 border-red-600 transition-colors">
                                    <User className="w-5 h-5" />
                                    <span className="text-sm font-bold">Información de la cuenta</span>
                                </div>
                                <Link href="#" className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-red-600 transition-colors rounded-sm">
                                    <CreditCard className="w-5 h-5" />
                                    <span className="text-sm font-medium">Tarjetas guardadas</span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-red-600 transition-colors rounded-sm text-left"
                                >
                                    <LogOut className="w-5 h-5" />
                                    <span className="text-sm font-medium">Cerrar Sesión</span>
                                </button>
                            </nav>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1">
                            <div className="mb-8">
                                <h1 className="text-xl font-medium text-blue-500 uppercase mb-2">Información de la cuenta</h1>
                                <div className="h-px bg-gray-200 w-full"></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                                {/* Contact Info */}
                                <div>
                                    <h3 className="text-sm font-bold text-gray-700 mb-4">Información de contacto</h3>
                                    <div className="space-y-1 mb-4">
                                        {loading ? (
                                            <div className="animate-pulse space-y-2">
                                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                            </div>
                                        ) : user ? (
                                            <>
                                                <p className="text-sm text-gray-600">{user.name}</p>
                                                <p className="text-sm text-gray-600">{user.email}</p>
                                            </>
                                        ) : (
                                            <p className="text-sm text-red-500">No se pudo cargar la información.</p>
                                        )}
                                    </div>
                                    <div className="flex gap-4 text-sm">
                                        <Link href="#" className="text-blue-500 hover:underline">Editar</Link>
                                        <span className="text-gray-300">|</span>
                                        <Link href="#" className="text-blue-500 hover:underline">Cambiar contraseña</Link>
                                    </div>
                                </div>

                                {/* Newsletters */}
                                <div>
                                    <h3 className="text-sm font-bold text-gray-700 mb-4">Newsletters</h3>
                                    <p className="text-sm text-gray-600 mb-4">No estás suscrito al boletín de noticias</p>
                                    <Link href="#" className="text-blue-500 hover:underline text-sm">Editar</Link>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h2 className="text-xl font-medium text-blue-500 uppercase mb-2">Mis Direcciones</h2>
                                <div className="h-px bg-gray-200 w-full mb-6"></div>

                                <Link href="#" className="flex items-center gap-2 text-blue-500 hover:underline text-sm mb-8">
                                    <Edit className="w-4 h-4" />
                                    Administrar Direcciones
                                </Link>

                                <div>
                                    <h3 className="text-sm font-bold text-gray-700 mb-4">Dirección de envío predeterminada</h3>
                                    <p className="text-sm text-gray-600 mb-4">No tienes una dirección de envío por defecto.</p>
                                    <Link href="#" className="text-blue-500 hover:underline text-sm">Editar</Link>
                                </div>
                            </div>

                            {/* Secure Payments Footer */}
                            <div className="mt-16 pt-8 border-t border-gray-200">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <h4 className="text-xs font-bold text-gray-500 uppercase mb-4 text-center">Pagos Seguros</h4>
                                        <div className="flex flex-wrap justify-center gap-2 grayscale opacity-70">
                                            {/* Placeholders for payment icons */}
                                            <div className="h-8 w-12 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-[10px]">VISA</div>
                                            <div className="h-8 w-12 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-[10px]">MC</div>
                                            <div className="h-8 w-12 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-[10px]">AMEX</div>
                                            <div className="h-8 w-12 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-[10px]">PayPal</div>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-gray-500 uppercase mb-4 text-center">Transacciones Seguras | Envío Seguro</h4>
                                        <div className="flex flex-wrap justify-center gap-2 grayscale opacity-70">
                                            <div className="h-8 w-12 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-[10px]">FedEx</div>
                                            <div className="h-8 w-12 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-[10px]">DHL</div>
                                            <div className="h-8 w-12 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-[10px]">SSL</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

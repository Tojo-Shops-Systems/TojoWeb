'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Phone, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="w-full bg-gray-50 pt-10 pb-6 border-t border-gray-200 mt-10">
            <div className="w-full max-w-7xl mx-auto px-6">

                {/* Top Section: Social Media */}
                <div className="flex justify-end items-center gap-4 mb-8">
                    <span className="text-sm font-bold text-gray-700 uppercase">Siguenos en</span>
                    <div className="flex items-center gap-3">
                        <Link href="#" className="p-2 rounded-full border border-blue-400 text-blue-500 hover:bg-blue-50 transition-colors">
                            <Facebook className="w-4 h-4" />
                        </Link>
                        <Link href="#" className="p-2 rounded-full border border-blue-300 text-blue-400 hover:bg-blue-50 transition-colors">
                            <Twitter className="w-4 h-4" />
                        </Link>
                        <Link href="#" className="p-2 rounded-full border border-pink-400 text-pink-500 hover:bg-pink-50 transition-colors">
                            <Instagram className="w-4 h-4" />
                        </Link>
                        <Link href="#" className="p-2 rounded-full border border-red-500 text-red-500 hover:bg-red-50 transition-colors">
                            <Youtube className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                {/* Middle Section: Links & Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 bg-gray-100 p-8 rounded-lg">

                    {/* Categories Column */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-800 uppercase mb-4">CATEGORÍAS</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="text-sm text-gray-600 hover:text-blue-600">Smart Home</Link></li>
                            <li><Link href="#" className="text-sm text-gray-600 hover:text-blue-600">TV y Video</Link></li>
                            <li><Link href="#" className="text-sm text-gray-600 hover:text-blue-600">Audio</Link></li>
                            <li><Link href="#" className="text-sm text-gray-600 hover:text-blue-600">Cables</Link></li>
                            <li><Link href="#" className="text-sm text-gray-600 hover:text-blue-600">Seguridad</Link></li>
                            <li><Link href="#" className="text-sm text-gray-600 hover:text-blue-600">Computación</Link></li>
                        </ul>
                    </div>

                    {/* Brand Column */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-800 uppercase mb-4">TOJOSHOP</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="text-sm text-gray-600 hover:text-blue-600">Nosotros</Link></li>
                            <li><Link href="#" className="text-sm text-gray-600 hover:text-blue-600">Bolsa de trabajo</Link></li>
                            <li><Link href="#" className="text-sm text-gray-600 hover:text-blue-600">Tiendas</Link></li>
                            <li><Link href="#" className="text-sm text-gray-600 hover:text-blue-600">Ventas corporativas</Link></li>
                            <li><Link href="#" className="text-sm text-gray-600 hover:text-blue-600">Facturación</Link></li>
                        </ul>
                    </div>

                    {/* Policies Column */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-800 uppercase mb-4">POLÍTICAS</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="text-sm text-gray-600 hover:text-blue-600">Términos y condiciones</Link></li>
                            <li><Link href="#" className="text-sm text-gray-600 hover:text-blue-600">Aviso de privacidad</Link></li>
                            <li><Link href="#" className="text-sm text-gray-600 hover:text-blue-600">Políticas de envío</Link></li>
                            <li><Link href="#" className="text-sm text-gray-600 hover:text-blue-600">Políticas de garantía</Link></li>
                            <li><Link href="#" className="text-sm text-gray-600 hover:text-blue-600">Políticas de devolución</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Contact Info Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 px-4">
                    <div>
                        <h3 className="text-sm font-bold text-gray-800 uppercase mb-2">DIRECCIÓN</h3>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            TojoShop S.A. de C.V con domicilio en:<br />
                            Av. Tecnológico No. 123,<br />
                            Col. Centro, Ciudad de México, CDMX, C.P. 01234
                        </p>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-gray-800 uppercase mb-2">SERVICIO A CLIENTES</h3>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2 text-blue-500">
                                <Phone className="w-4 h-4" />
                                <span className="text-sm font-bold">55 1234 5678</span>
                            </div>
                            <div className="flex items-center gap-2 text-green-500">
                                <Phone className="w-4 h-4" />
                                <span className="text-sm font-bold">55 8765 4321</span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                                <p>LUNES A VIERNES <span className="text-blue-500 font-bold">8:00 AM A 10:00 PM.</span></p>
                                <p>SÁBADOS Y DOMINGOS <span className="text-blue-500 font-bold">9:00 AM A 10:00 PM.</span></p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Copyright & Logo */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200 gap-4">
                    <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-gray-600 transition-colors">
                        TojoShop
                    </Link>
                    <p className="text-[10px] text-gray-400 text-center md:text-right uppercase">
                        2025 ELECTRONICA TOJOSHOP, S.A. DE C.V. TODOS LOS DERECHOS RESERVADOS
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;

import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Instagram } from 'lucide-react';
import Image from 'next/image';

const footerNavigation = {
    main: [
        { name: 'Home', href: '/' },
        { name: 'About Us', href: '/about' },
        { name: 'Irrigation Profiles', href: '/irrigation' },
        { name: 'Data & Statistics', href: '/data' },
        { name: 'News', href: '/news' },
        { name: 'Gallery', href: '/gallery' },
        { name: 'Contact', href: '/contact' },
    ],
    support: [
        { name: 'Help Center', href: '/help' },
        { name: 'FAQs', href: '/faq' },
        { name: 'Report Issue', href: '/report' },
    ],
};

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="col-span-1 lg:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <Image
                                src="/images/second-logo.png"
                                alt="Admin Avatar"
                                width={250}
                                height={40}
                                priority />
                        </div>
                        <p className="text-gray-300 mb-6 max-w-md">
                            Bunta Irrigation Monitoring Office provides comprehensive water management
                            and irrigation information services for farmers and stakeholders in the region.
                        </p>

                        {/* Contact Information */}
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0" />
                                <span className="text-gray-300">Jl. Irrigation Office No. 123, Bunta– District</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                                <span className="text-gray-300">+62 812-3456-7890</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                                <span className="text-gray-300">info@bunta-irrigation.go.id</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Clock className="w-5 h-5 text-blue-400 flex-shrink-0" />
                                <span className="text-gray-300">Mon-Fri: 8:00 AM - 4:00 PM</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {footerNavigation.main.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Support</h3>
                        <ul className="space-y-2">
                            {footerNavigation.support.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Social Media (Placeholder) */}
                        <div className="mt-6">
                            <h4 className="text-sm font-semibold mb-3">Follow Us</h4>
                            <div className="flex space-x-4">
                                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                                    <a target='_blank' href="https://www.instagram.com/irigasi_bunta"><Instagram size={20} /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm">
                        © {new Date().getFullYear()} Bunta– Irrigation Monitoring Office. All rights reserved.
                    </p>
                    <p className="text-gray-400 text-sm">Powered by <span><a className="text-lg font-bold text-blue-400 hover:text-blue-300" href="https://www.gegacreative.com/" target='_blank'>Gega Creative</a></span></p>

                </div>
            </div>
        </footer>
    );
}
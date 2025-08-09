'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  const footerLinks = [
    {
      title: 'Navigation',
      links: [
        { name: 'Home', href: '/' },
        { name: 'Movies', href: '/movies' },
        { name: 'TV Shows', href: '/tv-shows' },
        { name: 'New & Popular', href: '/new' },
      ],
    },
    {
      title: 'Genres',
      links: [
        { name: 'Action', href: '/genre/action' },
        { name: 'Comedy', href: '/genre/comedy' },
        { name: 'Drama', href: '/genre/drama' },
        { name: 'Sci-Fi', href: '/genre/sci-fi' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Terms of Use', href: '/terms' },
        { name: 'Privacy', href: '/privacy' },
        { name: 'Cookie Preferences', href: '/cookies' },
        { name: 'Corporate Information', href: '/corporate' },
      ],
    },
  ];

  return (
    <footer className="bg-black text-gray-400 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="text-2xl font-bold mb-4 block">
              <span className="text-red-600 font-extrabold">CINEMA</span>
              <span className="font-extrabold">HUB</span>
            </Link>
            <p className="text-gray-500 text-sm mb-6">
              Watch unlimited movies, TV shows, and more. Stream anywhere, anytime.
            </p>
            <div className="flex space-x-4">
              {['facebook', 'twitter', 'instagram', 'youtube'].map((social) => (
                <a 
                  key={social} 
                  href={`https://${social}.com`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="h-8 w-8 rounded-full border border-gray-600 flex items-center justify-center hover:border-white hover:text-white transition-colors duration-300"
                >
                  <span className="sr-only">{social}</span>
                  <i className={`fab fa-${social}`}></i>
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-normal text-gray-500 mb-4">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <select 
              className="bg-transparent text-gray-400 text-xs py-1 px-2 border border-gray-600 rounded focus:outline-none"
              defaultValue="en"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
          <p className="text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} CINEMAHUB. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
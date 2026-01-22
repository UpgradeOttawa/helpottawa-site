import React from 'react';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="text-3xl">🏠</div>
              <div className="text-xl font-bold">HelpOttawa</div>
            </div>
            <p className="text-slate-400 mb-4">
              Your trusted resource for renovation planning in Ottawa. 
              Free calculators, hazard checks, and verified contractors.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Calculators */}
          <div>
            <h3 className="text-lg font-bold mb-4">Free Calculators</h3>
            <ul className="space-y-2">
              <li>
                <a href="/bathroom-calculator" className="text-slate-400 hover:text-white transition-colors">
                  Bathroom Renovation
                </a>
              </li>
              <li>
                <a href="/bathroom-designer" className="text-slate-400 hover:text-white transition-colors">
                  Bathroom Designer
                </a>
              </li>
              <li className="text-slate-600">
                Kitchen Renovation (Soon)
              </li>
              <li className="text-slate-600">
                Deck Builder (Soon)
              </li>
              <li className="text-slate-600">
                Paint Calculator (Soon)
              </li>
              <li className="text-slate-600">
                Drywall Calculator (Soon)
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="/hazard-map" className="text-slate-400 hover:text-white transition-colors">
                  Hazard Map
                </a>
              </li>
              <li>
                <a href="/contractors" className="text-slate-400 hover:text-white transition-colors">
                  Find Contractors
                </a>
              </li>
              <li>
                <a href="/suppliers" className="text-slate-400 hover:text-white transition-colors">
                  Supplier Directory
                </a>
              </li>
              <li>
                <a href="/blog" className="text-slate-400 hover:text-white transition-colors">
                  Renovation Guides
                </a>
              </li>
              <li>
                <a href="/about" className="text-slate-400 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-slate-400 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Get in Touch</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-slate-400 text-sm">Phone</div>
                  <a href="tel:613-314-7926" className="hover:text-red-400 transition-colors">
                    613-314-7926
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-slate-400 text-sm">Email</div>
                  <a href="mailto:helpottawa@gmail.com" className="hover:text-red-400 transition-colors">
                    helpottawa@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-slate-400 text-sm">Service Area</div>
                  <div>Ottawa & Eastern Ontario</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Supplier Partners */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <h3 className="text-lg font-bold mb-6 text-center">Our Canadian Supplier Partners</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-slate-800 p-4 rounded-lg text-center">
              <div className="text-2xl mb-2">🏠</div>
              <div className="font-semibold text-sm">Home Hardware</div>
              <div className="text-xs text-slate-400">100% Canadian</div>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg text-center">
              <div className="text-2xl mb-2">🛠️</div>
              <div className="font-semibold text-sm">RONA</div>
              <div className="text-xs text-slate-400">Canadian Heritage</div>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg text-center">
              <div className="text-2xl mb-2">🚰</div>
              <div className="font-semibold text-sm">EMCO Corporation</div>
              <div className="text-xs text-slate-400">Ottawa-Based</div>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg text-center">
              <div className="text-2xl mb-2">🎨</div>
              <div className="font-semibold text-sm">Your Business?</div>
              <a href="/contact" className="text-xs text-red-400 hover:text-red-300">Partner with us</a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-slate-400 text-sm">
              © {currentYear} HelpOttawa.ca - All rights reserved
            </div>
            <div className="flex gap-6 text-sm">
              <a href="/privacy" className="text-slate-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-slate-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="/contact" className="text-slate-400 hover:text-white transition-colors">
                Contact
              </a>
            </div>
            <div className="text-slate-400 text-sm">
              🇨🇦 Made in Ottawa with ❤️
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

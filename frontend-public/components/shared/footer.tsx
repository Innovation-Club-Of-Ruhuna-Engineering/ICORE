import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { MdLocationOn, MdEmail, MdPhone } from 'react-icons/md';

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Logo and Contact */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">ICORE</h1>
          <div className="flex items-center space-x-2">
            <MdPhone className="text-yellow-400" />
            <span>+94-91-XXXXXXX</span>
          </div>
          <div className="flex items-start space-x-2">
            <MdLocationOn className="text-yellow-400 mt-1" />
            <span>University of Ruhuna, Faculty of Engineering, Hapugala, Galle, Sri Lanka</span>
          </div>
          <div className="flex items-center space-x-2">
            <MdEmail className="text-yellow-400" />
            <span>icore@eng.ruh.ac.lk</span>
          </div>

          <div className="flex space-x-4 mt-4 text-yellow-400 text-lg">
            <a href="https://facebook.com" target="_blank"><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank"><FaInstagram /></a>
            <a href="https://youtube.com" target="_blank"><FaYoutube /></a>
          </div>
        </div>

        {/* Company */}
        <div>
          <h2 className="font-bold mb-2">Company</h2>
          <ul className="space-y-1 text-gray-300">
            <li><a href="#">About</a></li>
            <li><a href="#">Awards & Recognition</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        {/* IEEE Projects */}
        <div>
          <h2 className="font-bold mb-2">IEEE Projects</h2>
          <ul className="space-y-1 text-gray-300">
            <li><a href="#">Python IEEE Projects</a></li>
            <li><a href="#">Java IEEE Projects</a></li>
            <li><a href="#">Matlab Projects</a></li>
            <li><a href="#">Dotnet IEEE Projects</a></li>
          </ul>
        </div>

        {/* Final Year Projects */}
        <div>
          <h2 className="font-bold mb-2">Final Year Projects</h2>
          <ul className="space-y-1 text-gray-300">
            <li><a href="#">IEEE Projects</a></li>
            <li><a href="#">MCA Projects</a></li>
            <li><a href="#">Mini Projects for CSE</a></li>
            <li><a href="#">Shop</a></li>
          </ul>
        </div>

        {/* Project Services */}
        <div>
          <h2 className="font-bold mb-2">Project Services</h2>
          <ul className="space-y-1 text-gray-300">
            <li><a href="#">Python Projects</a></li>
            <li><a href="#">Java Projects</a></li>
            <li><a href="#">Dot Net Projects</a></li>
            <li><a href="#">PHP Projects</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/actions/user';
import { FaGithub, FaLinkedin, FaInstagram, FaBars, FaTimes } from 'react-icons/fa';


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const navLinks = ['home', 'about', 'skills', 'project', 'contact'];



  return (
    <header className="relative w-full px-6 py-5 flex items-center justify-between max-w-7xl mx-auto z-50 bg-transparent">

      {/* Mobile Menu Button - Appears at lg (1024px) and below */}
      <button className="lg:hidden text-2xl z-50" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Left: Desktop Navigation - Hidden at lg (1024px) and below */}
      <nav className="hidden lg:flex items-center gap-8 font-medium">
        {navLinks.map((item) => (
          <Link
            key={item}
            to={item === 'home' ? '/' : `/${item}`}
            className="text-black hover:underline decoration-2 underline-offset-4 capitalize text-lg"
          >
            {item}
          </Link>
        ))}
      </nav>

      {/* Logo - Centered on all, but adjust responsive positioning */}
      <div className={`absolute ${menuOpen ? 'left-1/2' : 'left-[45%]'} lg:left-1/2 -translate-x-1/2 top-4 lg:top-2 z-50`}>

        <Link
          className="flex items-center justify-center rounded-full w-12 h-12 lg:w-16 lg:h-16 bg-black text-white border-2 border-solid border-black text-xl lg:text-2xl font-bold shadow-[4px_4px_0px_rgba(0,0,0,0.2)] hover:scale-110 transition-transform"
          to="/"
        >
          TF
        </Link>
      </div>

      {/* Right: Social Icons & User Auth */}
      <div className="flex items-center gap-4 text-xl">
        <div className="hidden lg:flex items-center gap-5">
          <a href="https://github.com/lalosianturi21" target="_blank" rel="noopener noreferrer" className="bg-black text-white rounded-full p-1.5 hover:-translate-y-1 transition-transform text-xl flex items-center justify-center w-9 h-9">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/tio-fulalo-simatupang-5b9547210/" target="_blank" rel="noopener noreferrer" className="bg-[#0077B5] text-white rounded-md p-1.5 hover:-translate-y-1 transition-transform text-xl flex items-center justify-center w-9 h-9">
            <FaLinkedin />
          </a>
          <a href="https://instagram.com/lalosianturi21" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white rounded-lg p-1.5 hover:-translate-y-1 transition-transform text-xl flex items-center justify-center w-9 h-9">
            <FaInstagram />
          </a>
        </div>

        {/* User Account Dropdown */}
        <div className="relative">
          <button onClick={toggleDropdown} className="font-bold text-sm bg-black text-white px-4 py-2 rounded-lg border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.2)] hover:translate-y-1 hover:shadow-[2px_2px_0px_rgba(0,0,0,0.2)] transition-all">
            {userInfo ? 'Account' : 'Login'}
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-white border-2 border-black shadow-[4px_4px_0px_#000] rounded-lg py-2 flex flex-col z-50">
              {userInfo ? (
                <>
                  {userInfo.admin && <Link to='/admin' className="px-4 py-2 hover:bg-gray-100 font-medium">Admin Dashboard</Link>}
                  <Link to='/profile' className="px-4 py-2 hover:bg-gray-100 font-medium">Profile</Link>
                  <button onClick={handleLogout} className="px-4 py-2 hover:bg-gray-100 font-medium text-left text-red-500">Logout</button>
                </>
              ) : (
                <>
                  <Link to='/login' className="px-4 py-2 hover:bg-gray-100 font-medium">Login</Link>
                  <Link to='/register' className="px-4 py-2 hover:bg-gray-100 font-medium">Register</Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-8 lg:hidden">
          {navLinks.map((item) => (
            <Link
              key={item}
              to={item === 'home' ? '/' : `/${item}`}
              onClick={toggleMenu}
              className="text-2xl font-bold uppercase text-black hover:underline"
            >
              {item}
            </Link>
          ))}
          <Link
            to="/certificates"
            onClick={toggleMenu}
            className="text-2xl font-bold uppercase text-black hover:underline"
          >
            Certificates
          </Link>
          <div className="flex items-center gap-6 text-3xl mt-4">
            <a href="https://github.com/lalosianturi21" className="text-black"><FaGithub /></a>
            <a href="https://www.linkedin.com/in/tio-fulalo-simatupang-5b9547210/" className="text-blue-700"><FaLinkedin /></a>
            <a href="https://instagram.com/lalosianturi21" className="text-pink-600"><FaInstagram /></a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

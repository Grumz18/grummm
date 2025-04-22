import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import "./Header.css";

gsap.registerPlugin(ScrollToPlugin);

const navItems = [
  { path: '/', name: 'Home' },
  { path: '#about', name: 'About' },
  { path: '#contact', name: 'Contact' },
  { path: '/qr-generator', name: 'QR Generator' }
];

const Header = () => {
  const navRef = useRef(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [itemPositions, setItemPositions] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const itemsRef = useRef([]);

  // Определяем мобильное устройство
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Мемоизированная функция обновления позиций
  const updatePositions = useCallback(() => {
    const positions = {};
    itemsRef.current.forEach((ref, index) => {
      if (ref) {
        const rect = ref.getBoundingClientRect();
        positions[navItems[index].path] = {
          left: rect.left,
          top: rect.top
        };
      }
    });
    setItemPositions(positions);
  }, []);

  // Измеряем позиции элементов
  useEffect(() => {
    updatePositions();
    window.addEventListener('resize', updatePositions);
    return () => window.removeEventListener('resize', updatePositions);
  }, [pathname, isMobile, updatePositions]);

  const handleHomeClick = useCallback((e) => {
    e.preventDefault();
    if (pathname !== '/') {
      navigate('/');
    } else {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: 0 },
        ease: 'power2.out'
      });
    }
  }, [pathname, navigate]);

  // Обработка скролла
  useEffect(() => {
    const navLinks = navRef.current?.querySelectorAll('a[href^="#"]') || [];
    
    const handleScroll = (e) => {
      const target = e.target.getAttribute('href');
      if (!target.startsWith('#')) return;
      
      e.preventDefault();
      const element = document.querySelector(target);
      if (!element) return;

      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: element,
          offsetY: 80
        },
        ease: 'power2.out'
      });
    };

    navLinks.forEach(link => {
      link.addEventListener('click', handleScroll);
    });

    return () => {
      navLinks.forEach(link => {
        link.removeEventListener('click', handleScroll);
      });
    };
  }, [pathname]);

  const showOnlyHome = pathname === '/qr-generator';

  const calculateOffset = useCallback(() => {
    if (!itemPositions['/'] || !itemPositions['/qr-generator']) return 0;
    return isMobile 
      ? itemPositions['/qr-generator'].top - itemPositions['/'].top
      : itemPositions['/qr-generator'].left - itemPositions['/'].left;
  }, [itemPositions, isMobile]);

  return (
    <header className={`header ${isMobile ? '' : 'fixed-header'}`}>
      <div className="logo">
        <img src="./logo512.png" alt="Logo" />
      </div>
      <nav className="nav-list" ref={navRef}>
        {showOnlyHome ? (
          <motion.li
            className="nav-item"
            initial={{
              x: isMobile ? 0 : -100,
              y: isMobile ? -100 : 0
            }}
            animate={{
              x: isMobile ? 0 : calculateOffset(),
              y: isMobile ? calculateOffset() : 0
            }}
            transition={{ 
              type: 'spring', 
              stiffness: 300,
              damping: 20
            }}
            ref={el => itemsRef.current[0] = el}
          >
            <a href="/" onClick={handleHomeClick}>Home</a>
          </motion.li>
        ) : (
          navItems.map((item, index) => (
            <motion.li
              key={item.path}
              className="nav-item"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              ref={el => itemsRef.current[index] = el}
            >
              {item.path === '/' ? (
                <a href="/" onClick={handleHomeClick}>{item.name}</a>
              ) : item.path.startsWith('/') ? (
                <Link to={item.path}>{item.name}</Link>
              ) : (
                <a href={item.path}>{item.name}</a>
              )}
            </motion.li>
          ))
        )}
      </nav>
    </header>
  );
};

export default Header;
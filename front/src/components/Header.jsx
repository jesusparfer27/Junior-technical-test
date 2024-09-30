import React, { useState, useEffect } from 'react';
import '../css/header.css';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [furnitureNav, setFurnitureNav] = useState([]);
    const [showImage, setShowImage] = useState(false);
    const [animateNavList, setAnimateNavList] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [showSubMenu, setShowSubMenu] = useState(false);
    const [hoverNav, setHoverNav] = useState(false);
    const [hoverElement1, setHoverElement1] = useState(false);

    const { VITE_API, VITE_MONGO_ENDPOINT, VITE_ENDPOINT_HEADER_IMAGE } = import.meta.env;

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const response = await fetch(`${VITE_API}${VITE_MONGO_ENDPOINT}${VITE_ENDPOINT_HEADER_IMAGE}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();
            if (response.ok) {
                setFurnitureNav(data);
            } else {
                console.error("Error:", data.message);
            }
        } catch (error) {
            console.error("Error al obtener el producto", error);
        }
    };

    const toggleMenu = () => {
        if (isOpen) {
            setIsClosing(true);
            setTimeout(() => {
                setIsOpen(false);
                setAnimateNavList(false);
                setIsClosing(false);
            }, 500);
        } else {
            setIsOpen(true);
        }
    };

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                setAnimateNavList(true);
            }, 500);
        }
    }, [isOpen]);

    const handleMouseEnterSubElement = () => {
        setShowImage(true);
        setShowSubMenu(true);
    };

    const handleMouseLeaveSubElement = () => {
        setShowImage(false);
        setTimeout(() => {
            setShowSubMenu(false);
        }, 300);
    };

    const handleMouseEnterNav = () => {
        setHoverNav(true);
    };

    const handleMouseLeaveNav = () => {
        setHoverNav(false);
    };

    const handleMouseEnterElement1 = () => {
        setHoverElement1(true);
    };

    const handleMouseLeaveElement1 = () => {
        setHoverElement1(false);
    };

    return (
        <header>
            <div className="headerFlex">
                <h2 className={`headerLogo ${isOpen || hoverNav ? 'white' : ''}`}>Logo</h2>
                <button className="toggleButton" onClick={toggleMenu}>
                    {isOpen ? 'Cerrar' : 'Abrir'}
                </button>
            </div>
            <div
                className={`navContainer ${isOpen ? 'open' : ''}`}
                onMouseEnter={handleMouseEnterNav}
                onMouseLeave={handleMouseLeaveNav}
            >
                <div className="navContent">
                    <nav className="nav">
                        <ul className={`navList ${animateNavList ? 'show' : ''} ${isClosing ? 'close' : ''}`}>
                            <li 
                                onMouseEnter={handleMouseEnterElement1} 
                                onMouseLeave={handleMouseLeaveElement1}
                            >
                                Elemento 1
                                <ul className={`submenu ${showSubMenu ? 'show' : ''} ${hoverElement1 ? '' : 'close'}`}>
                                    <li
                                        onMouseEnter={handleMouseEnterSubElement}
                                        onMouseLeave={handleMouseLeaveSubElement}
                                    >
                                        SubElemento 1.1
                                    </li>
                                    <li>SubElemento 1.2</li>
                                    <li>SubElemento 1.3</li>
                                </ul>
                            </li>
                            <li>Elemento 2</li>
                            <li>Elemento 3</li>
                            <li>Elemento 4</li>
                        </ul>

                        <ul className={`footerNav ${animateNavList ? 'show' : ''} ${isClosing ? 'close' : ''}`}>
                            <li>About</li>
                            <li>Contact</li>
                            <li>Dealers</li>
                            <li>News</li>
                            <li>Care</li>
                            <li>Press</li>
                        </ul>
                    </nav>
                    <div className={`imageContainer ${showImage ? 'show' : ''} ${isClosing ? 'close' : ''}`}>
                        {furnitureNav.map((furniture) => (
                            <img
                                key={furniture._id}
                                src={`${VITE_API}${furniture.img}`}
                                alt={`Furniture ${furniture._id}`}
                                className="furnitureImage"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

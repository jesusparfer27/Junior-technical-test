import Footer from "../components/Footer";
import Header from "../components/Header";
import { useState, useEffect } from 'react';
import { useIterativeContext } from '../context/IterativeContext';
import '../css/furniture.scroll.css';

export const FurnitureScroll = () => {
    const [furniture, setFurniture] = useState([]);
    const { furnitureByViewport, setFurnitureByViewport } = useIterativeContext();
    const { VITE_API } = import.meta.env;
    const { VITE_MONGO_ENDPOINT } = import.meta.env

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const response = await fetch(`${VITE_API}${VITE_MONGO_ENDPOINT}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();
            if (response.ok) {
                setFurniture(data);
            } else {
                console.error("Error:", data.message);
            }
        } catch (error) {
            console.error("Error al obtener el producto", error);
        }
    };

    const renderFurniture = (index) => {
        const item = furniture[index];
        if (!item) return null;

        const { _id, designer, furniture_type, furniture_description, image } = item;
        return (
            <div key={_id} className="dataMap">
                <div className="flexContainer">
                    <div className="flex-left">
                        <strong>{designer}</strong>
                        <h3>{furniture_type}</h3>
                        <p>{furniture_description}</p>
                    </div>
                    <div className="flex-right">
                        <img src={`${VITE_API}${image}`} alt="" />
                    </div>
                </div>
            </div>
        );
    };

    const handleViewportChange = (newViewport) => {
        if (newViewport !== furnitureByViewport) {
            // Se está saliendo del viewport actual
            setFurnitureByViewport("exit");

            // Después de la animación de salida, cambia al nuevo viewport
            setTimeout(() => {
                setFurnitureByViewport(newViewport);
            }, 2000); // Espera 2 segundos para la animación de salida
        }
    };

    return (
        <>
            <Header />
            <div className={`furniture-container ${furnitureByViewport === "first" ? "first-active" : "first-exit"}`}>
                {furnitureByViewport === "first" && renderFurniture(0)}
            </div>

            <div className={`furniture-container ${furnitureByViewport === "second" ? "second-active" : "first-exit"}`}>
                {furnitureByViewport === "second" && renderFurniture(1)}
            </div>

            <Footer />
        </>
    );
};

import axios from 'axios'
import './HomePage.css'
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { ProductsGrid } from './ProductsGrid';

export function HomePage( {cart, loadCart} ) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('/api/products')
            .then((response) => {
                setProducts(response.data)
            })
    }, []);

    return (
        <>
            <title>Ecommerce project</title>
            <link rel="icon" type="image" href="/home-favicon.png" />

            <Header cart={cart} />

            <div className="home-page">
                <ProductsGrid products={products} loadCart={loadCart} ></ProductsGrid>
            </div>
        </>
    );
}
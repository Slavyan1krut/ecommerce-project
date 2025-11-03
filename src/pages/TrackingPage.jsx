import { Header } from "../components/Header";
import { Link, useParams } from "react-router";
import './TrackingPage.css'
import axios from "axios";
import trackingFavicon from '../assets/images/tracking-favicon.png'
import { useEffect, useState } from "react";
import dayjs from "dayjs";

export function TrackingPage({ cart }) {
    const { orderId, productId } = useParams();

    const [order, setOrder] = useState(null);

    useEffect(() => {
        axios.get(`/api/orders/${orderId}?expand=products`)
            .then((response) => {
                setOrder(response.data);
            })
    }, [orderId]);

    const currentProduct = order?.products.find(
        product => product.productId === productId
    );

    if (order) {
        return (
            <>
                <link rel="icon" type="image/png" href={trackingFavicon} />
                <title>Tracking</title>

                <Header cart={cart} />

                <div className="tracking-page">
                    <div className="order-tracking">
                        <Link className="back-to-orders-link link-primary" to="/orders">
                            View all orders
                        </Link>

                        <div className="delivery-date">
                            Arriving on {dayjs(currentProduct.estimatedDeliveryTimeMs).format('MMMM D')}
                        </div>

                        <div className="product-info">
                            {currentProduct.product.name}
                        </div>

                        <div className="product-info">
                            Quantity: {currentProduct.quantity}
                        </div>

                        <img className="product-image" src={currentProduct.product.image} />

                        <div className="progress-labels-container">
                            <div className="progress-label">
                                Preparing
                            </div>
                            <div className="progress-label current-status">
                                Shipped
                            </div>
                            <div className="progress-label">
                                Delivered
                            </div>
                        </div>

                        <div className="progress-bar-container">
                            <div className="progress-bar"></div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    else {
        return null;
    }


}
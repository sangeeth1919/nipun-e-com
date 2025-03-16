import React, { useMemo } from 'react';
import { Button, List, Typography, Divider } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import styles from './CheckoutContainer.styles';
import { useSelector } from 'react-redux';
import ProductCartQnt from '../Common/ProductCartQnt/ProductCartQnt';
import { useNavigate } from 'react-router-dom';


const CheckouContainer = () => {

    const navigate = useNavigate();

    const { cart } = useSelector((state) => state.cart);
    const cartItems = useMemo(() => {
        const cartActiveList = cart.filter((item) => item.qnt !== 0)
        return cartActiveList;
    }, [cart])

    // Calculate the total price of all items in the cart
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.qnt, 0).toFixed(2);
    };


    const handleCheckout = () => {
        console.log('Proceeding to checkout with items:', cartItems);
        alert('Proceeding to checkout!');
    };

    // Handle the checkout action (for now just a console log)
  
    const navigateToBill = () => {
        navigate(`/shop`)
    }

    return (
        <div style={styles.pageContainer}>
            <List
                itemLayout="horizontal"
                dataSource={cartItems}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            title={item.name}
                            description={`Rs ${item.price.toFixed(2)} * ${item.qnt} (${item.measurement})`}
                        />
                        <div style={styles.itemActions}>
                            <ProductCartQnt product={item} />
                            <span style={styles.itemTotal}>Rs {(item.price * item.qnt).toFixed(2)}</span>
                        </div>
                    </List.Item>
                )}
            />
            <Divider />
            <div style={styles.totalContainer}>
                <Typography.Text strong>Total:</Typography.Text>
                <Typography.Text type="danger" style={styles.totalAmount}>
                    Rs {calculateTotal()}
                </Typography.Text>
            </div>
            <Button
                disabled={cartItems.length === 0}
                type="primary"
                icon={<ShoppingCartOutlined />}
                size="medium"
                onClick={handleCheckout}
                style={styles.checkoutButton}
            >
                Proceed to Checkout
            </Button>
            <Button
                color="danger" variant="filled"
                size="medium"
                onClick={navigateToBill}
                style={styles.checkoutButton}
            >
                Continue Billing
            </Button>
        </div>
    );
};

export default CheckouContainer;

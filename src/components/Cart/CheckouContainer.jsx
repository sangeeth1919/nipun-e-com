import React, { useEffect, useMemo, useState } from 'react';
import { Button, List, Typography, Divider, Row, Col } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import styles from './CheckoutContainer.styles';
import { useSelector } from 'react-redux';
import ProductCartQnt from '../Common/ProductCartQnt/ProductCartQnt';
import { useNavigate } from 'react-router-dom';
import { getCartTotal, handleNewSellsService } from '../../utils/billHelper';
import { clearCartService } from '../../utils/cartHelper';
import { addAlertService } from '../../utils/utils';
import { BILL_SUBMIT } from '../../constants/alertConstants';


const CheckouContainer = () => {

    const navigate = useNavigate();


    const [isMobile, setIsMobile] = useState(false);

    const { cart } = useSelector((state) => state.cart);
    const cartItems = useMemo(() => {
        const cartActiveList = cart.filter((item) => item.qnt !== 0)
        return cartActiveList;
    }, [cart])

    // Calculate the total price of all items in the cart
    const calculateTotal = () => {
        return getCartTotal(cartItems)
    };


    const handleCheckout = async () => {
        await handleNewSellsService();
        clearCartService();
        addAlertService(BILL_SUBMIT);
        navigate(`/shop`)
    };

    // Handle the checkout action (for now just a console log)

    const navigateToBill = () => {
        navigate(`/shop`)
    }
    
      // Handle mobile view based on window size
      const handleResize = () => {
        setIsMobile(window.innerWidth < 1080); // Change threshold for mobile view
      };
    
      // Detect initial window size on component mount
      useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

    return (
        <div style={styles.pageContainer}>
            <List
                itemLayout={isMobile?"vertical":"horizontal"}
                dataSource={cartItems}
                renderItem={(item) => (
                    <List.Item
                    >
                        <List.Item.Meta
                            title={item.name}
                            description={`Rs ${item.price.toFixed(2)} * ${item.qnt} (${item.measurement})`}
                        />
                        <List.Item.Meta
                            title={<ProductCartQnt product={item} />}
                        />

                        <div style={styles.itemActions}>
                            <div style={styles.itemTotal}>Rs {(item.price * item.qnt).toFixed(2)}</div>
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
                Complete Bill
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

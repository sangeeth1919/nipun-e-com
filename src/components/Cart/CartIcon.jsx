import React, { useMemo } from 'react';
import { Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CartIcon = () => {
    
    const navigate = useNavigate();
    const { cart } = useSelector((state) => state.cart);
    const cartItemCount = useMemo(() => {
        const cartActiveList = cart.filter((item) => item.qnt !== 0)
        return cartActiveList.length
    }, [cart])


    const navigateToStock = () => {
        navigate(`/cart`)
    }

    return (
        <div style={styles.cartIconContainer}>
            <Badge count={cartItemCount} overflowCount={99}>
                <ShoppingCartOutlined onClick={navigateToStock} style={styles.cartIcon} />
            </Badge>
        </div>
    );
};

const styles = {
    cartIconContainer: {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000, // Makes sure the icon is on top of other elements,
        cursor: 'pointer',
    },
    cartIcon: {
        fontSize: 32,
        color: '#1890ff',
        backgroundColor: '#fff',
        borderRadius: '50%',
        padding: '5px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)',
    },
};

export default CartIcon;
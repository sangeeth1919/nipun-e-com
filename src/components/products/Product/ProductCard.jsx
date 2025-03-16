import React, { useMemo, useState } from 'react';
import { DeleteOutlined, EditOutlined, InboxOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Card, InputNumber, Space } from 'antd';
import styles from './ProductCard.styles';
import { deleteItemService } from '../../../utils/productHelper';
import { useSelector } from 'react-redux';
import { addLoaderService, removeLoaderService } from '../../../utils/utils';
import { loaderKeys } from '../../../constants/appConstants';
import { useNavigate } from 'react-router-dom';
import { addItemToCartService, removeItemFromCartService } from '../../../utils/cartHelper';
import ProductCartQnt from '../../Common/ProductCartQnt/ProductCartQnt';

const containerStyle = {
    width: '100%', // Full width of the parent container
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const ProductCard = ({ product, fetchProducts, editProduct = () => { } }) => {
    const { fSUser } = useSelector((state) => state.auth);
    const { cart } = useSelector((state) => state.cart);
    const navigate = useNavigate();
    const isAdmin = fSUser?.isAdmin

    const cartItem = useMemo(() => {
        return cart.find((e) => e.pName === product.pName)
    }, [cart])

    const deleteItem = async () => {
        addLoaderService(loaderKeys.productRemove)
        await deleteItemService(product.id)
        fetchProducts()
        removeLoaderService(loaderKeys.productRemove)
    }

    const navigateToStock = () => {
        navigate(`/stock-maintain/${product.name}`)
    }

    const addToCart = () => {
        console.log('product', product)
        addItemToCartService(product)

    }

    const removeFromCart = () => {
        removeItemFromCartService(product.pName);
    }

    
    return (
        <Card
            actions={isAdmin ? [
                <EditOutlined key="edit" onClick={() => editProduct(product)} />,
                <DeleteOutlined style={{ color: '#fc0303' }} key="delete" onClick={deleteItem} />,
                <InboxOutlined key="stock" onClick={navigateToStock} />,
                cartItem ? <DeleteOutlined key="delete" style={{ color: '#fc03ef' }}  onClick={removeFromCart}  /> : <ShoppingCartOutlined key="cart" style={{ color: '#036ffc' }} onClick={addToCart} />
            ] : [
                cartItem ? <DeleteOutlined key="delete" style={{ color: '#fc03ef' }}  onClick={removeFromCart} /> : <ShoppingCartOutlined key="cart" style={{ color: '#036ffc' }} onClick={addToCart} />
            ]}
        >
            <Card.Meta
                title={
                    <span style={styles.name}>{product.name}</span>
                }
                description={
                    <div>
                        <div>
                            <span style={styles.price}>Rs.{product.price}</span>
                        </div>
                        <div style={containerStyle}>
                            <ProductCartQnt product={product} />
                        </div>
                    </div>

                }
            />
        </Card>
    );
};
export default ProductCard;
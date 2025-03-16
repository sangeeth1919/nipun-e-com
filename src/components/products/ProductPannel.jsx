import React from 'react';
import { Col } from 'antd';
import ProductCard from './Product/ProductCard';


const ProductPannel = ({ products, fetchProducts, editProduct = () => { } }) => {

    return (
        <>
            {
                products.map((product) => (
                    <Col
                        key={product.id}
                        xs={24} sm={12} md={8} lg={8} xl={8} // Responsive breakpoints for the columns
                    >
                        <ProductCard product={product} fetchProducts={fetchProducts} editProduct={editProduct} />
                    </Col>
                ))
            }
        </>

    );
};

export default ProductPannel;

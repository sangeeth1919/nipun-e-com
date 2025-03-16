import React, { useState, useEffect } from 'react';
import { Layout, Row, Col } from 'antd';
import CategoryList from './category/CategoryList';
import ProductPannel from './ProductPannel';

const { Content } = Layout;

const ProductList = ({ products, fetchProducts, editProduct = () => { } }) => {
  const [isMobile, setIsMobile] = useState(false);

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

  // Toggle collapse for categories/filters on mobile view


  return (
    <Content style={{ padding: '20px' }}>
      {/* For Mobile View - Collapse Categories & Filters at the top */}
      {isMobile && (
        <div style={{ marginBottom: 16 }}>
          <CategoryList isMobile={isMobile} />
          <Row gutter={16}>
            <Col span={24}>
              {/* For Mobile View - Product Details Section */}
              <Row gutter={[16, 16]}>
                <ProductPannel products={products} fetchProducts={fetchProducts} editProduct={editProduct} />
              </Row>
            </Col>
          </Row>

        </div>
      )}

      {/* For Desktop View - Regular Sidebar Layout */}
      {!isMobile && (
        <Row gutter={16}>
          <Col span={6}>
            <CategoryList isMobile={isMobile} />
          </Col>
          <Col span={18}>
            {/* For Mobile View - Product Details Section */}
            <Row gutter={[16, 16]}>
              <ProductPannel products={products} fetchProducts={fetchProducts} editProduct={editProduct} />
            </Row>
          </Col>
        </Row>
      )}


    </Content>
  );
};

export default ProductList;

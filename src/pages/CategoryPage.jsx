// src/pages/CategoryPage.js

import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Row, Col, Button } from 'antd';
import { products, categories } from '../data';
import { Link } from 'react-router-dom';

function CategoryPage() {
  const { id } = useParams();
  const category = categories.find(cat => cat.id === parseInt(id));
  const filteredProducts = products.filter(product => product.categoryId === parseInt(id));

  return (
    <div style={{ padding: '50px', backgroundColor: '#f0f2f5' }}>
      <h1>{category.name}</h1>
      <Row gutter={16}>
        {filteredProducts.map(product => (
          <Col span={8} key={product.id}>
            <Card
              hoverable
              cover={<img alt={product.name} src={product.imageUrl} />}
              actions={[
                <Link to={`/product/${product.id}`}>
                  <Button type="primary">View Details</Button>
                </Link>,
              ]}
            >
              <Card.Meta title={product.name} description={`$${product.price}`} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default CategoryPage;

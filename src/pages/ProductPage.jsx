// src/pages/ProductPage.js

import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button, Typography } from 'antd';
import { products } from '../data';

const { Title, Paragraph } = Typography;

function ProductPage() {
  const { id } = useParams();
  const product = products.find(prod => prod.id === parseInt(id));
  return (
    <div style={{ padding: '50px', backgroundColor: '#f0f2f5' }}>
      <Card
        style={{ width: 600, margin: '0 auto' }}
        cover={<img alt={product.name} src={product.imageUrl} />}
      >
        <Title level={2}>{product.name}</Title>
        <Typography.Text strong>${product.price}</Typography.Text>
        <Paragraph style={{ marginTop: '20px' }}>
          This is a detailed description of the product. You can add more details here.
        </Paragraph>
        <Button type="primary">Add to Cart</Button>
      </Card>
    </div>
  );
}

export default ProductPage;

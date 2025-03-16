// src/pages/ProductPage.js

import React, { useEffect, useState } from 'react';
import AddProductForm from '../../components/products/AddProductForm';
import { getNewProduct } from '../../utils/productHelper';
import ProductList from '../../components/products/ProductList';
import { loaderKeys } from '../../constants/appConstants';
import { addLoaderService, removeLoaderService } from '../../utils/utils';
import { getCategoryService } from '../../utils/categoryHelpeer';
import PageContainer from '../../components/Common/PageContainer/PageContainer';
import PageHeader from '../../components/Common/PageHeader/PageHeader';
import DataContainer from '../../components/Common/DataContainer/DataContainer';

function AddProductPage() {

  const [products, setProducts] = useState([]);
  const [isEdit, setEdit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({
    "pName": "",
    "price": 0,
    "description": "",
    "measurement": "",
    "category": "",
    "warnningCount": 0
  });
  useEffect(() => {
    // Fetch products from Firestore

    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setEdit(false)
    setSelectedProduct({
      "pName": "",
      "price": 0,
      "description": "",
      "measurement": "",
      "category": "",
      "warnningCount": 0
    })
    addLoaderService(loaderKeys.productFetch)
    const prodList = await getNewProduct()
    removeLoaderService(loaderKeys.productFetch)
    setProducts(prodList)
  };

  const editProduct = (product) => {
    setEdit(true)

    setSelectedProduct({
      ...product,
      "pName": product.name,
    })
  }

  return (
    <PageContainer>
      <PageHeader title='product' subTitle={`manage products`} />
      <DataContainer>
        <AddProductForm fetchProducts={fetchProducts} isEdit={isEdit} initialValues={selectedProduct} />
        <ProductList products={products} fetchProducts={fetchProducts} editProduct={editProduct} />
      </DataContainer>
    </PageContainer>
  );
}

export default AddProductPage;

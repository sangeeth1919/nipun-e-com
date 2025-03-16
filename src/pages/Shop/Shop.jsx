// src/pages/ProductPage.js

import React, { useEffect, useState } from 'react';
import { getNewProduct } from '../../utils/productHelper';
import ProductList from '../../components/products/ProductList';
import { addLoaderService, removeLoaderService } from '../../utils/utils';
import { loaderKeys } from '../../constants/appConstants';
import PageHeader from '../../components/Common/PageHeader/PageHeader';
import DataContainer from '../../components/Common/DataContainer/DataContainer';
import PageContainer from '../../components/Common/PageContainer/PageContainer';
import { useSelector } from 'react-redux';

function Shop() {

    const { selectedCategory } = useSelector((state) => state.category);
    const [products, setProducts] = useState([]);


    useEffect(() => {
        fetchProducts();
    }, [selectedCategory]);


    const fetchProducts = async () => {
        addLoaderService(loaderKeys.productFetch)
        let prodList = await getNewProduct()
        if (selectedCategory) {
            prodList = prodList.filter((e) => e.category === selectedCategory)
        }
        setProducts(prodList)
        removeLoaderService(loaderKeys.productFetch)
    };



    return (
        <PageContainer>
            <PageHeader title='cart' subTitle={`products`} />
            <DataContainer>
                <ProductList products={products} fetchProducts={fetchProducts} />
            </DataContainer>
        </PageContainer>
    );
}

export default Shop;

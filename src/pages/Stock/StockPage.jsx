/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
// src/pages/HomePage.js

import React, { useEffect, useState } from 'react';
import PageHeader from '../../components/Common/PageHeader/PageHeader';
import { useParams } from 'react-router-dom';
import PageContainer from '../../components/Common/PageContainer/PageContainer';
import DataContainer from '../../components/Common/DataContainer/DataContainer';
import MyTable from '../../components/Common/MyTable/MyTable';
import AddStockForm from '../../components/Stock/AddStockForm';
import { addLoaderService, removeLoaderService } from '../../utils/utils';
import { loaderKeys, stockItemCollection } from '../../constants/appConstants';
import FormContainer from '../../components/Common/FormContainer/FormContainer';
import { stockItemRegisterForm } from '../../constants/formConstants';
import { getProductDataByName } from '../../utils/productHelper';
import { getStocksByProducName } from '../../utils/stockHelper';
import { getFireStoreReadableDate } from '../../utils/dateHelper';
import { DeleteOutlined } from '@ant-design/icons';
import { deleteDocument } from '../../utils/firestore';
import { useSelector } from 'react-redux';



function StockPage() {
  const { fSUser } = useSelector((state) => state.auth);
  const isAdmin = fSUser?.isAdmin

  const columns = [
    {
      title: '',
      dataIndex: '',
      key: 'x',
      render: (e) => {
        return (e.qnt === e.qntLeft && isAdmin) && <DeleteOutlined style={{ color: '#fc0303' }} onClick={() => deleteBill(e)} />
      },
    },
    {
      title: 'Bill Identyfier',
      dataIndex: 'billIdentyfier',
    },
    {
      title: 'Qnt',
      dataIndex: 'qnt',
    },
    {
      title: 'Qnt Left',
      dataIndex: 'qntLeft',
    },
    {
      title: 'Item Cost',
      dataIndex: 'itemCost',
    },
    {
      title: 'Total Cost',
      dataIndex: 'totalCost',
    }
  ];

  const params = useParams()

  const [selectedItem, setSelectedItem] = useState(stockItemRegisterForm)
  const [dataSource, setDataSource] = useState([])
  const [isEdit, setEdit] = useState(false)
  const [productData, setData] = useState(null);


  useEffect(() => {
    if (params.productName) {
      fetchProducData();
      fetchStock();
    }
  }, [params.productName]);

  const deleteBill = async (e) => {
    addLoaderService(loaderKeys.addStockBuy)
    await deleteDocument(stockItemCollection, e.id)
    removeLoaderService(loaderKeys.addStockBuy)
    fetchStock();
  }

  const fetchProducData = async () => {
    addLoaderService(loaderKeys.getCategory);
    try {
      const res = await getProductDataByName(params.productName);
      setData(res);
    } catch (error) {
      console.error(error);
    } finally {
      removeLoaderService(loaderKeys.getCategory);
    }
  }

  const fetchStock = async () => {
    const res = await getStocksByProducName('pName', params.productName)
    
    addLoaderService(loaderKeys.getCategory)
    if (res && res.length !== 0) {
      const data = res.map((st) => {
        return {
          ...st,
          date: getFireStoreReadableDate(st.dateAndTime)
        }
      })
      setDataSource(data)
    }

    removeLoaderService(loaderKeys.getCategory)
  }


  return (
    <PageContainer>
      <PageHeader title='product' subTitle={`stock / ${params.productName}`} />
      <DataContainer>
        <FormContainer>
          <AddStockForm initialValues={selectedItem} isEdit={isEdit} fetchStock={fetchStock} productData={productData} />
        </FormContainer>
        <MyTable columns={columns} dataSource={dataSource} />
      </DataContainer>
    </PageContainer>
  );
}

export default StockPage;

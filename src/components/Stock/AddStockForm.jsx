// src/components/AddProduct.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { Input, Button, Form, InputNumber, Select, Row, Col } from 'antd';
import { addProductService, editProducts } from '../../utils/productHelper';
import { loaderKeys } from '../../constants/appConstants';
import { addLoaderService, getRoundValue, removeLoaderService } from '../../utils/utils';
import { Content } from 'antd/es/layout/layout';
import { useSelector } from 'react-redux';
import { DatePicker } from 'antd';
import { addStockItemService, getStockService } from '../../utils/stockHelper';
import dayjs from 'dayjs';

const AddStockForm = (
  {
    fetchStock,
    isEdit = false,
    initialValues,
    productData
  }
) => {
  const [stockBills, setStockBills] = useState([])
  const [form] = Form.useForm();
  const handleAddProduct = async (values) => {
    try {
      const selectedBill = stockBills.find((bill) => bill.value === values.billIdentyfier)
      console.log('values', values)
      console.log('selectedBill', selectedBill)
      const obj = {
        ...values,
        qntLeft: parseFloat(values.qnt),
        qnt: parseFloat(values.qnt),
        "totalCost": getRoundValue(parseFloat(values.totalCost)),
        "itemCost": getRoundValue(parseFloat(values.itemCost)),
        dateAndTime: new dayjs().toDate(),
        pName: productData.pName
      }

      addLoaderService(loaderKeys.productAdd)
      await addStockItemService(obj)
      removeLoaderService(loaderKeys.productAdd)
      formReset()
    } catch (e) {
      removeLoaderService(loaderKeys.productAdd)
      console.error('Error adding document: ', e);
    }
  };



  useEffect(() => {
    getStockBillList()
  }, [])

  const getStockBillList = async () => {
    addLoaderService(loaderKeys.getCategory)
    const res = await getStockService();
    const data = res.map((e) => {
      return {
        value: e.billIdentyfier,
        label: e.billIdentyfier,
        data: e
      }
    })
    setStockBills(data)
    removeLoaderService(loaderKeys.getCategory)
  }


  const handleFormChange = (values) => {
    form.setFieldValue('itemCost', getRoundValue(parseFloat(values.totalCost / values.qnt)))
  }

  const formReset = () => {
    fetchStock()
    form.resetFields();
  }

  return (
    <Form onValuesChange={(e, allValues) => handleFormChange(allValues)} layout="vertical" form={form} initialValues={initialValues} onFinish={handleAddProduct}>
      <Row justify="left" gutter={[16, 16]}>
        <Col xs={12} sm={12} md={8} lg={8} xl={6}>
          <Form.Item label="Parent Bill" rules={[
            {
              required: true,
              message: 'Please select Parent Bill!',
            },
          ]} name='billIdentyfier'>
            <Select
              options={stockBills}
            />
          </Form.Item>
        </Col>
        <Col xs={12} sm={12} md={8} lg={8} xl={6}>
          <Form.Item name='totalCost' rules={[
            {
              required: true,
              message: 'Please input Cost!',
            },
            {
              validator: (_, value) => {
                if (value <= 0) {
                  return Promise.reject(new Error('Cost should be greater than 0!'));
                }
                return Promise.resolve();
              },
            }
          ]} label="Cost" required>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Col>

        <Col xs={12} sm={12} md={8} lg={8} xl={6}>
          <Form.Item name='qnt' rules={[
            {
              required: true,
              message: 'Please input Qnt.!',
            },
            {
              validator: (_, value) => {
                if (value <= 0) {
                  return Promise.reject(new Error('qnt should be greater than 0!'));
                }
                return Promise.resolve();
              },
            },
          ]} label={`Qnt (${productData?.measurement && productData.measurement})`} required>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Col>

        <Col xs={12} sm={12} md={8} lg={8} xl={6}>
          <Form.Item name='itemCost' rules={[
            {
              required: true,
              message: 'Please input Cost!',
            },
          ]} label="cost per item" required>
            <InputNumber disabled style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          {isEdit ? 'Edit' : 'Add'}
        </Button>
      </Form.Item>
    </Form>

  );
};

export default AddStockForm;

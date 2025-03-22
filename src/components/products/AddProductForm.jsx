// src/components/AddProduct.jsx
import React, { useMemo } from 'react';
import { Input, Button, Form, InputNumber, Select, Row, Col } from 'antd';
import { addProductService, editProducts } from '../../utils/productHelper';
import { loaderKeys } from '../../constants/appConstants';
import { addLoaderService, removeLoaderService } from '../../utils/utils';
import { useSelector } from 'react-redux';


const AddProductForm = (
  {
    fetchProducts,
    isEdit = false,
    initialValues = {
      "pName": "",
      "price": 0,
      "description": "",
      "measurement": "",
      "category": "",
      "warnningCount": 0
    } }
) => {
  const { categories } = useSelector((state) => state.category);
  const categoryList = useMemo(() => {
    const tempCat = [[
      {
        value: '',
        label: 'no category',
      }
    ]];
    categories.forEach(element => {
      tempCat.push({
        value: element.categoryName,
        label: element.categoryName,
      })
    });
    return tempCat;
  }, [categories])

  const [form] = Form.useForm();
  form.setFieldsValue(initialValues)
  const handleAddProduct = async (values) => {
    try {
      addLoaderService(loaderKeys.productAdd)
      await addProductService({
        ...values,
        name: values.pName,
        description: values.description,
        price: parseFloat(values.price)
      })
      removeLoaderService(loaderKeys.productAdd)
      formReset()
    } catch (e) {
      removeLoaderService(loaderKeys.productAdd)
      console.error('Error adding document: ', e);
    }
  };

  const handleEditProduct = async (values) => {
    try {
      addLoaderService(loaderKeys.productAdd)
      await editProducts({
        ...values,
        name: values.pName,
        description: values.description,
        price: parseFloat(values.price)
      }, initialValues.id)
      removeLoaderService(loaderKeys.productAdd)
      formReset()
    } catch (e) {
      removeLoaderService(loaderKeys.productAdd)
      console.error('Error adding document: ', e);
    }
  };

  const formReset = () => {
    fetchProducts()
    form.resetFields();
  }

  return (
    <Form layout="vertical" form={form} initialValues={initialValues} onFinish={isEdit ? handleEditProduct : handleAddProduct}>
      <Row justify="left" gutter={[16, 16]}>
        <Col xs={12} sm={12} md={8} lg={8} xl={6}>
          <Form.Item label="Category" rules={[
            {
              required: true,
              message: 'Please select category!',
            },
          ]} name='category'>
            <Select
              options={categoryList}
            />
          </Form.Item>
        </Col>
        <Col xs={12} sm={12} md={8} lg={8} xl={6}>
          <Form.Item label="Product Name" rules={[
            {
              required: true,
              message: 'Please input Product Name!',
            },
          ]} name='pName' required>
            <Input />
          </Form.Item>
        </Col>
        <Col xs={12} sm={12} md={8} lg={8} xl={6}>
          <Form.Item name='description' label="Description">
            <Input />
          </Form.Item>
        </Col>
        <Col xs={12} sm={12} md={8} lg={8} xl={6}>
          <Form.Item name='measurement' rules={[
            {
              required: true,
              message: 'Please input measurement!',
            },
          ]} label="Measurement">
            <Input />
          </Form.Item>
        </Col>
        <Col xs={12} sm={12} md={8} lg={8} xl={6}>
          <Form.Item name='price' rules={[
            {
              required: true,
              message: 'Please input price!',
            },
          ]} label="Price" required>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col xs={12} sm={12} md={8} lg={8} xl={6}>
          <Form.Item name='warnningCount' rules={[
            {
              required: true,
              message: 'Please input Warnning Count!',
            },
          ]} label="Warnning Count" required>
            <InputNumber style={{ width: '100%' }} />
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

export default AddProductForm;

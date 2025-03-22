/* eslint-disable react-hooks/exhaustive-deps */

import { Button, Col, DatePicker, Form, Input, InputNumber, Row, Select } from 'antd';
import dayjs from 'dayjs';
import { addLoaderService, removeLoaderService } from '../../../utils/utils';
import { loaderKeys } from '../../../constants/appConstants';
import { editProducts } from '../../../utils/productHelper';
import { useEffect, useState } from 'react';
import { uniquTime } from '../../../utils/dateHelper';
import { addStockBuyService } from '../../../utils/stockHelper';
import { FORM_DATE } from '../../../constants/dateConstants';
import { addTransactionCash } from '../../../utils/transactionHelper';
import { cashBookIn, newCheckIssue } from '../../../constants/formConstants';
import { transaction, type } from '../../../constants/transactionConstants';
import { addChequeService } from '../../../utils/chequeHepler';


const paymentTypes = [
  {
    value: 'cash',
    label: 'Cash',
  },
  {
    value: 'bank',
    label: 'Bank',
  },
];

const StockRegisterForm = (
  {
    fetchStock,
    isEdit = false,
    initialValues
  }
) => {

  const [isCheck, setCheck] = useState(false)

  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(initialValues)
  }, [initialValues])

  const handleAddProduct = async (values) => {
    try {
      const now = uniquTime()
      const billIdentyfier = `${values.merchent}_${now}`
      addLoaderService(loaderKeys.addStockBuy)
      await addStockBuyService({
        ...values,
        date: dayjs(values.date).toDate(),
        checkDate: isCheck ? dayjs(values.checkDate).toDate() : '',
        billIdentyfier: billIdentyfier
      })
      if (values.paymentType === 'cash') {
        await addTransactionCash(cashBookIn(transaction.stockBuy, values.totalBill, type.out, billIdentyfier))
      }
      if (values.paymentType === 'bank') {
        await addChequeService(newCheckIssue(transaction.stockBuy, values.totalBill, type.out, dayjs(values.checkDate).toDate(), billIdentyfier))
      }
      fetchStock()
      removeLoaderService(loaderKeys.addStockBuy)
      formReset()
    } catch (e) {
      removeLoaderService(loaderKeys.addStockBuy)
      console.error('Error adding document: ', e);
    }
  };



  const handleEditProduct = async (values) => {
    try {
      addLoaderService(loaderKeys.productAdd)
      await editProducts(values)
      removeLoaderService(loaderKeys.productAdd)
      formReset()
    } catch (e) {
      removeLoaderService(loaderKeys.productAdd)
      console.error('Error adding document: ', e);
    }
  };

  const handleFormChange = (values) => {
    if (values.paymentType === 'bank') {
      setCheck(true)
    } else {
      setCheck(false)
    }

    // form.setFieldValue('itemCost', getRoundValue(parseFloat(values.totalCost / values.qnt)))
  }

  const formReset = () => {
    fetchStock()
    form.resetFields();
  }


  return (
    <Form onValuesChange={(e, allValues) => handleFormChange(allValues)} layout="vertical" form={form} initialValues={initialValues} onFinish={isEdit ? handleEditProduct : handleAddProduct}>
      <Row justify="left" gutter={[16, 16]}>
        <Col xs={12} sm={12} md={8} lg={8} xl={6}>
          <Form.Item name='merchent' rules={[
            {
              required: true,
              message: 'Please enter merchent!',
            },
          ]} label="merchen" required>
            <Input style={{ width: '100%' }} />
          </Form.Item>
        </Col>

        <Col xs={12} sm={12} md={8} lg={8} xl={6}>
          <Form.Item label="payment Type" rules={[
            {
              required: true,
              message: 'Please select paymentType!',
            },
          ]} name='paymentType'>
            <Select
              options={paymentTypes}
            />
          </Form.Item>
        </Col>

        {

          isCheck && <Col xs={12} sm={12} md={8} lg={8} xl={6}>
            <Form.Item hidden={!isCheck} name='checkDate' rules={[
              {
                required: true,
                message: 'Please enter Check date!',
              },
            ]} label="Check Date" required>
              <DatePicker format={FORM_DATE} style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
        }


        <Col xs={12} sm={12} md={8} lg={8} xl={6}>
          <Form.Item name='totalBill' rules={[
            {
              required: true,
              message: 'Please enter totalBill!',
            },
          ]} label="Total Bill" required>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col xs={12} sm={12} md={8} lg={8} xl={6}>
          <Form.Item name='date' rules={[
            {
              required: true,
              message: 'Please enter date!',
            },
          ]} label="date" required>
            <DatePicker style={{ width: '100%' }}
            />
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

export default StockRegisterForm;

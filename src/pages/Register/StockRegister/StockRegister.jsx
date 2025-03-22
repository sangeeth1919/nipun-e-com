/* eslint-disable no-unused-vars */
// src/pages/HomePage.js

import { useEffect, useState } from "react";
import { addLoaderService, removeLoaderService } from "../../../utils/utils";
import { loaderKeys } from "../../../constants/appConstants";
import PageContainer from "../../../components/Common/PageContainer/PageContainer";
import PageHeader from "../../../components/Common/PageHeader/PageHeader";
import DataContainer from "../../../components/Common/DataContainer/DataContainer";
import MyTable from "../../../components/Common/MyTable/MyTable";
import FormContainer from "../../../components/Common/FormContainer/FormContainer";
// import { stockBillRegisterForm } from "../../../constants/formConstants";
import StockRegisterForm from "../../../components/register/StockRegister/StockRegisterForm";
import { getStockService, removeStockService } from "../../../utils/stockHelper";
import { getFireStoreReadableDate } from "../../../utils/dateHelper";
import { removeTransaction } from "../../../utils/transactionHelper";
import { removeCheckService } from "../../../utils/chequeHepler";
import { DeleteOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";


function StockRegister() {
    const { fSUser } = useSelector((state) => state.auth);
    const isAdmin = fSUser?.isAdmin

    const columns = [
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (e) => { return isAdmin && <DeleteOutlined style={{ color: '#fc0303' }} onClick={() => deleteBill(e)} /> },
        },
        {
            title: 'Date',
            dataIndex: 'date'
        },
        {
            title: 'Merchent',
            dataIndex: 'merchent',
        },
        {
            title: 'Payment Type',
            dataIndex: 'paymentType',
        },
        {
            title: 'Total',
            dataIndex: 'totalBill',
        }
    ];

    const [selectedItem, setSelectedItem] = useState({})
    const [dataSource, setDataSource] = useState([])
    const [isEdit, setEdit] = useState(false)

    useEffect(() => {
        fetchStockRegister();
    }, [])


    const deleteBill = async (e) => {
        addLoaderService(loaderKeys.addStockBuy)
        const billIdentifier = e.billIdentyfier;
        const paymentType = e.paymentType;
        if (paymentType === 'cash') {
            await removeTransaction(billIdentifier)
        }
        if (paymentType === 'bank') {
            await removeCheckService(billIdentifier)
        }
        await removeStockService(e.id)
        removeLoaderService(loaderKeys.addStockBuy)
        fetchStockRegister();
    }

    const fetchStockRegister = async () => {
        addLoaderService(loaderKeys.getCategory)
        const res = await getStockService();
        if(res && res.length !== 0){
            const data = res.map((e) => {
                return {
                    ...e,
                    date: getFireStoreReadableDate(e.date)
                }
            })
            setDataSource(data)
        }
       
        setEdit(false)
        removeLoaderService(loaderKeys.getCategory)
    }

    return (
        <PageContainer>
            <PageHeader title='Stock' subTitle={`Register`} />
            <DataContainer>
                <FormContainer>
                    <StockRegisterForm initialValues={selectedItem} isEdit={isEdit} fetchStock={fetchStockRegister} />
                </FormContainer>
                <MyTable columns={columns} dataSource={dataSource} />
            </DataContainer>
        </PageContainer>
    );
}

export default StockRegister;

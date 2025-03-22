import dayjs from "dayjs"
import { chequeStatus } from "./transactionConstants"
import store from "../redux/store"

export const stockBillRegisterForm = {
    merchent: '',
    paymentType: '',
    totalBill: 0,
    date: '',
    checkDate: '',
    billIdentyfier: ''
}


export const stockItemRegisterForm = {
    "qnt": 0,
    "qntLeft": 0,
    "totalCost": 0,
    "itemCost": 0,
    "date": "",
    billIdentyfier: ''
}

export const cashBookIn = (transaction, ammount, type, uuid) => {
    return {
        dateAndTime: new dayjs().toDate(),
        transaction: transaction,
        ammount: ammount,
        type: type,
        uuid: uuid
    }
}

export const billInsertObj = (billNumber, ammount, type = 'cash', discount = '0') => {
    return {
        bill_number: billNumber,
        dateAndTime: new dayjs().toDate(),
        ammount: ammount,
        type: type,
        discount: discount
    }
}

export const stockIssueForm = (billNumber, issuanceCount, pName, price) => {
    const state = store.getState();
    return {
        bill_number: billNumber,
        dateAndTime: new dayjs().toDate(),
        issuance_count: issuanceCount,
        lastUpdateBy: state?.auth?.fSUser?.email,
        pName: pName,
        selling_price: price
    }
}

export const newCheckIssue = (transaction, ammount, type, chequDateTime, uuid) => {
    return {
        dateAndTime: new dayjs().toDate(),
        chequDateTime: chequDateTime,
        transaction: transaction,
        ammount: ammount,
        type: type,
        status: chequeStatus.pending,
        uuid: uuid
    }
}


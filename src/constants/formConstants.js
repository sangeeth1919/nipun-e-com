import dayjs from "dayjs"
import { chequeStatus } from "./transactionConstants"

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


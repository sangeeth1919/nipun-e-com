
import { addDocument, deleteDocument, editDocument, getCollection, getDocsByQuery } from "./firestore";
import { billsCollectionName, loaderKeys, productsCollectionName } from "../constants/appConstants";
import { collection, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { addLoaderService, removeLoaderService } from "./utils";
import store from "../redux/store";
import { v4 as uuidv4 } from 'uuid';
import { uniquTime } from "./dateHelper";
import { billInsertObj, cashBookIn, stockIssueForm } from "../constants/formConstants";
import { transaction, type } from "../constants/transactionConstants";
import { addTransactionCash } from "./transactionHelper";
import { stockIssuedService } from "./stockHelper";


export const handleNewSellsService = async () => {
    addLoaderService(loaderKeys.addNewBill)
    try {

        const state = store.getState();
        const cartActiveList = state?.cart?.cart?.filter((item) => item.qnt !== 0)
        const billNumber = getBillId();
        const cartTotal = getCartTotal(cartActiveList)

        const cashBookObj = genarateCashBookObjBill(cartTotal, billNumber);
        console.log('cashBookObj', cashBookObj);

        const stockIssueArray = getStockIssueObj(cartActiveList, billNumber);
        console.log('stockIssueArray', stockIssueArray);

        const billObj = billInsertObj(billNumber, cartTotal);
        await insertNewBill(billObj);
        await addTransactionCash(cashBookObj)
        await Promise.all(stockIssueArray.map(element => stockIssuedService(element)));
    } catch (error) {
        console.error('Error handleNewSellsService', error);
    } finally {
        removeLoaderService(loaderKeys.addNewBill)
    }
}

export const insertNewBill = async (data) => {
    try {
        await addDocument(billsCollectionName, data); // Use deleteDoc to delete the document
    } catch (error) {
        console.error('insertNewBill', error);
    } finally {
    }
}


export const getStockIssueObj = (cartActiveList, billNumber) => {
    let arr = []
    cartActiveList.forEach(element => {
        arr.push(stockIssueForm(billNumber, element.qnt, element.pName, element.price))
    });
    return arr;
}

export const genarateCashBookObjBill = (value, billNumber) => {
    return cashBookIn(transaction.itemSell, value, type.in, billNumber)
}

const getBillId = () => {
    // Generate a UUID and extract the digits
    const uuid = uuidv4().replace(/-/g, ''); // Remove dashes
    const digits = uuid.replace(/[^\d]/g, '').slice(0, 10); // Keep only digits and slice first 10 digits
    return `${digits}_${uniquTime()}`;
};

export const getCartTotal = (cartItems, discount = '0') => {
    return (cartItems.reduce((total, item) => total + item.price * item.qnt, 0).toFixed(2) - discount);
}

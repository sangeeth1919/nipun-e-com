
import { addDocument, deleteDocument,  getDocsByQuery } from "./firestore";
import { cashBookCollectionName } from "../constants/appConstants";
import { collection, query, where } from "firebase/firestore";
import { db } from "../firebase";


export const addTransactionCash = async (data) => {
    try {
        await addDocument(cashBookCollectionName, data); // Use deleteDoc to delete the document
    } catch (error) {
        console.error('Error adding stock:', error);
    } finally {
    }
}



export const removeTransaction = async (identifier) => {
    try {
        const colRef = collection(db, cashBookCollectionName);
        const q = query(colRef, where("uuid", "==", identifier));
        const doc = await getDocsByQuery(q)
        await deleteDocument(cashBookCollectionName, doc[0].id)
    } catch (error) {
        console.error('Error adding stock:', error);
    } finally {
    }
}
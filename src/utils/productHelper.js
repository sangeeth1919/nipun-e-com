
import { addDocument, deleteDocument, editDocument, getCollection, getDocsByQuery } from "./firestore";
import { productsCollectionName } from "../constants/appConstants";
import { collection, query, where } from "firebase/firestore";
import { db } from "../firebase";

export const getNewProduct = async () => {
    try {
        const products = await getCollection(productsCollectionName);
        console.log("products", products)
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
    } finally {
    }
}

export const getProductDataByName = async (name) => {
    try {
        const colRef = collection(db, productsCollectionName);
        const q = query(colRef, where("pName", "==", name));
        const doc = await getDocsByQuery(q)
        return doc[0];
    } catch (error) {
        console.error('Error fetching products:', error);
    } finally {
    }
}


export const editProducts = async (obj,docId) => {
    try {
        const products = await editDocument(productsCollectionName, obj, docId);
        console.log("products", products)
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
    } finally {
    }
}


export const deleteItemService = async (docId) => {
    try {
        await deleteDocument(productsCollectionName, docId); // Use deleteDoc to delete the document
    } catch (error) {
        console.error('Error fetching products:', error);
    } finally {
    }
}


export const addProductService = async (data) => {
    try {
        await addDocument(productsCollectionName, data); // Use deleteDoc to delete the document
    } catch (error) {
        console.error('Error adding products:', error);
    } finally {
    }
}
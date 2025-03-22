
import { addDocument, deleteDocument, getDocsByQuery } from "./firestore";
import { cheqeCollectionName } from "../constants/appConstants";
import { collection, query, where } from "firebase/firestore";
import { db } from "../firebase";

// export const getNewProduct = async () => {
//     try {
//         const products = await getCollection(productsCollectionName);
//         console.log("products", products)
//         return products;
//     } catch (error) {
//         console.error('Error fetching products:', error);
//     } finally {
//     }
// }


// export const editProducts = async (obj,docId) => {
//     try {
//         const products = await editDocument(productsCollectionName, obj, docId);
//         console.log("products", products)
//         return products;
//     } catch (error) {
//         console.error('Error fetching products:', error);
//     } finally {
//     }
// }


// export const deleteItemService = async (docId) => {
//     try {
//         await deleteDocument(productsCollectionName, docId); // Use deleteDoc to delete the document
//     } catch (error) {
//         console.error('Error fetching products:', error);
//     } finally {
//     }
// }



export const removeCheckService = async (identifier) => {
    try {
        const colRef = collection(db, cheqeCollectionName);
        const q = query(colRef, where("uuid", "==", identifier));
        const doc = await getDocsByQuery(q)
        await deleteDocument(cheqeCollectionName, doc[0].id)
    } catch (error) {
        console.error('Error adding stock:', error);
    } finally {
    }
}

export const addChequeService = async (data) => {
    try {
        await addDocument(cheqeCollectionName, data); // Use deleteDoc to delete the document
    } catch (error) {
        console.error('Error adding stock:', error);
    } finally {
    }
}
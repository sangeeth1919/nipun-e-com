
import { addDocument, deleteDocument, editDocument, getCollection, getDocsByQuery } from "./firestore";
import { stockBuyCollection, stockItemCollection } from "../constants/appConstants";
import { collection, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase";

export const getStockService = async () => {
    try {
        const stock = await getCollection(stockBuyCollection, 'date', 'desc');
        return stock;
    } catch (error) {
        console.error('Error getStockService:', error);
    } finally {
    }
}


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


export const removeStockService = async (docId) => {
    try {
        await deleteDocument(stockBuyCollection, docId); // Use deleteDoc to delete the document
    } catch (error) {
        console.error('Error fetching products:', error);
    } finally {
    }
}


export const addStockBuyService = async (data) => {
    try {
        console.log('data', data)
        await addDocument(stockBuyCollection, data); // Use deleteDoc to delete the document
    } catch (error) {
        console.error('Error adding stock:', error);
    } finally {
    }
}



export const addStockItemService = async (data) => {
    try {
        console.log('data', data)
        await addDocument(stockItemCollection, data); // Use deleteDoc to delete the document
    } catch (error) {
        console.error('Error addStockItemService:', error);
    } finally {
    }
}

export const getStocksByProducName = async (indicator, value) => {
    try {
        console.log('value', value)
        console.log('indicator', indicator)
        const colRef = collection(db, stockItemCollection);
        const q = query(
            colRef,
            where(indicator, "==", value)
        );
        const docs = await getDocsByQuery(q)
        docs.sort((a, b) => {
            const aTimestamp = a.dateAndTime.seconds + a.dateAndTime.nanoseconds / 1e9;
            const bTimestamp = b.dateAndTime.seconds + b.dateAndTime.nanoseconds / 1e9;
            return aTimestamp - bTimestamp;
        });
        return docs;
    } catch (error) {
        console.error('Error getStocksByProducName:', error);
    } finally {
    }
}

import { addDocument, deleteDocument, getCollection, getDocsByQuery } from "./firestore";
import { loaderKeys, stockBuyCollection, stockIssuanceCollectionName, stockItemCollection } from "../constants/appConstants";
import { collection, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { addLoaderService, removeLoaderService } from "./utils";

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
        await addDocument(stockBuyCollection, data); // Use deleteDoc to delete the document
    } catch (error) {
        console.error('Error adding stock:', error);
    } finally {
    }
}



export const addStockItemService = async (data) => {
    try {
        await addDocument(stockItemCollection, data); // Use deleteDoc to delete the document
    } catch (error) {
        console.error('Error addStockItemService:', error);
    } finally {
    }
}

export const getStocksByProducName = async (indicator, value) => {
    addLoaderService(loaderKeys.addStockBuy)
    try {
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
        removeLoaderService(loaderKeys.addStockBuy)
    }
}

export const getStocksIssuenceData = async (indicator, value) => {
    addLoaderService(loaderKeys.stockIssuenceLoad)
    try {
        const colRef = collection(db, stockIssuanceCollectionName);
        const q = query(
            colRef,
            where(indicator, "==", value)
        );
        const docs = await getDocsByQuery(q)
        return docs;
    } catch (error) {
        console.error('Error getStocksByProducName:', error);
    } finally {
        removeLoaderService(loaderKeys.stockIssuenceLoad)
    }
}

export const getStocksSummaryService = async (value) => {
    try {
        const stockData = await getStocksByProducName('pName', value);
        const issuenceData = await getStocksIssuenceData('pName', value);
        let totalStock = 0;
        let issuedStocks = 0;
        stockData.forEach((stock) => {
            totalStock = totalStock + stock.qnt
        })
        issuenceData.forEach((stock) => {
            issuedStocks = issuedStocks + stock.issuance_count
        })
        return {
            stockData,
            issuenceData,
            totalStock,
            issuedStocks,
            availableStock: totalStock - issuedStocks
        };
    } catch (error) {
        console.error('Error stockIssuenceLoad:', error);
    } finally {
    }
}



export const stockIssuedService = async (data) => {
    try {
        await addDocument(stockIssuanceCollectionName, data); // Use deleteDoc to delete the document
    } catch (error) {
        console.error('stockIssuedService', error);
    } finally {
    }
}
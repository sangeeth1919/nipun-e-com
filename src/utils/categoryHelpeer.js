
import { addDocument, deleteDocument, getCollection } from "./firestore";
import { categoryCollectionName } from "../constants/appConstants";


export const addCategoryService = async (data) => {
    try {
        await addDocument(categoryCollectionName, data); // Use deleteDoc to delete the document
    } catch (error) {
        console.error('Error adding products:', error);
    } finally {
    }
}

export const getCategoryService = async () => {
    try {
        const categories = await getCollection(categoryCollectionName);
        return categories;
    } catch (error) {
        console.error('Error fetching products:', error);
    } finally {
    }
}

export const deleteCategoryService = async (docId) => {
    try {
        const categories = await deleteDocument(categoryCollectionName, docId);
        return categories;
    } catch (error) {
        console.error('Error fetching products:', error);
    } finally {
    }
}
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import store from "../redux/store";

export const getCollection = async (collectionName, orderByVal = '', orderByDirection = 'asc') => {
    try {

        // Assuming db is your Firestore instance and collectionName is the name of the collection
        const queryRef = query(
            collection(db, collectionName),
            orderByVal && orderBy(orderByVal, orderByDirection)
        );

        const querySnapshot = await getDocs(queryRef);
        const res = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        return res;
    } catch (error) {
        console.error('Error fetching products:', error);
    } finally {
    }
}

export const getDocsByQuery = async (query) => {
    try {
        const querySnapshot = await getDocs(query);
        const res = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        return res;
    } catch (error) {
        console.error('Error fetching products:', error);
    } finally {
    }
}

export const addDocument = async (collectionName, obj) => {
    try {
        const state = store.getState(); // Access the entire Redux state
        const docRef = await addDoc(collection(db, collectionName), { ...obj, lastUpdateBy: state.auth.fSUser.email });
        return docRef;
    } catch (error) {
        console.error('Error fetching products:', error);
    } finally {
    }
}

export const editDocument = async (collection, obj, docId) => {
    try {
        const state = store.getState(); // Access the entire Redux state
        const docRef = doc(db, collection, docId);
        // If no user data exists, create a new document
        const res = await setDoc(docRef, { ...obj, lastUpdateBy: state.auth.fSUser.email }, { merge: true });

        return res;
    } catch (error) {
        console.error('Error edit collection:', error);
    } finally {
    }
}


export const deleteDocument = async (collection, docId) => {
    try {
        const docRef = doc(db, collection, docId); // Create doc reference using modular API

        // Delete the document
        await deleteDoc(docRef); // Use deleteDoc to delete the document
    } catch (error) {
        console.error('Error fetching products:', error);
    } finally {
    }
}

export const addSSOUser = async (user) => {
    const userDocRef = doc(db, "users", user.uid);
    // If no user data exists, create a new document
    await setDoc(userDocRef, {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        lastLoginAt: new Date(),
    }, { merge: true });

    const userSnap = doc(db, "users", user.uid);
    const UserSnapData = await getDoc(userSnap);
    const res = UserSnapData.data();
    return res;
}

export const getFsUserData = async (user) => {
    const userSnap = doc(db, "users", user.uid);
    const UserSnapData = await getDoc(userSnap);
    const res = UserSnapData.data();
    return res;
}
import dayjs from "dayjs";
import { FORM_DATE, UNIQU_TIME } from "../constants/dateConstants";



export const getCurrentDateAndTime = () => {
    const value = new dayjs().format('YYYY-DD-MM_hh:mm:ss');;
    return value;
};


export const uniquTime = () => {
    const value = new dayjs().format(UNIQU_TIME);;
    return value;
};


export const getFireStoreReadableDate = (firestoreDate) => {
    const date = new Date(firestoreDate.seconds * 1000 + firestoreDate.nanoseconds / 1000000);
    const formattedDate = dayjs(date).format(FORM_DATE); // Example format
    return formattedDate;
};




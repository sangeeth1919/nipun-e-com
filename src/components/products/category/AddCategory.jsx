import React, { useState } from 'react';
import { Button, Input, Modal } from 'antd';
import { categoryCollectionName, loaderKeys } from '../../../constants/appConstants';
import { addCategoryService } from '../../../utils/categoryHelpeer';
import { addLoaderService, removeLoaderService } from '../../../utils/utils';
import { v4 as uuidv4 } from 'uuid';
const AddCategory = ({ open, setOpen, getCategory }) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [categoryName, setCategoryName] = useState("");
   
    const handleOk = async () => {
        setConfirmLoading(true);
        addLoaderService(loaderKeys.addCategory)
        const payload = {
            categoryName,
            uuid:uuidv4()
        }
        await addCategoryService(payload)
        getCategory()
        setOpen(false);

        removeLoaderService(loaderKeys.addCategory)
        setConfirmLoading(false);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    return (
        <>
            <Modal
                title="Title"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <Input value={categoryName} onChange={(e)=>{
                    setCategoryName(e.target.value)
                    }}/>
            </Modal>
        </>
    );
};
export default AddCategory;
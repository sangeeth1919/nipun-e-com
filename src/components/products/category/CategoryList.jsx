/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';
import { Layout, Menu, Collapse } from 'antd';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import styles from './CategoryList.styes';
import AddCategory from './AddCategory';
import { deleteCategoryService, getCategoryService } from '../../../utils/categoryHelpeer';
import { useDispatch, useSelector } from 'react-redux';
import { setCategories, setSelectedCategory } from '../../../redux/categorySlice';
import { loaderKeys } from '../../../constants/appConstants';
import { addLoaderService, removeLoaderService } from '../../../utils/utils';

const { Sider } = Layout;
const { Panel } = Collapse;

const CategoryList = ({ isMobile }) => {
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    return (
        <>{
            isMobile ? (
                <>
                    <div style={styles.mobileCatPannel} onClick={toggleCollapse}>
                        <Collapse activeKey={collapsed ? [] : ['1']} accordion>
                            <Panel header={`Categories`} key="1">
                                <MenuCategory />
                            </Panel>
                        </Collapse>
                    </div>


                </>
            ) : (
                <Sider width={240} theme="light" style={{ padding: 20, boxSizing: 'border-box' }}>
                    <MenuCategory />
                </Sider>
            )
        }</>

    );
}

const MenuCategory = () => {
    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.category);
    const [open, setOpen] = useState(false)

    const deleteCategory = async (element) => {
        addLoaderService(loaderKeys.addCategory);
        await deleteCategoryService(element.id);
        removeLoaderService(loaderKeys.addCategory)
        getCategory();
        // dispatch(setCategories(res))
    }

    const items = useMemo(() => {
        const tempItem = []
        tempItem.push({
            key: 'All',
            label: 'All',
        })
        categories.forEach(element => {
            tempItem.push({
                key: element.uuid,
                icon: <DeleteOutlined style={{ color: '#fc0303' }} onClick={() => deleteCategory(element)} />,
                label: element.categoryName,
            })
        });
        tempItem.push({
            key: 'add_key',
            icon: <PlusCircleOutlined />,
            label: 'Add',
        })
        return tempItem
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categories])

    useEffect(() => {
        getCategory()
    }, [])

    const getCategory = async () => {
        addLoaderService(loaderKeys.getCategory);
        const res = await getCategoryService();
        removeLoaderService(loaderKeys.getCategory)
        dispatch(setCategories(res))
    }

    const categoryOnClick = (e) => {
        if (e.key === 'add_key') {
            setOpen(true)
        } else {
            const selectedCat = categories.find((category) => category.uuid === e.key)
            dispatch(setSelectedCategory(selectedCat ? selectedCat.categoryName : ''))
        }
    }

    return (
        <>
            <AddCategory open={open} setOpen={(e) => setOpen(e)} getCategory={getCategory} />
            <Menu mode="inline" onClick={categoryOnClick} items={items} defaultSelectedKeys={['1']} />
        </>
    )

}

export default CategoryList;

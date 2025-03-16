import React from 'react';
import { Spin } from 'antd';
import './FullPageLoader.css';  // Add custom CSS to center the loader

const Loader = () => {
    return (
        <div className="full-page-loader-overlay">
            <Spin size="large" />
        </div>
    );
};

export default Loader;

import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase';

const PageNotAccess = () => {
    const navigate = useNavigate();
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate('/login');  // Redirect to homepage after logout
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <Result
                status="403"
                title="403"
                subTitle="You don't have access"
                extra={<Button type="primary" onClick={handleSignOut}>Sign Out</Button>}
            />
        </div>
    );
};

export default PageNotAccess;

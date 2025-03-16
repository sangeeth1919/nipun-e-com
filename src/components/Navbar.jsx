import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { auth, signOut } from '../firebase';
import { useNavigate } from 'react-router-dom';
import '../styles.css';
import { useSelector } from 'react-redux';

function Navbar() {
    const navigate = useNavigate();
    const { fSUser } = useSelector((state) => state.auth);
    const isAdmin = fSUser?.isAdmin;
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate('/login');  // Redirect to homepage after logout
        } catch (error) {
            console.error(error);
        }
    };

    const menuItems = [
        {
            key: '1',
            label: <Link to="/">Home</Link>,
        },
        {
            key: '2',
            label: <Link to="/shop">Billing</Link>,
        },
        {
            key: '3',
            label: <Link to="/category/2">Clothing</Link>,
        },
        isAdmin && {
            key: '4',
            label: <Link to="product/add">Add Products</Link>,
        },
        {
            key: '6',
            label: 'Register',
            type: 'group',
            children: [
                { key: '7', label: <Link to="/stock-buy-register">Stock Register</Link> },
                { key: '8', label: <Link to="product/add">Add Products</Link> },
            ],
        },
        {
            key: '9',
            label: <button onClick={handleSignOut}>sign out</button>,
            style: { marginLeft: 'auto', border: 'none', background: 'transparent' }, // Align to the right
        },
    ];

    return (
        <Menu theme="light" color='black' mode="horizontal" style={{ display: 'flex', justifyContent: 'flex-start' }}>
            {menuItems.map(item =>
                item.children ? (
                    <Menu.SubMenu key={item.key} title={item.label}>
                        {item.children.map(subItem => (
                            <Menu.Item key={subItem.key}>{subItem.label}</Menu.Item>
                        ))}
                    </Menu.SubMenu>
                ) : (
                    <Menu.Item key={item.key} style={item.style || {}}>
                        {item.label}
                    </Menu.Item>
                )
            )}
        </Menu>
    );
}

export default Navbar;

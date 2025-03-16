import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminGuard = ({ children }) => {

    const { fSUser } = useSelector((state) => state.auth);
    const isAdmin = fSUser?.isAdmin
    if (!isAdmin) {
        // Redirect to the home page or login page if the user is not an admin
        return <Navigate to="/" />;
    }

    return children; // Allow access if the user is an admin
};

export default AdminGuard;
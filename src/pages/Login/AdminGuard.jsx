import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { protactedRoute } from '../../constants/appConstants';

const AdminGuard = ({ children }) => {
    const { fSUser } = useSelector((state) => state.auth);
    const isAdmin = fSUser?.isAdmin

    if(!fSUser?.isActive) return <Navigate to="/no-access" />
    if (children?.type?.name) {
        if (protactedRoute.find((e) => e === children.type.name)) {
            if(isAdmin){
                return children;
            }else{
                return <Navigate to="/" />;
            }
        } else {
            return children;
        }
    } else {
        return <Navigate to="/" />;
    }
};

export default AdminGuard;
// ProtectedRoute.jsx
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from './authContext';

const ProtectedRoute = ({ children }) => {
  const {auth} =  useContext(AuthContext);
//   const token = auth.token // or use context
console.log('protect',auth?.data.status)
  
  return auth.data.status? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
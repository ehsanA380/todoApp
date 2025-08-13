// ProtectedRoute.jsx
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from './authContext';

const ProtectedRoute = ({ children }) => {
  const {loading,login} =  useContext(AuthContext);
  // const login = sessionStorage.getItem('login');
  console.log(login)
  // const token = auth.token // or use context
// console.log('protect',auth?.data.status)
// console.log(localStorage.getItem('login'))
 if (loading) return null;
  return (login? children : <Navigate to="/login" />);
};

export default ProtectedRoute;
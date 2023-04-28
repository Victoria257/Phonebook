import { useDispatch } from 'react-redux';
import { LogOut } from 'redux/auth/authOperations';

export const Logout = () => {
  const dispatch = useDispatch();
  console.log('logout');
  dispatch(LogOut());
  return <div>LogOut</div>;
};

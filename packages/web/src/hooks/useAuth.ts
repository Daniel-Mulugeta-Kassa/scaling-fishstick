import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@store/index';
import { loginUser, logoutUser } from '@store/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  const login = async (username: string, password: string) => {
    return dispatch(loginUser({ username, password }));
  };

  const logout = async () => {
    return dispatch(logoutUser());
  };

  return {
    ...auth,
    login,
    logout,
  };
};

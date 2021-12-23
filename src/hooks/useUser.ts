import { RootState } from '@/models';
import { useSelector } from 'react-redux';

const useUser = () => {
  const user = useSelector((state: RootState) => state.user);
  return (user);
};

export default useUser;

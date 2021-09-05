import { useContext } from 'react';
import Login from './components/Login';
import AuthContextProvider, { AuthContext } from './context/auth-context';
import Loader from './UI/Loader';
import Skeleton from './UI/Skeleton';

const App = () => {
  const ctx = useContext(AuthContext);
  const isLoading = false;
  return (
    <div style={{ height: '100%' }}>
      {isLoading && <Loader />}
      {!ctx.isAuthorized && <Login />}
      {ctx.isAuthorized && <Skeleton />}
    </div>
  );
};

export default App;

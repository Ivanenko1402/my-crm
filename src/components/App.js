import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Header } from './Header';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import { MainContent } from './MainContent';
import { Footer } from './Footer';
import { MyRoutes } from '../MyRoutes';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth, setError } from '../store/slices/authSlice';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { auth, error } = useSelector(state => state.auth)
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoggedIn(!!auth);
  }, [auth]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(setError(''));
    }, 3000);
  }, [dispatch, error]);

  useEffect(() => {
    const auth1 = getAuth();

    onAuthStateChanged(auth1, (user) => {
      if (user) {
        dispatch(setAuth({
          displayName: user.displayName,
          email: user.email,
          phoneNumber: user.phoneNumber,
        }));
      }
    });
  }, [dispatch])

  return (
    <Router basename='/my-crm'>
      {isLoggedIn ? (
        <div className='d-flex flex-column vh-100 vw-100'>
          <Header />

          <MainContent>
            <MyRoutes isLoggedIn={isLoggedIn} />
          </MainContent>

          <Footer />
        </div>
      ) : (
        <div className='d-flex justify-content-center align-items-center vh-100 vw-100'>
          <MyRoutes isLoggedIn={isLoggedIn} />
        </div>
      )}
    </Router>
  );
}

export default App;

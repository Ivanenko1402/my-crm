import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from './Header';
import { BrowserRouter as Router  } from 'react-router-dom';
import { MainContent } from './MainContent';
import { Footer } from './Footer';
import { MyRoutes } from '../MyRoutes';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function App() {
  const auth = getAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, [auth])

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
          <MyRoutes />
        </div>
      )}
    </Router>
  );
}

export default App;

import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from './Header';
import { MainContent } from './MainContent';
import { Footer } from './Footer';
import { MyRoutes } from '../MyRoutes';
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <>
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
    </>
  );
}

export default App;

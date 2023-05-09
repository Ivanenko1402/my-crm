import './App.css';
import { Header } from './Header/Header';
import { MainContent } from './MainContent/MainContent';
import { MyRoutes } from './MainContent/MyRoutes';
import { Footer } from './Footer/Footer';

function App() {
  return (
    <div className='app'>
      <Header />

      <MainContent>
        <MyRoutes />
      </MainContent>

      <Footer />
    </div>
  );
}

export default App;

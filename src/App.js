import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from './components/Header';
import { MainContent } from './components/MainContent';
import { Footer } from './components/Footer';
import { MyRoutes } from './MyRoutes';

function App() {
  return (
    <div className='d-flex flex-column vh-100'>
      <Header />

      <MainContent>
        <MyRoutes />
      </MainContent>

      <Footer />
    </div>
  );
}

export default App;

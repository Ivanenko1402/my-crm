import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from './Header';
import { MainContent } from './MainContent';
import { Footer } from './Footer';
import { MyRoutes } from '../MyRoutes';

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

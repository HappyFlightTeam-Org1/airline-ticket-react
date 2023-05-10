import './App.css';
import Navbar from './components/Commons/Navbar';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Silde from './components/Commons/Silde';
import Body from './components/Commons/Body';
import Footer from './components/Commons/Footer';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Silde></Silde>
      <Body></Body>
      <Footer></Footer>
    </div>
  );
}

export default App;

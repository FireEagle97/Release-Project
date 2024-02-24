import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navigation from './navigation/Nav';
import Home from './home/Home';
import AppartmentList from './components/appsList/appsList';

function App() {
  return ( 
    <>
      <Navigation />
      <div className="App">
        <Routes>
          <Route path="/" element={
            <Home />
          } />
        </Routes>
        <AppartmentList/>
      </div>
      <footer>
          
      </footer>
    </>
  );
}

export default App;

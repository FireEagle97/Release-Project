import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navigation from './navigation/Nav';
import Home from './home/Home';
import LeasesList from './components/leasesList/leasesList';

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
        <LeasesList/>
      </div>
      <footer>
          <p>fooooter</p>
          <p>Elissar Fadel, Monica Dimitrova, Anastasia Bondarenko, Dany Makhoul</p>
          <p>ReLease 2024</p>
      </footer>
    </>
  );
}

export default App;







import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navigation from './navigation/Nav';
import Home from './home/Home';
import AppartmentList from './components/appsList/appsList';
const data = [
  {
    id: 1,
    image: 'https://example.com/image1.jpg',
    title: 'Card 1',
    description: 'Description for Card 1',
  },
  {
    id: 2,
    image: 'https://example.com/image2.jpg',
    title: 'Card 2',
    description: 'Description for Card 2',
  },
  // Add more card objects as needed
];
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
        <AppartmentList data={data}/>
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

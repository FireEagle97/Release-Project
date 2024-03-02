import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navigation from './navigation/Nav';
import Home from './home/Home';
import LeasesList from './components/leasesList/leasesList';
import ApartmentPage from './apartmentDisplay/Apartment';

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

  const navigate = useNavigate();

  // Function to navigate to the ApartmentPage with apartment data
  const navigateToApartmentPage = (apartment) => {
    navigate(`/apartment/${apartment._id}`, { state: { apartment } });
  };

  // Function to navigate to the Leases page
  const navigateToLeases = () => {
    navigate(`/apartments/`, {});
  };

  return ( 
    <>
      <Navigation />
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <Home navigateToApartments={navigateToLeases}/>
              <LeasesList navigateToApartmentPage={navigateToApartmentPage}/>
            </>
          } />
          <Route path="/apartment/:id" element={
            <ApartmentPage/>
          } />
          <Route path="/apartments" element={
            <LeasesList navigateToApartmentPage={navigateToApartmentPage}/>
          } />
        </Routes>
      </div>
      <footer>
          <p>Elissar Fadel, Monica Dimitrova, Anastasia Bondarenko, Dany Makhoul</p>
          <p>ReLease 2024</p>
      </footer>
    </>
  );
}

export default App;

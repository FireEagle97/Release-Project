import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navigation from './navigation/Nav';
import Home from './home/Home';
import LeasesList from './components/leasesList/leasesList';
import ApartmentPage from './apartmentDisplay/Apartment';
import PostListing from './forms/post_listing';
import Contact from './navigation/Contact';
import About from './navigation/About';
import Footer from './footer/FooterPlace';

function App() {

  const navigate = useNavigate();

  // Function to navigate to the ApartmentPage with apartment data
  const navigateToApartmentPage = (apartment) => {
    navigate(`/apartment/${apartment._id}`, { state: { apartment } });
  };

  // Function to navigate to the Leases page
  const navigateToLeases = () => {
    navigate(`/apartments`, {});
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

          <Route path="/post-listing" element={
            <PostListing />
          } />

          <Route path='/contact' element={
            <Contact />
          } />

          <Route path='/about' element={
            <About />
          } />

        </Routes>
      </div>
      <Footer/>
    </>
  );
}

export default App;

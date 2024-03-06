import './App.css';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import Navigation from './navigation/Nav';
import Home from './home/Home';
import LeasesList from './components/leasesList/leasesList';
import ApartmentPage from './apartmentDisplay/Apartment';
import PostListing from './forms/post_listing';
import Contact from './navigation/Contact';
import About from './navigation/About';

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}
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
      <footer>
        <div class="left">
          <p>Elissar Fadel, Monica Dimitrova, Anastasia Bondarenko, Dany Makhoul</p>
          <p>Policy: We are not responsible for any leases posted by users. If you find a post inappropriate, feel free to report it to us.</p>
        </div>
        <div className="right">
          <ul className="footer-links">
            <li>
              <Link to="/" onClick={scrollToTop}>Home</Link>
            </li>
            <li>
              <Link to="/about" onClick={scrollToTop}>About</Link>
            </li>
            <li>
              <Link to="/contact" onClick={scrollToTop}>Contact</Link>
            </li>
            <li>
              <Link to="/post-listing" onClick={scrollToTop}>Post Listing</Link>
            </li>
            <li>
              <Link to="/apartments" onClick={scrollToTop}>View Apartments</Link>
            </li>
          </ul>
        </div>

      </footer>

      </>
  );
}

export default App;

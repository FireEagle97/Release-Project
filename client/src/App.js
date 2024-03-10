import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navigation from "./navigation/Nav";
import Home from "./home/Home";
import LeasesList from "./components/leasesList/leasesList";
import ApartmentPage from "./apartmentDisplay/Apartment";
import PostListing from "./forms/post_listing";
import Contact from "./navigation/Contact";
import About from "./navigation/About";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min";

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
          <Route
            path="/"
            element={
              <>
                <Home navigateToApartments={navigateToLeases} />
              </>
            }
          />

          <Route path="/apartment/:id" element={<ApartmentPage />} />

          <Route
            path="/apartments"
            element={
              <LeasesList navigateToApartmentPage={navigateToApartmentPage} />
            }
          />

          <Route path="/post-listing" element={<PostListing />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/about" element={<About />} />
        </Routes>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
          crossorigin="anonymous"
        ></script>
      </div>
      <footer>
        <p>
          Elissar Fadel, Monica Dimitrova, Anastasia Bondarenko, Dany Makhoul
        </p>
        <p>ReLease 2024</p>
      </footer>
    </>
  );
}

export default App;

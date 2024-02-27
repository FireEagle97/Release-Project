import './App.css';
import { Routes, Route, Router } from 'react-router-dom';
import Navigation from './navigation/Nav';
import Home from './home/Home';
import LeasesList from './components/leasesList/leasesList';
import PostListing from './forms/post_listing';
import { Switch } from '@mui/material';

function App() {
  return ( 
    <>
      <Navigation />
      <div className="App">

        {/* <Routes>
          <Route path="/post-listing" element={<PostListing />} />
          <Route path="/" element={<Home />} />
        </Routes> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post-listing" element={<PostListing />} />
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







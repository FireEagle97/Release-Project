import ApartmentImages from './images.js';
import ContactSection from './ContactSection.js';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Apartment.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
/**
 * ApartmentPage component for displaying information on a single apartment.
 *
 * @component
 * @returns {JSX.Element} Rendered ApartmentPage component.
 */
export default function ApartmentPage() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); //state to control the modal


    useEffect(() => {
        // Check if the user is logged in based on stored credentials
        const storedUsername = localStorage.getItem('username');
        const storedName = localStorage.getItem('name');
        if (storedUsername && storedName) {
            setUsername(storedUsername);
            setName(storedName);
            setIsLoggedIn(true);
        }
    }, []);

    const location = useLocation();
    const apartment = location.state?.apartment;

    let navigate = useNavigate();

    const handleInterestedClick = () => {
        if (isLoggedIn) {
            // Display tenant's contact information
            // You can implement this part based on your application logic
            console.log("Display tenant's contact information");
            setIsModalOpen(true);
        } else {
            // Redirect to signup/login page (profil)
            console.log("hihi");
            navigate('/profil', { replace: true });
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    }

    return (
        <div>
            {/* <ApartmentImages imagesLinks={apartment.images}/> */}
            <div id="apartment-information">
                <ApartmentImages imagesLinks={apartment.images}/>
                <div className='apt-info'>
                    <h3>
                        {apartment.furnishing} apartment located in {apartment.address}, {apartment.city}
                    </h3>
                    <h4>
                        <br></br>
                        <strong>Rent price:</strong> ${apartment.rentPrice}
                        <br></br>
                        <strong>Floor:</strong> {apartment.floor}
                        <br></br>
                        <strong>Size:</strong> {apartment.size} sq.ft.
                        <br></br>
                        <strong>Bedrooms:</strong> {apartment.bhk}
                        <br></br>
                        <strong>Bathrooms:</strong> {apartment.bathroom}
                        <br></br>
                        <strong>Furnishing:</strong> {apartment.furnishing}
                        <br></br>
                        <strong>Listing post date:</strong> {apartment.postedDate}
                    </h4>
                    <br></br>
                    <h6>
                        For more information, click the button below to contact the lister.
                    </h6>
                    <button onClick={handleInterestedClick}>Interested</button>                
                </div>

            
                {/* <ContactSection/> */}
            </div>
            {/* Modal to display tenant's contact information */}
            <Modal
                open={isModalOpen}
                onClose={closeModal}
                contentLabel="Contact Information Modal"
            >
                <Box sx={style}>
                <Typography variant="h6" component="h2">
                    Contact Information
                </Typography>
                <Typography sx={{ mt: 2 }}>
                    {/* NAME & EMAIL ARE NOT CORRECT!!! */}
                    Tenant's name: {name}
                </Typography>
                <Typography sx={{ mt: 2 }}>
                    Email: {username}
                </Typography>
                </Box>
            </Modal>
        </div>
    )
}
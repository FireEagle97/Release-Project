import ApartmentImages from './images.js';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Apartment.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';

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
        //check if the user is logged in based on stored credentials
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
            setIsModalOpen(true);
        } else {
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
                <Box className='box'>
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
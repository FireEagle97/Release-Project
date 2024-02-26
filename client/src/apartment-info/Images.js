import './Appartment.css';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    height: '400px'
}

/**
 * ApartmentImages component for displaying apartment images.
 *
 * @component
 * @returns {JSX.Element} Rendered Home component.
 */
export default function ApartmentImages(imagesLinks) {

    return (
        <div id="apartment-images-slider">
            <Slide>
                {imagesLinks.map((slideImage, index)=> (
                <div key={index}>
                    <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage})` }}>
                    </div>
                </div>
            ))} 
            </Slide>
        </div>
    )
}

// https://www.npmjs.com/package/react-slideshow-image
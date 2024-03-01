import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    height: '500px'
}


/**
 * ApartmentImages component for displaying apartment images.
 *
 * @component
 * @returns {JSX.Element} Rendered ApartmentImages component.
 */
function ApartmentImages({imagesLinks}) {
    return (
        <div id="apartment-images-slider" style={{ width: '50%', margin: '0'}}>
            <Slide>
                {imagesLinks.map((slideImage, index)=> (
                <div key={index} style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'grey'}}>
                    <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage})`, width: '80%', margin: '0' }}>
                    </div>
                </div>
                ))} 
            </Slide>
        </div>
    )
}

export default ApartmentImages;

// https://www.npmjs.com/package/react-slideshow-image
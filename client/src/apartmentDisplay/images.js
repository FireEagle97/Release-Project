import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    height: '500px'
}

const images = ["https://azure2134398.blob.core.windows.net/test/920347264527603043.jpg",
 "https://azure2134398.blob.core.windows.net/test/993334886240573545.jpg",
 "https://azure2134398.blob.core.windows.net/test/383585474952906101.jpg",
 "https://azure2134398.blob.core.windows.net/test/631.jpg"]

/**
 * ApartmentImages component for displaying apartment images.
 *
 * @component
 * @returns {JSX.Element} Rendered Home component.
 */
function ApartmentImages() {

    return (
        <div id="apartment-images-slider" style={{ width: '50%', margin: '0'}}>
            <Slide>
                {images.map((slideImage, index)=> (
                <div key={index} style={{ display: 'flex', justifyContent: 'center'}}>
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
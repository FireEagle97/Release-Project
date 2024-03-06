import './footer.css';
import { Link } from 'react-router-dom';

function Footer(){
    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
    }

    return <>
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
}
export default Footer;
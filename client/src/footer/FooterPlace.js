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
          
            <div class="top">
              <div class="logo-footer">
                <picture><img src="/logo1.png" alt="Logo" class="image-footer" /></picture>
              </div>
              <div class="left">
                <p><strong>Credits for ReLease 2024:</strong></p>
                <p>Elissar Fadel</p>
                <p>Monica Dimitrova</p>
                <p>Anastasia Bondarenko</p>
                <p>Dany Makhoul</p>
              </div>
              <div className="right">
                <p><strong>Quick links:</strong></p>
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
            </div>
          
            <div class="policy">
              <p>Policy: We are not responsible for any leases posted by users. If you find a post inappropriate, feel free to report it to us.</p>
            </div>
      </footer>
    </>
}
export default Footer;
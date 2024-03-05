import './Contact.css';

export default function Contact() {
    return(
        <div className="contact">
            <h1>Contact Information</h1>
            <br></br>
            <p>
                Thank you for your interest! Feel free to reach out to us if you have any questions
                or would like more information.
            </p>
            <div className="contact-info">
                <div className="contact-item">
                    <strong>Email:</strong> relaease@info.ca
                </div>
                <div className="contact-item">
                    <strong>Phone:</strong> +x (xxx)xxx-xxxx
                </div>
            </div>
        </div>
    );
}
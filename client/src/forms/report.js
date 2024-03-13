import { React } from 'react';
import { useLocation } from 'react-router-dom';
import './report.css';

export default function ReportListing() {
    const location = useLocation();
    const apartment = location.state?.apartment;

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        const reason = event.target.elements['reason'].value;
        const comment = event.target.elements['report-comment'].value;
        formData.append('listingID', apartment._id);
        formData.append('reason', reason);
        formData.append('comment', comment);
    };

    return(
        <div className="report-listing-container">
        <h1 className="report-listing">Report this Listing</h1>
            <p>If you clicked on report button, then you found this listing problematic. 
                Please fill out the report.</p>
            <div id="report-listing-info">
                <p><b>Listing in </b>{apartment.address}</p>
                <img src={`${apartment.images[0]}`} alt=""/>
            </div>
            <form onSubmit={handleSubmit}>
                <label for="report-reason">Reason of report:</label>
                <select name="reason" id="report-reason">
                    <option value="other">Other</option>
                    <option value="address-error">Address mentioned does not exist</option>
                    <option value="images-error">Images are not related</option>
                    <option value="date-error">Post date is overdue</option>
                    <option value="owner-error">Wrong contact information/Owner is not trustworthy</option>
                </select>
                <label for="report-comment">Comments:</label>
                <textarea id="report-comment" name="report-comment"></textarea>
            </form>
        </div>
    );
}
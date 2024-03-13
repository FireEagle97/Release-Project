import { React, useState } from 'react';
import './report.css';

export default function ReportListing() {
    const [reason, setReason] = useState('');
    const [comment, setComment] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        //formData.append('Listing id', id);
        formData.append('reason', reason);
        formData.append('comment', comment);
    };

    return(
        <div className="report-listing-container">
        <h1 className="report-listing">Report this Listing</h1>
            <div id="report-listing-info"></div>
            <form onSubmit={handleSubmit}>
                <label for="report-reason">Reason of report:</label>
                <select name="reason" id="report-reason">
                    <option value="other">Other</option>
                    <option value="address-error">Address mentioned does not exist</option>
                    <option value="images-error">Images are not related</option>
                    <option value="owner-error">Wrong contact information/Owner is not trustworthy</option>
                </select>
                <label for="report-comment">Comments:</label>
                <textarea id="report-comment" name="report-comment"></textarea>
            </form>
        </div>
    );
}
import { useState } from 'react';
import './post_listing.css';

export default function PostListing() {
  const [title, setTitle] = useState('');
  const [rentPrice, setRentPrice] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [files, setFiles] = useState([]);

  const handleChange = (event) => {
    const { title, value } = event.target;

    switch (title) {
      case 'title':
        setTitle(value);
        break;
      case 'rentPrice':
        setRentPrice(value);
        break;
      case 'address':
        setAddress(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'contactInfo':
        setContactInfo(value);
        break;
      case 'image':
        // setFiles(Array.from(event.target.files));
        setFiles((prevFiles) => [...prevFiles, ...Array.from(event.target.files)]);

        break;
      default:
        break;
    }
  };

  const handleRemoveImage = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const isFormValid = () => {
    return [title, rentPrice, address, description, contactInfo].every((field) => field.trim() !== '') && files.length > 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('rentPrice', rentPrice);
    formData.append('address', address);
    formData.append('description', description);
    formData.append('contactInfo', contactInfo);
    //append multiple files
    files.forEach((file, index) => {
      formData.append(`file${index + 1}`, file);
    });

    try {
      await fetch('/fileUpload', {
        method: 'POST',
        headers: {},
        body: formData,
      });

      // eslint-disable-next-line no-alert
      alert('Submitted successfully');
    } catch (error) {
      console.error('Error:', error);
      // eslint-disable-next-line no-alert
      alert('Error submitting the form');
    }
  };

  return (
    <>
      <h1>Create Your Listing</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Listing Title</label>
        <input type="text" id="title" title="title" value={title} onChange={handleChange} />

        <label htmlFor="rentPrice">Rent Price</label>
        <input type="number" id="rentPrice" title="rentPrice" value={rentPrice} onChange={handleChange} min="0" />

        <label htmlFor="address">Address</label>
        <input type="text" id="address" title="address" value={address} onChange={handleChange} />

        <label htmlFor="description">Description</label>
        <textarea id="description" title="description" value={description} onChange={handleChange} />

        <label htmlFor="contactInfo">Contact Information</label>
        <input type="text" id="contactInfo" title="contactInfo" value={contactInfo} onChange={handleChange} />

        <label htmlFor="images">Add images:</label>
        <input type="file" title="image" onChange={handleChange} multiple />
        <div className="image-preview">
          {files.map((file, index) => (
            <div key={index} className="image-container">
              <img alt={`Image Preview ${index + 1}`} src={URL.createObjectURL(file)} />
              <button type="button" onClick={() => handleRemoveImage(index)}>
                X
              </button>
            </div>
          ))}
        </div>

        <button type="submit" disabled={!isFormValid()}>Submit</button>
      </form>
    </>
  );
}

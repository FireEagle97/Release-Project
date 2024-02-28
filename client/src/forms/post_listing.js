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
    const { name, value } = event.target;

    switch (name) {
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

    files.forEach((file, index) => {
      formData.append(`file${index + 1}`, file);
    });

    try {
      await fetch('/leaseUpload', {
        method: 'POST',
        headers: {},
        body: formData,
      });

      alert('Submitted successfully');
      resetForm();
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting the form');
    }
  };

  const resetForm = () => {
    setTitle('');
    setRentPrice('');
    setAddress('');
    setDescription('');
    setContactInfo('');
    setFiles([]);
  };

  return (
    <div className="post-listing-container">
      <h1 className="create-listing">Create Your Listing</h1>
      <form onSubmit={handleSubmit}>
        <div className="float-container">
        <div className="float-child">
          <label htmlFor="title">Listing Title</label>
          <input type="text" id="title" name="title" value={title} onChange={handleChange} />

          <label htmlFor="rentPrice">Rent Price</label>
          <input type="number" id="rentPrice" name="rentPrice" value={rentPrice} onChange={handleChange} min="0" />

          <label htmlFor="address">Address</label>
          <input type="text" id="address" name="address" value={address} onChange={handleChange} />
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" value={description} onChange={handleChange} />

          <label htmlFor="contactInfo">Contact Information</label>
          <input type="text" id="contactInfo" name="contactInfo" value={contactInfo} onChange={handleChange} />
        </div>

        <div className="float-child">
          <div className="image-column">
            <label htmlFor="images">Add images</label>
            <input type="file" id="images" name="image" onChange={handleChange} multiple />
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
          </div>
          </div>
        </div>

        <button type="submit" disabled={!isFormValid()}>Submit</button>
      </form>
    </div>
  );
}

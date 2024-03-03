import { useState } from 'react';
import './post_listing.css';

export default function PostListing() {
  const [title, setTitle] = useState('');
  const [rentPrice, setRentPrice] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [size, setSize] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [floorNumber, setFloorNumber] = useState('');
  const [furnishing, setFurnishing] = useState('');
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
      case 'size':
        setSize(value);
        break;
      case 'bedrooms':
        setBedrooms(value);
        break;
      case 'bathrooms':
        setBathrooms(value);
        break;
      case 'floorNumber':
        setFloorNumber(value);
        break;
      case 'furnishing':
        setFurnishing(value);
        break;
      case 'images':
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

    const validTextFields = [title, address, description, contactInfo].every((field) => field.trim() !== '')
    const validNumFields = [rentPrice, size, bedrooms, bathrooms, floorNumber].every((field) => field.length > 0);
    const validFurnishing = ['Unfurnished', 'Semi-Furnished', 'Furnished'].includes(furnishing);


    return validTextFields && validNumFields && validFurnishing;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('rentPrice', rentPrice);
    formData.append('address', address);
    formData.append('description', description);
    formData.append('contactInfo', contactInfo);
    formData.append('size', size);
    formData.append('bedrooms', bedrooms);
    formData.append('bathrooms', bathrooms);
    formData.append('floorNumber', floorNumber);
    formData.append('furnishing', furnishing);

    files.forEach((file, index) => {
      formData.append(`file${index + 1}`, file);
    });


    //formdata
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      await fetch('/fileUpload', {
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
    setSize('');
    setBedrooms('');
    setBathrooms('');
    setFloorNumber('');
    setFurnishing('');
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

          <label htmlFor="size">Size (sq ft)</label>
          <input type="number" id="size" name="size" value={size} onChange={handleChange} />

          <label htmlFor="bedrooms">Number of Bedrooms</label>
          <input type="number" id="bedrooms" name="bedrooms" value={bedrooms} onChange={handleChange} min="0" />

          <label htmlFor="bathrooms">Number of Bathrooms</label>
          <input type="number" id="bathrooms" name="bathrooms" value={bathrooms} onChange={handleChange} min="0" />

          <label htmlFor="floorNumber">Floor Number</label>
          <input type="number" id="floorNumber" name="floorNumber" value={floorNumber} onChange={handleChange} min="0" />

          <label htmlFor="furnishing">Furnishing</label>
          <br></br>

          <div className="furnishing-options">
            <label>
              <input type="radio" id="unfurnished" name="furnishing" value="Unfurnished" checked={furnishing === 'Unfurnished'} onChange={handleChange}/>
              <span className="radio-circle"></span> Unfurnished
            </label>

            <label>
              <input
                type="radio" id="semiFurnished" name="furnishing" value="Semi-Furnished" checked={furnishing === 'Semi-Furnished'} onChange={handleChange}/>
              <span className="radio-circle"></span> Semi-Furnished
            </label>

            <label>
              <input
                type="radio" id="furnished" name="furnishing" value="Furnished" checked={furnishing === 'Furnished'} onChange={handleChange}/>
              <span className="radio-circle"></span> Furnished
            </label>
          </div>

          <br></br>

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
                  <img alt="Preview" src={URL.createObjectURL(file)} />
                  <button type="button" onClick={() => handleRemoveImage(index)}>
                    x
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

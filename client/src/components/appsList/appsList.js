import React, { useState } from 'react';

const AppartmentList = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 9;

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentAppartments = data.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = pageNumber => setCurrentPage(pageNumber);
  return (
    <div>
      <div className="card-container">
        {currentAppartments.map(appartment => (
          <div key={appartment.id} className="card">
            <img src={appartment.image} alt={appartment.title} />
            <h2>{appartment.title}</h2>
            <p>{appartment.description}</p>
            <button onClick={() => console.log(`Showing more details for ${appartment.title}`)}>
              Show More
            </button>
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: Math.ceil(data.length / cardsPerPage) }).map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AppartmentList;

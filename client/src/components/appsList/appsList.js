import React, { useState } from 'react';

const AppartmentList = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 9;

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentAppartments = data.slice(indexOfFirstCard, indexOfLastCard);

//   const paginate = pageNumber => setCurrentPage(pageNumber);
  return (
    <section class="py-5">
    <div class="container px-4 px-lg-5 mt-5">
        <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-3">
        {currentAppartments.map(appartment => (
            <div key={appartment.id} class="col mb-5">
                <div class="card h-100">
                    {/* Appartment image */}
                    <img src={appartment.image} alt={appartment.title} />
                    {/* Appartment detail */}
                    <div class="card-body p-4">
                        <div class="text-center">
                            {/* Appartment title */}
                            <h5 class="fw-bolder">{appartment.title}</h5>
                            {/* Appartment rent */}
                            {appartment.rent}
                        </div>
                    </div>
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">View options</a></div>
                    </div>
                </div>
            </div>
        ))}
        </div>

    </div>   
    {/* <div className="pagination">
    {Array.from({ length: Math.ceil(data.length / cardsPerPage) }).map((_, index) => (
      <button key={index} onClick={() => paginate(index + 1)}>
        {index + 1}
      </button>
    ))}
  </div> */}
    </section>
  );
};

export default AppartmentList;

import React, { useEffect, useState } from 'react';

const AppartmentList = () => {
    const [appartments, setAppartments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 9;

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentAppartments = appartments.slice(indexOfFirstCard, indexOfLastCard);

    const paginate = pageNumber => setCurrentPage(pageNumber);
    useEffect(() => {
        async function fetchAppartments()
        {
            try{
                const response = await fetch('/appartments');
                if(!response.ok){
                    throw new Error('Failed to fetch appartments');
                }
                const data = await response.json();
                setAppartments(data.response);
            }catch (error) {
                console.error('Error fetching appartments:', error);
            }
        }
        fetchAppartments();    
}, []);
  return (
    <section class="py-5">
    <div class="container px-4 px-lg-5 mt-5">
        <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-3">
        {currentAppartments.map(appartment => (
            <div key={appartment.id} class="col mb-5">
                <div class="card h-100">
                    {/* Appartment image */}
                    <img src={appartment.images[0]} alt={appartment.bhk} />
                    {/* Appartment detail */}
                    <div class="card-body p-4">
                        <div class="text-center">
                            {/* Appartment title */}
                            <h5 class="fw-bolder">{appartment.furnishing} appartment located in {appartment.areaLocality},
                             {appartment.city}</h5>
                            {/* Appartment rent */}
                            {appartment.rentPrice}/ month
                        </div>
                    </div>
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">View listing</a></div>
                    </div>
                </div>
            </div>
        ))}
        </div>
        <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-3 justify-content-center">
            <div class="pagination">
                <button onClick={onPrevious} disabled={currentPage === 1}>
                       Previous
                </button>
                {Array.from({ length: Math.ceil(appartments.length / cardsPerPage) }).map((_, index) => (
                <button class="btn btn-outline-primary" key={index} onClick={() => paginate(index + 1)}>
                    {index + 1}
                </button>
                ))}
                <button onClick={onNext} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>

    </div>   

    </section>
  );
};

export default AppartmentList;

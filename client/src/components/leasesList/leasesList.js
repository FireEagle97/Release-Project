import React, { useEffect, useState } from 'react';

const LeasesList = () => {
    const [leases, setLeases] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 9;
    const totalPages = leases.length;
    const nPages = Math.ceil(totalPages / cardsPerPage);
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentLeases = leases.slice(indexOfFirstCard, indexOfLastCard);

    const paginate = currentPage => setCurrentPage(currentPage);
    const onNext = () => {
        if(currentPage !== nPages)
            setCurrentPage(currentPage + 1);
    }

    const onPrevious = () => {
        if(currentPage !== nPages)
            setCurrentPage(currentPage - 1);
    }

    // // Calculate pagination buttons
    // const maxVisibleButtons = 5;
    // let startPage = Math.max(currentPage - Math.floor(maxVisibleButtons / 2), 1);
    // let endPage = Math.min(startPage + maxVisibleButtons - 1, totalPages);

    // // Adjust startPage and endPage if total pages are less than maxVisibleButtons
    // if (totalPages <= maxVisibleButtons) {
    //     startPage = 1;
    //     endPage = totalPages;
    // } else {
    //     if (endPage - startPage + 1 < maxVisibleButtons) {
    //         startPage = endPage - maxVisibleButtons + 1;
    //     }
    // }

    useEffect(() => {
        async function fetchLeases()
        {
            try{
                const response = await fetch('/leases');
                if(!response.ok){
                    throw new Error('Failed to fetch leases');
                }
                const data = await response.json();
                setLeases(data.response);
            }catch (error) {
                console.error('Error fetching leases:', error);
            }
        }
        fetchLeases();    
}, []);
  return (
    <section class="py-5">
    <div class="container px-4 px-lg-5 mt-5">
        <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-3">
        {currentLeases.map(appartment => (
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
                <button class="btn btn-outline-primary" onClick={onPrevious} disabled={currentPage === 1}>
                       Previous
                </button>
                {Array.from({ length: Math.ceil(leases.length / cardsPerPage) }).map((_,index) => (
                <button class="btn btn-outline-primary" key={index} onClick={() => paginate(index + 1)}>
                    {index + 1}
                </button>
                ))}
                <button class="btn btn-outline-primary" onClick={onNext} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>

    </div>   

    </section>
  );
};

export default LeasesList;

import React, { useEffect, useState, useMemo } from 'react';
import Pagination from "../pagination/pagination";
const LeasesList = ({ navigateToApartmentPage }) => {
    const [leases, setLeases] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 9;
    const currentLeases = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * cardsPerPage;
        const lastPageIndex = firstPageIndex + cardsPerPage;
        return leases.slice(firstPageIndex, lastPageIndex);
      }, [currentPage, leases]);

    const handleApartmentClick = (apartment) => {
        navigateToApartmentPage(apartment);
    };
   
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
        {currentLeases.map(apartment => (
            <div key={apartment.id} class="col mb-5">
                <div class="card h-100">
                    {/* apartment image */}
                    <img src={apartment.images[0]} alt={apartment.bhk} />
                    {/* apartment detail */}
                    <div class="card-body p-4">
                        <div class="text-center">
                            {/* apartment title */}
                            <h5 class="fw-bolder">{apartment.furnishing} apartment located in {apartment.areaLocality},
                             {apartment.city}</h5>
                            {/* apartment rent */}
                            {apartment.rentPrice}/ month
                        </div>
                    </div>
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div class="text-center"  
                            // eslint-disable-next-line no-unused-expressions
                            onClick={() => {console.log('ap', apartment); handleApartmentClick(apartment)}
                        }>
                            <a class="btn btn-outline-dark mt-auto">View listing</a>
                        </div>
                    </div>
                </div>
            </div>
        ))}
        </div>
         <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-3 justify-content-center">
         <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={leases.length}
            pageSize={cardsPerPage}
            onPageChange={page => setCurrentPage(page)}
        />
        </div> 

    </div>   

    </section>
  );
};

export default LeasesList;

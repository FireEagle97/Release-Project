import React, { useEffect, useState, useMemo } from 'react';
import Pagination from "../pagination/pagination";
import Filters from '../filters/filters';
const LeasesList = () => {
    const [leases, setLeases] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOption, setSortOption] = useState(null);
    const [searchQuery, setSearchQuery] = useState(null);
    const cardsPerPage = 9;
    const currentLeases = useMemo(() => {
        let filteredLeases = leases;
        if (sortOption === 'lowestPrice') {
            filteredLeases = filteredLeases.sort((a, b) => a.rentPrice - b.rentPrice);
        } else if (sortOption === 'highestPrice') {
            filteredLeases = filteredLeases.sort((a, b) => b.rentPrice - a.rentPrice);
        }
        const firstPageIndex = (currentPage - 1) * cardsPerPage;
        const lastPageIndex = firstPageIndex + cardsPerPage;
        return filteredLeases.slice(firstPageIndex, lastPageIndex);
      }, [leases, sortOption, currentPage]);

      const handleSearch = () =>{
        if(searchQuery != null || searchQuery.trim() !== ""){
            const searchTerms = searchQuery.trim().toLowerCase().split(" ");

            const filteredLeases = leases.filter(lease =>{
                return searchTerms.some(term =>
                    lease.city.toLowerCase().includes(term.toLowerCase()) ||
                    lease.furnishing.toLowerCase().includes(term.toLowerCase())
                    )}  
                );
                // lease.bathroom.toLowerCase().includes(searchQuery.toLowerCase())
                
            setLeases(filteredLeases);
        }

      }
    useEffect(() => {
        async function fetchLeases()
        {
            try{
                let response = await fetch('/leases');
                if(searchQuery != null){
                    response = await fetch(`/leases/city=${searchQuery}`);
                }
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
    }, [searchQuery]);
    
  return (
    <section class="py-5">
    <div class="container px-4 px-lg-5 mt-5">
        <Filters
            sortOption={sortOption}
            setSortOption={setSortOption}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
        />
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
                            <h5 class="fw-bolder">{apartment.furnishing} apartment located in {apartment.areaLocality}, {apartment.city}</h5>
                            {/* apartment rent */}
                            ${apartment.rentPrice}/month
                        </div>
                    </div>
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div class="text-center" onClick={() => handleApartmentClick(apartment)}>
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

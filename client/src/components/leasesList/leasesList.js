import React, { useEffect, useState, useMemo } from 'react';
import Pagination from "../pagination/pagination";
const LeasesList = () => {
    const [leases, setLeases] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterOption, setFilterOption] = useState(null);
    const cardsPerPage = 9;
    const currentLeases = useMemo(() => {
        let filteredLeases = leases;
        if (filterOption === 'lowestPrice') {
            filteredLeases = filteredLeases.sort((a, b) => a.rentPrice - b.rentPrice);
        } else if (filterOption === 'highestPrice') {
            filteredLeases = filteredLeases.sort((a, b) => b.rentPrice - a.rentPrice);
        }
        const firstPageIndex = (currentPage - 1) * cardsPerPage;
        const lastPageIndex = firstPageIndex + cardsPerPage;
        return filteredLeases.slice(firstPageIndex, lastPageIndex);
      }, [currentPage, leases, filterOption]);
   
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
}, [filterOption]);
  return (
    <section class="py-5">
    <div class="container px-4 px-lg-5 mt-5">
        <div className="row mb-3">
            <div className='col-1'>Filter by:</div>
            <div className="col-2"> 
                <select
                    id="filterOptions"
                    className="form-select"
                    value={filterOption}
                    onChange={(e) => setFilterOption(e.target.value)}
                >
                    <option value="">Select</option>
                    <option value="lowestPrice">Lowest Price</option>
                    <option value="highestPrice">Highest Price</option>
                </select>
            </div>
            <div className='col-3'>
                <div class="input-group mb-3">
                    <button class="btn btn-outline-secondary" type="button" id="search-btn">search</button>
                    <input type="text" class="form-control" placeholder=""/>
                </div>
            </div>
        </div>
    
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

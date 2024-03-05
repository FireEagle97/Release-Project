import React from 'react';

const Filters = ({sortOption, setSortOption,searchQuery,setSearchQuery}) => {
    
    const handleSearchChange= (event) => {
        setSearchQuery(event.target.value);
    }
    return (
        <div className="row mb-3">
        <div className='col-1'>Sort by:</div>
        <div className="col-2"> 
            <select
                id="filterOptions"
                className="form-select"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
            >
                <option value="">Select</option>
                <option value="lowestPrice">Lowest Price</option>
                <option value="highestPrice">Highest Price</option>
            </select>
        </div>
        <div className='col-3'>
            <input type="text" class="form-control mt-0" placeholder="Search Leases..."
                        value={searchQuery}
                        onChange={handleSearchChange}/>
            {/* <div class="input-group mb-3">
       
            </div> */}
        </div>
    </div>
    )
};
export default Filters;

import React from 'react';

const Filters = ({filterOption, setFilterOption}) => {
    

    return (
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
    )
};
export default Filters;

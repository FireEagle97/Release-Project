import React, { useState } from 'react';
import "./filters.css";
const Filters = ({sortOption, setSortOption,searchQuery,setSearchQuery}) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleSearchChange= (event) => {
        setSearchQuery(event.target.value);
    }
    const handleIsOpen = () => {
        // if(isOpen){
        //     setIsOpen(false);
        // }else{
        //     setIsOpen(true);
        // }
        setIsOpen(!isOpen);
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
        </div>
        <div className='col-3'>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="filtersDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Filters
                    </button>
                    <div className="dropdown-menu" aria-labelledby="filtersDropdown">
                        <form class='dropdown-item'>
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" />
                                <label className="form-check-label">Check me out</label>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        {/* <div className='col-3'>
            <div classname="filter">
                <button onclick={setIsOpen(!isOpen)} className="filter__button">
                    Filters
                </button>
                {isOpen && (    
                <div ref="{dropdownRef}" classname="filter__dropdown">
                        <div>
                            {`Dropdown content goes here `}
                        </div>
                        <div classname="filter__dropdown__actions">
                        <button onclick="{handleApply}" classname="filter__dropdown_button">
                            Apply
                        </button>
                    </div>
                </div>
                )};
            </div>
        </div> */}
        <div>
      <button onClick={setIsOpen(!isOpen)}>
        {isOpen ? 'Hide' : 'Show'} Div
      </button>
      {isOpen || (
        <div style={{ marginTop: '10px', backgroundColor: 'lightgrey', padding: '10px' }}>
          This is the div content!
        </div>
      )};
    </div>
        <div className='row mb-3'>
            <form class='dropdown-item'>
                <div>City</div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" />
                    <label className="form-check-label">City12</label>
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" />
                    <label className="form-check-label">City2</label>
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" />
                    <label className="form-check-label">City3</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>

)};
export default Filters;

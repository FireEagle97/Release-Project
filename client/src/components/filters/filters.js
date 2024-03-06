import React, { useState } from "react";
import "./filters.css";
const Filters = ({
  sortOption,
  setSortOption,
  searchQuery,
  setSearchQuery,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <section class="py-5">
      <div className="row mb-3">
        <div className="col-1">Sort by:</div>
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
        <div className="col-3">
          <input
            type="text"
            class="form-control mt-0"
            placeholder="Search Leases..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="col-3">
          <button
            className="btn btn-secondary dropdown-toggle"
            onClick={() => setIsOpen(!isOpen)}
          >
            Filters
          </button>
        </div>
      </div>
      <div className="row mb-3">
        {isOpen && (
          <div className="row mb-3">
            <form>
              <div className="col-3">
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
              </div>
              <button type="submit" className="btn btn-primary">
                Apply
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};
export default Filters;

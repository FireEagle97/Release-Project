import React, { useState, useEffect } from "react";
import { Range } from "react-range";
import "./filters.css";
const Filters = ({
  sortOption,
  setSortOption,
  searchQuery,
  setSearchQuery,
  rentValues,
  setRentValues,
  bathroomCount,
  setBathroomCount,
  bedroomCount,
  setBedroomCount,
  furnishing,
  city,
  leases,
  setCity,
  setFurnishing,
  setApplyFilters,
  clearFilters,
  setClearFilters
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cityList, setCityList] = useState([]);
  const [furnishingList, setFurnishingList] = useState([]);

  useEffect(() => {
    async function fetchCities() {
      try {
        let response = await fetch("/filters/city");
        if (!response.ok) {
          throw new Error("Failed to fetch leases");
        }
        const data = await response.json();
        setCityList(data.response);
      } catch (error) {
        console.error("Error fetching leases:", error);
      }
    }
    async function fetchFurnishing() {
      try {
        let response = await fetch("/filters/furnishing");
        if (!response.ok) {
          throw new Error("Failed to fetch leases");
        }
        const data = await response.json();
        setFurnishingList(data.response);
      } catch (error) {
        console.error("Error fetching leases:", error);
      }
    }
    fetchCities();
    fetchFurnishing();
  }, []);
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleApplyFilters = () => {
    setApplyFilters(true);
  };
  const handleFiltersDropdown = () => {
    setIsOpen(!isOpen);
    setClearFilters(!clearFilters);
  };

  function incrementBathroomCount() {
    if (bathroomCount < 5) {
      bathroomCount = bathroomCount + 1;
    }
    setBathroomCount(bathroomCount);
  }
  function decrementBathroomCount() {
    if (bathroomCount > 0) {
      bathroomCount = bathroomCount - 1;
    }
    setBathroomCount(bathroomCount);
  }
  function incrementBedroomCount() {
    if (bedroomCount < 5) {
      bedroomCount = bedroomCount + 1;
    }
    setBedroomCount(bedroomCount);
  }
  function decrementBedroomCount() {
    if (bedroomCount > 0) {
      bedroomCount = bedroomCount - 1;
    }
    setBedroomCount(bedroomCount);
  }
  function handleClearFilters(){
    setIsOpen(!isOpen);
    setClearFilters(!clearFilters)
  }
  return (
    <section class="pt-5">
      <div className="mb-3 listings-filters">
        <div className="order-filter">
          <span id="order-title">Order by:</span>
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
        <div className="search-filter">
          <input
            type="text"
            class="form-control mt-0"
            placeholder="Search Leases..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="filter-button-dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            onClick={handleClearFilters}
          >
            Filters
          </button>
        </div>
        {clearFilters && (
          <div className="clear-filters-button">
            <button
              className="btn btn-danger"
              onClick={handleFiltersDropdown}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
      {isOpen && (
        <div
          className="mb-4 filters-div"
        >
          <div className="filters-div-inner">
            <div style={{marginBottom:"1rem"}}>
              <div style={{textAlign:"start"}}>*City</div>
              <div
                style={{
                  overflow: "scroll",
                  height: "100px",
                  width: "120px",
                }}
              >
                
                {cityList.map((city) => (
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      onChange={() => setCity(city)}
                      name="city"
                    />
                    <label className="form-check-label">{city}</label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ textAlign: "start" }}>Furnishing</div>
              <div className="form-check" style={{ textAlign: "start" }}>
                <input
                  type="radio"
                  className="form-check-input"
                  onChange={() => setFurnishing(furnishing)}
                  name="furnishing"
                />
                <label className="form-check-label">All</label>
              </div>
              {furnishingList.map((furnishing) => (
                <div className="form-check" style={{ textAlign: "start" }}>
                  <input
                    type="radio"
                    className="form-check-input"
                    onChange={() => setFurnishing(furnishing)}
                    name="furnishing"
                  />
                  <label className="form-check-label">{furnishing}</label>
                </div>
              ))}
            </div>
            <div style={{ margin: "50px" }}>
              <label htmlFor="rent">
                Minimum Rent price: {rentValues[0]} <br/> Maximum Rent price:{" "}
                {rentValues[1]}
              </label>
              <Range
                step={50}
                min={0}
                max={8000}
                values={rentValues}
                onChange={(values) => setRentValues(values)}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      marginTop: "1.5rem",
                      height: "6px",
                      width: "100%",
                      backgroundColor: "#ccc",
                    }}
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ props }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "21px",
                      width: "21px",
                      backgroundColor: "#bfbfbf",
                      borderRadius: "50%",
                      border: "2px solid #999",
                    }}
                  />
                )}
              />
            </div>
            <div>
              <div className="input-group num-filters">
                <div style={{ textAlign: "start", paddingRight: "1rem" }}>Bathrooms:</div>
                <span
                  className="input-group-btn"
                  style={{ paddingTop: "0.4rem" }}
                >
                  <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={decrementBathroomCount}
                  >
                    -
                  </button>
                </span>
                <span className="input-group-btn col-sm-3">
                  <input
                    className="form-control input-number"
                    type="number"
                    id="bathroomNmb"
                    value={bathroomCount}
                    min="0"
                    max="5"
                    onChange={() => setBathroomCount(bathroomCount)}
                  />
                </span>
                <span
                  className="input-group-btn"
                  style={{ paddingTop: "0.4rem" }}
                >
                  <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={incrementBathroomCount}
                  >
                    +
                  </button>
                </span>
              </div>
              <div className="input-group num-filters" style={{paddingTop:"1rem"}}>
                <div style={{ textAlign: "start", paddingRight: "1rem" }}>Bedrooms:</div>
                <span
                  className="input-group-btn"
                  style={{ paddingTop: "0.4rem" }}
                >
                  <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={decrementBedroomCount}
                  >
                    -
                  </button>
                </span>
                <span className="input-group-btn col-sm-3">
                  <input
                    className="form-control input-number"
                    type="number"
                    id="bathroomNmb"
                    value={bedroomCount}
                    min="0"
                    max="5"
                    onChange={() => setBedroomCount(bedroomCount)}
                  />
                </span>
                <span
                  className="input-group-btn"
                  style={{ paddingTop: "0.4rem" }}
                >
                  <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={incrementBedroomCount}
                  >
                    +
                  </button>
                </span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => handleApplyFilters()}
            className="btn btn-primary"
            disabled={!city}
          >
            Apply
          </button>
        </div>
      )}
    </section>
  );
};
export default Filters;

import React, { useState, useEffect } from "react";
import "./filters.css";
const Filters = ({
  sortOption,
  setSortOption,
  searchQuery,
  setSearchQuery,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rentFilter, setRentFilter] = useState(0);
  const [cityList, setCityList] = useState(null);
  const [furnishingList, setFurnishingList] = useState(null);
  let [bathroomCount, setBathroomCount] = useState(0);
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleRentFilter = (event) => {
    setRentFilter(event.target.value);
  };
  function incrementCount() {
    if (bathroomCount < 5) {
      bathroomCount = bathroomCount + 1;
    }
    setBathroomCount(bathroomCount);
  }
  function decrementCount() {
    if (bathroomCount > 0) {
      bathroomCount = bathroomCount - 1;
    }
    setBathroomCount(bathroomCount);
  }
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

  return (
    <section class="py-5">
      <div className="mb-3" style={{ display: "flex" }}>
        <div id="order-title">Order by:</div>
        <div style={{ padding: "1rem" }}>
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
        <div style={{ padding: "1rem" }}>
          <input
            type="text"
            class="form-control mt-0"
            placeholder="Search Leases..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div style={{ padding: "1rem" }}>
          <button
            className="btn btn-secondary dropdown-toggle"
            onClick={() => setIsOpen(!isOpen)}
          >
            Filters
          </button>
        </div>
      </div>
      {isOpen && (
        <div
          className="mb-3"
          style={{
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "9px",
          }}
        >
          <form>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <div>
                <div style={{ display: "flex" }}>City</div>
                <div
                  style={{
                    overflow: "scroll",
                    height: "100px",
                    width: "120px",
                  }}
                >
                  {cityList.map((city) => (
                    <div className="form-check">
                      <input type="radio" className="form-check-input" />
                      <label className="form-check-label">{city}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ display: "flex" }}>Furnishing</div>
                {furnishingList.map((furnishing) => (
                  <div className="form-check">
                    <input type="radio" className="form-check-input" />
                    <label className="form-check-label">{furnishing}</label>
                  </div>
                ))}
              </div>
              <div>
                <label for="rent">Rent price: {rentFilter}</label>
                <input
                  id="rent"
                  type="range"
                  min="0"
                  max="1000"
                  value={rentFilter}
                  onChange={handleRentFilter}
                />
              </div>
              <div>
                <div style={{ display: "flex" }}>Bathrooms:</div>
                <div className="input-group">
                  <span
                    className="input-group-btn"
                    style={{ paddingTop: "0.4rem" }}
                  >
                    <button
                      className="btn btn-secondary"
                      type="button"
                      onClick={decrementCount}
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
                    />
                  </span>
                  <span
                    className="input-group-btn"
                    style={{ paddingTop: "0.4rem" }}
                  >
                    <button
                      className="btn btn-secondary"
                      type="button"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </span>
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Apply
            </button>
          </form>
        </div>
      )}
    </section>
  );
};
export default Filters;

import React, { useState, useEffect } from "react";
import { Range } from "react-range";
import "./filters.css";
const Filters = ({
  sortOption,
  setSortOption,
  searchQuery,
  setSearchQuery,
  setLeases,
  rentValues,
  setRentValues,
  bathroomCount,
  setBathroomCount,
  furnishing,
  city,
  setCity,
  setFurnishing,
  setApplyFilters,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cityList, setCityList] = useState(null);
  const [furnishingList, setFurnishingList] = useState(null);
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleApplyFilters = () => {
    setApplyFilters(true);
  };

  // const handleFiltersFormSubmit = async () => {
  //   try {
  //     let response = await fetch(`/leases/${city}`);
  //     console.log({ city });
  //     if (!response.ok) {
  //       console.error(`Error: ${response.statusText}`);
  //     }
  //     const responseData = await response.json();
  //     console.log({responseData});
  //     setLeases(responseData);
  //     resetForm();
  //   } catch (error) {
  //     console.error("Error:", error);
  //     alert("Error submitting the form");
  //   }
  // };
  // const handleRentFilter = (event) => {
  //   setRentValues(event.target.value);
  // };
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
          {/* <form onSubmit={handleFiltersFormSubmit}> */}
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
              <div style={{ display: "flex" }}>Furnishing</div>
              {furnishingList.map((furnishing) => (
                <div className="form-check">
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
              <label htmlFor="rent">Minimum Rent price: {rentValues[0]} | Maximum Rent price: {rentValues[1]}</label>
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
                      borderRadius:"50%",
                      border:"2px solid #999",
                    }}
                  />
                )}
              />
            </div>
            {/* <div>
              <label for="rent"> Minumum Rent price: {rentValues[0]}  Maximum Rent price: {rentValues[1]}</label>
              <input
                step={50}
                id="rent"
                type="range"
                min={0}
                max={8000}
                values={rentValues}
                onChange={handleRentFilter}
              />
            </div> */}
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
                    onClick={incrementCount}
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
          >
            Apply
          </button>
          {/* </form> */}
        </div>
      )}
    </section>
  );
};
export default Filters;

import React, { useState, useEffect } from "react";
import { Range } from "react-range";
import "./filters.css";
import { useTranslation } from 'react-i18next';

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

  const { t } = useTranslation();

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
    <section class="py-5">
      <div className="mb-3" style={{ display: "flex" }}>
        <div id="order-title">{t('Filter.order')}</div>
        <div style={{ padding: "1rem" }}>
          <select
            id="filterOptions"
            className="form-select"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">{t('Filter.select')}</option>
            <option value="lowestPrice">{t('Filter.lowest')}</option>
            <option value="highestPrice">{t('Filter.highest')}</option>
          </select>
        </div>
        <div style={{ padding: "1rem" }}>
          <input
            type="text"
            class="form-control mt-0"
            // placeholder="Search Leases..."
            placeholder={t('Filter.search')}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div style={{ padding: "1rem" }}>
          <button
            className="btn btn-secondary dropdown-toggle"
            onClick={handleClearFilters}
          >
            {t('Filter.filters')}
          </button>
        </div>
        {clearFilters && (
          <div style={{ padding: "1rem" }}>
            <button
              className="btn btn-danger"
              onClick={handleFiltersDropdown}
            >
              {t('Filter.clear')}
            </button>
          </div>
        )}
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
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <div>
              <div style={{ display: "flex" }}>{t('Filter.city')}</div>
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
              <div style={{ display: "flex" }}>{t('Filter.furnishing')}</div>
              <div className="form-check" style={{ textAlign: "start" }}>
                <input
                  type="radio"
                  className="form-check-input"
                  onChange={() => setFurnishing(furnishing)}
                  name="furnishing"
                />
                <label className="form-check-label">{t('Filter.all')}</label>
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
              {t('Filter.min')} {rentValues[0]} | {t('Filter.max')}{" "}
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
              <div style={{ display: "flex" }}>{t('Filter.baths')}</div>
              <div className="input-group">
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
              <div style={{ display: "flex" }}>{t('Filter.beds')}</div>
              <div className="input-group">
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
            {/* <div>
            
          </div> */}
          </div>
          <button
            type="button"
            onClick={() => handleApplyFilters()}
            className="btn btn-primary"
            disabled={!city}
          >
            {t('Filter.apply')}
          </button>
        </div>
      )}
    </section>
  );
};
export default Filters;

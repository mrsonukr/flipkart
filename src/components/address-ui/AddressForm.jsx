import React, { useState, useRef } from "react";
import "./Address.css"; // Assuming you have a CSS file for styles
const AddressForm = () => {
  const [showAlternate, setShowAlternate] = useState(false);
  const [addressType, setAddressType] = useState("home");
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [showLocationError, setShowLocationError] = useState(false);
  const formRef = useRef(null);

  const autoCapitalize = (e) => {
    const value = e.target.value
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
    e.target.value = value;
  };

  const validatePhoneNumber = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 10);
    e.target.value = value;
  };

  const validatePinCode = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 6);
    e.target.value = value;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = formRef.current;
    const inputs = form.querySelectorAll(".form-control");
    let isValid = true;

    inputs.forEach((input) => {
      const errorMsg = input.parentElement.querySelector(".error-message");
      if (!input.value.trim()) {
        input.style.borderColor = "red";
        if (errorMsg) errorMsg.style.display = "block";
        isValid = false;
      } else {
        input.style.borderColor = "";
        if (errorMsg) errorMsg.style.display = "none";
      }
    });

    if (isValid) {
      // Process valid form here
      console.log("Form submitted");
    }
  };

  const handleLocationClick = () => {
    setLoadingLocation(true);
    setShowLocationError(false);
    setTimeout(() => {
      setLoadingLocation(false);
      setShowLocationError(true);
    }, 2000);
  };

  return (
    <div className="container address-ui">
      <form ref={formRef} onSubmit={handleFormSubmit}>
        <div className="card-body">
          <div className="form-floating mb-3">
            <input
              className="form-control"
              type="text"
              id="name"
              name="name"
              placeholder="Full name"
              onInput={autoCapitalize}
              required
            />
            <label htmlFor="name">Full Name (Required)*</label>
            <small className="error-message" style={{ display: "none" }}>
              Please fill out this field.
            </small>
          </div>

          <div className="form-floating mb-3">
            <input
              className="form-control"
              type="text"
              id="number"
              name="number"
              placeholder="Mobile number"
              maxLength={10}
              required
              onInput={validatePhoneNumber}
            />
            <label htmlFor="number">Mobile number (Required)*</label>
          </div>

          {!showAlternate && (
            <p
              id="addAlternateText"
              onClick={() => setShowAlternate(true)}
              style={{
                color: "#007bff",
                cursor: "pointer",
                marginBottom: "20px",
              }}
            >
              + Add Alternate Phone Number
            </p>
          )}

          {showAlternate && (
            <div className="form-floating mb-3" id="alternateNumberContainer">
              <input
                className="form-control"
                type="text"
                id="alternateNumber"
                name="alternateNumber"
                placeholder="Alternate mobile number"
                maxLength={10}
                onInput={validatePhoneNumber}
                onBlur={(e) => {
                  if (!e.target.value.trim()) {
                    setShowAlternate(false);
                  }
                }}
              />
              <label htmlFor="alternateNumber">
                + Add Alternate Phone Number
              </label>
            </div>
          )}

          <div className="row">
            <div className="col-6 form-floating">
              <input
                className="form-control"
                type="text"
                id="pin"
                name="pin"
                placeholder="PIN code"
                maxLength={6}
                required
                onInput={validatePinCode}
              />
              <label htmlFor="pin">PIN Code (Required)*</label>
            </div>

            <div className="col-6 form-floating">
              <div
                className="location"
                onClick={handleLocationClick}
                style={{ pointerEvents: loadingLocation ? "none" : "auto" }}
              >
                <div className="location-img">
                  {loadingLocation && <div className="spinner"></div>}
                  {!loadingLocation && (
                    <img
                      src="/assets/images/svg/location.svg"
                      width="18"
                      height="18"
                      alt="location"
                    />
                  )}
                  <div className="W-TPaR _279B1i" id="buttonText">
                    {loadingLocation ? "Loading..." : "Use my location"}
                  </div>
                </div>
              </div>
              {showLocationError && (
                <p className="error-message">Unable to Fetch Your Location</p>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-6 form-floating">
              <select className="form-select" id="state" name="state" required>
                <option value="">Select State</option>
                {[
                  "Andhra Pradesh",
                  "Arunachal Pradesh",
                  "Assam",
                  "Bihar",
                  "Chhattisgarh",
                  "Goa",
                  "Gujarat",
                  "Haryana",
                  "Himachal Pradesh",
                  "Jammu & Kashmir",
                  "Jharkhand",
                  "Karnataka",
                  "Kerala",
                  "Madhya Pradesh",
                  "Maharashtra",
                  "Manipur",
                  "Meghalaya",
                  "Mizoram",
                  "Nagaland",
                  "Odisha",
                  "Punjab",
                  "Rajasthan",
                  "Sikkim",
                  "Tamil Nadu",
                  "Telangana",
                  "Tripura",
                  "Uttarakhand",
                  "Uttar Pradesh",
                  "West Bengal",
                  "Andaman & Nicobar",
                  "Chandigarh",
                  "Dadra and Nagar Haveli",
                  "Daman & Diu",
                  "Delhi",
                  "Lakshadweep",
                  "Pondicherry",
                ].map((state) => (
                  <option key={state}>{state}</option>
                ))}
              </select>
              <label htmlFor="state">State</label>
            </div>

            <div className="col-6 form-floating">
              <input
                className="form-control"
                type="text"
                id="city"
                name="city"
                placeholder="Town/City"
                required
                onInput={autoCapitalize}
              />
              <label htmlFor="city">City (Required)*</label>
            </div>
          </div>

          <div className="form-floating mb-3">
            <input
              className="form-control"
              type="text"
              id="flat"
              name="flat"
              placeholder="Flat, House.no, Building, Company"
              required
            />
            <label htmlFor="flat">
              House No., Building Name (Required)*
            </label>
          </div>

          <div className="form-floating mb-3">
            <input
              className="form-control"
              type="text"
              id="area"
              name="area"
              placeholder="Area, Colony, Street, Sector, Village"
              required
            />
            <label htmlFor="area">Road name, Area, Colony (Required)*</label>
          </div>

          <div>
            <p className="gray">Type of address</p>
            <input type="hidden" name="addressType" value={addressType} />

            <div className="button-container1">
              {["home", "work"].map((type) => (
                <div
                  key={type}
                  className={`btn ${addressType === type ? "active" : ""}`}
                  onClick={() => setAddressType(type)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="currentColor"
                      d={
                        type === "home"
                          ? "M15.746 7.232L8.346.14c-.193-.185-.499-.185-.692 0l-7.407 7.1C.09 7.397 0 7.613 0 7.834c0 .46.374.833.833.833H2V15c0 .552.448 1 1 1h2.833c.276 0 .5-.224.5-.5v-4.334c0-.091.075-.166.167-.166h3c.091 0 .167.075.167.166V15.5c0 .276.224.5.5.5H13c.552 0 1-.448 1-1V8.666h1.167c.459 0 .833-.374.833-.833 0-.22-.09-.437-.254-.6z"
                          : "M14.651 16.875V2.25c0-1.24-1.009-2.25-2.25-2.25h-9c-1.24 0-2.25 1.01-2.25 2.25v14.625H.026V18h15.75v-1.125h-1.125zm-5.625-13.5h2.25v2.25h-2.25v-2.25zm0 3.375h2.25V9h-2.25V6.75zm0 3.375h2.25v2.25h-2.25v-2.25zm-4.5-6.75h2.25v2.25h-2.25v-2.25zm0 3.375h2.25V9h-2.25V6.75zm0 3.375h2.25v2.25h-2.25v-2.25zm1.125 6.75V13.5h4.5v3.375h-4.5z"
                      }
                    />
                  </svg>
                  <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <button className="common-button" type="submit">
              Save Address
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;

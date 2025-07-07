import React, { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import StateSelect from "../components/address-ui/StateSelect";
import ButtonRadioGroup from "../components/address-ui/ButtonRadioGroup";

const textFieldStyles = {
  "& .MuiOutlinedInput-root": {
    height: "50px",
    "& input": {
      padding: "12px 14px",
    },
    "& fieldset": {
      borderWidth: "1px",
      borderColor: "#D1D5DB",
    },
    "&:hover fieldset": {
      borderColor: "#D1D5DB",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#2874f0",
      borderWidth: "1px",
    },
  },
  "& .MuiInputLabel-root": {
    fontSize: "0.9rem",
    color: "#757575",
    top: "-2px",
    backgroundColor: "white",
    padding: "0 4px",
    marginLeft: "6px",
  },
  "& label.Mui-focused": {
    color: "#757575",
    fontSize: "0.95rem",
  },
};

const Address = () => {
  const fields = [
    { id: "full-name", label: "Full Name (Required)*" },
    { id: "mobile-number", label: "Mobile Number (Required)*" },
    { id: "address1", label: "House No., Building Name (Required)*" },
    { id: "address2", label: "Road name, Area, Colony (Required)*" },
  ];

  const [showAlternateInput, setShowAlternateInput] = useState(false);
  const [alternatePhone, setAlternatePhone] = useState("");
  const alternateRef = useRef(null);

  useEffect(() => {
    if (showAlternateInput && alternateRef.current) {
      alternateRef.current.focus();
    }
  }, [showAlternateInput]);

  const handleBlurAlternate = () => {
    if (alternatePhone.trim() === "") {
      setShowAlternateInput(false);
    }
  };

  return (
    <div className="p-4">
      <Box
        component="form"
        sx={{ width: "100%", maxWidth: "100%" }}
        noValidate
        autoComplete="off"
      >
        {/* Full Name */}
        <TextField
          id={fields[0].id}
          label={fields[0].label}
          variant="outlined"
          fullWidth
          sx={textFieldStyles}
          margin="normal"
        />

        {/* Mobile Number */}
        <TextField
          id={fields[1].id}
          label={fields[1].label}
          variant="outlined"
          fullWidth
          sx={textFieldStyles}
          margin="normal"
        />

        {/* + Add Alternate Phone */}
        {showAlternateInput ? (
          <TextField
            inputRef={alternateRef}
            value={alternatePhone}
            onChange={(e) => setAlternatePhone(e.target.value)}
            onBlur={handleBlurAlternate}
            label="+ Add Alternate Phone Number"
            variant="outlined"
            fullWidth
            sx={textFieldStyles}
            margin="normal"
          />
        ) : (
          <div onClick={() => setShowAlternateInput(true)}>
            <p className="text-blue-600 text-sm mt-1 cursor-pointer">
              + Add Alternate Phone Number
            </p>
          </div>
        )}

        {/* Pincode + Use My Location */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <TextField
            id="pincode"
            label="Pincode (Required)*"
            variant="outlined"
            sx={{ ...textFieldStyles, width: "50%" }}
            margin="normal"
          />
          <div
            className="bg-[#2874f0] gap-2 flex items-center mt-2 justify-center text-white text-sm p-3 rounded-md cursor-pointer whitespace-nowrap"
            style={{ width: "50%", height: "37px" }}
          >
            <img src="/assets/images/svg/location.svg" alt="" />
            <span>Use my location</span>
          </div>
        </Box>

        {/* State and City */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
          <Box sx={{ width: "50%" }}>
            <StateSelect sx={textFieldStyles} />
          </Box>
          <TextField
            id="city"
            label="City (Required)*"
            variant="outlined"
            sx={{ ...textFieldStyles, width: "50%", mb: 2 }}
            margin="normal"
          />
        </Box>

        {/* Address Lines */}
        {fields.slice(2).map(({ id, label }) => (
          <TextField
            key={id}
            id={id}
            label={label}
            variant="outlined"
            fullWidth
            sx={textFieldStyles}
            margin="normal"
          />
        ))}
      </Box>

      {/* Address Type */}
      <p className="text-[13px] mt-2 text-gray-500">Type of address</p>
      <ButtonRadioGroup />

      {/* Submit */}
      <button className="bg-[#fb641b] w-full h-12 rounded-sm text-white mt-4">
        Save Address
      </button>
    </div>
  );
};

export default React.memo(Address);

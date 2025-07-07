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
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    address1: "",
    address2: "",
    pincode: "",
    city: "",
    state: "Arunachal Pradesh",
    alternatePhone: "",
  });

  const [showAlternateInput, setShowAlternateInput] = useState(false);
  const [errors, setErrors] = useState({});
  const alternateRef = useRef(null);

  useEffect(() => {
    if (showAlternateInput && alternateRef.current) {
      alternateRef.current.focus();
    }
  }, [showAlternateInput]);

  const handleBlurAlternate = () => {
    if (formData.alternatePhone.trim() === "") {
      setShowAlternateInput(false);
    }
  };

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
    setErrors((prev) => ({ ...prev, [key]: false }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "alternatePhone" && (!value || value.trim() === "")) {
        newErrors[key] = true;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Form submitted ✅", formData);
    }
  };

  const getInputSx = (field) =>
    errors[field]
      ? {
          ...textFieldStyles,
          "& .MuiOutlinedInput-root": {
            ...textFieldStyles["& .MuiOutlinedInput-root"],
            "& fieldset": {
              borderColor: "#c00",
              borderWidth: "1px",
            },
          },
        }
      : textFieldStyles;

  return (
    <div className="p-4">
      <Box
        component="form"
        sx={{ width: "100%", maxWidth: "100%" }}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Full Name (Required)*"
          variant="outlined"
          fullWidth
          sx={getInputSx("fullName")}
          margin="normal"
          value={formData.fullName}
          onChange={(e) => handleChange("fullName", e.target.value)}
        />
        {errors.fullName && (
          <span className="text-[14px] text-[#c00]">
            Please provide the necessary details.
          </span>
        )}

        <TextField
          label="Mobile Number (Required)*"
          variant="outlined"
          fullWidth
          sx={getInputSx("mobileNumber")}
          margin="normal"
          value={formData.mobileNumber}
          onChange={(e) => handleChange("mobileNumber", e.target.value)}
        />
        {errors.mobileNumber && (
          <span className="text-[14px] text-[#c00]">
            Please provide the necessary details.
          </span>
        )}

        {showAlternateInput ? (
          <TextField
            inputRef={alternateRef}
            value={formData.alternatePhone}
            onChange={(e) => handleChange("alternatePhone", e.target.value)}
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

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ width: "50%" }}>
            <TextField
              label="Pincode (Required)*"
              variant="outlined"
              fullWidth
              sx={getInputSx("pincode")}
              margin="normal"
              value={formData.pincode}
              onChange={(e) => handleChange("pincode", e.target.value)}
            />
            {errors.pincode && (
              <span className="text-[14px] text-[#c00]">
                Please provide the necessary details.
              </span>
            )}
          </Box>

          <div
            className="bg-[#2874f0] gap-2 flex items-center mt-2 justify-center text-white text-sm p-3 rounded-md cursor-pointer whitespace-nowrap"
            style={{ width: "50%", height: "37px" }}
          >
            <img src="/assets/images/svg/location.svg" alt="" />
            <span>Use my location</span>
          </div>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
          <Box sx={{ width: "50%" }}>
            <StateSelect
              value={formData.state}
              onChange={(e) => handleChange("state", e.target.value)}
              error={!!errors.state}
            />
            {errors.state && (
              <span className="text-[14px] text-[#c00]">
                Please provide the necessary details.
              </span>
            )}
          </Box>
          <Box sx={{ width: "50%", mb: 1 }}>
            <TextField
              label="City (Required)*"
              variant="outlined"
              fullWidth
              sx={getInputSx("city")}
              margin="normal"
              value={formData.city}
              onChange={(e) => handleChange("city", e.target.value)}
            />
            {errors.city && (
              <span className="text-[14px] text-[#c00]">
                Please provide the necessary details.
              </span>
            )}
          </Box>
        </Box>

        <TextField
          label="House No., Building Name (Required)*"
          variant="outlined"
          fullWidth
          sx={getInputSx("address1")}
          margin="normal"
          value={formData.address1}
          onChange={(e) => handleChange("address1", e.target.value)}
        />
        {errors.address1 && (
          <span className="text-[14px] text-[#c00]">
            Please provide the necessary details.
          </span>
        )}

        <TextField
          label="Road name, Area, Colony (Required)*"
          variant="outlined"
          fullWidth
          sx={getInputSx("address2")}
          margin="normal"
          value={formData.address2}
          onChange={(e) => handleChange("address2", e.target.value)}
        />
        {errors.address2 && (
          <span className="text-[14px] text-[#c00]">
            Please provide the necessary details.
          </span>
        )}
      </Box>

      <p className="text-[13px] mt-2 text-gray-500">Type of address</p>
      <ButtonRadioGroup />

      <button
        className="bg-[#fb641b] w-full h-12 rounded-sm text-white mt-4"
        type="button"
        onClick={handleSubmit}
      >
        Save Address
      </button>
    </div>
  );
};

export default React.memo(Address);

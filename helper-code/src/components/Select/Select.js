import React from "react";
import ReactSelect from "react-select";

export default function Select(props) {
  return (
    <ReactSelect
      styles={{
        control: (provided, state) => ({
          ...provided,
          backgroundColor: "#000000",
          borderWidth: 1,
          borderColor: "#4a4a5a",
          color: "#ffffff",
          cursor: "pointer",
          borderRadius: "0.75rem",
        }),
        singleValue: (provided, state) => ({
          ...provided,
          color: "#d9d9d9",
        }),
        indicatorSeparator: (provided, state) => ({
          ...provided,
          display: "none",
        }),
        input: (provided, state) => ({
          ...provided,
          color: "#d9d9d9",
        }),
        option: (provided, state) => {
          return {
            ...provided,
            color: state.isFocused || state.isSelected ? "#12121a" : "00d395",
            backgroundColor:
              state.isFocused || state.isSelected ? "#00d395" : "transparent",
            ":active": {},

            cursor: "pointer",
          };
        },
        menu: (provided, state) => ({
          ...provided,
          backgroundColor: "#191923",
          zIndex: 3,
          margin: "0.3rem 0 0 0",
          width: "max-content",
          minWidth: "100%",
          border: "solid 1px #4a4a5a",
        }),
        multiValue: (provided, state) => {
          return {
            ...provided,
            borderRadius: "0.3rem",
            backgroundColor: "#6c757d",
          };
        },
        multiValueRemove: (provided, state) => {
          return {
            ...provided,
            ":hover": {
              backgroundColor: "#dc3545",
              borderRadius: "0.3rem",
            },
          };
        },
        multiValueLabel: (provided, state) => {
          return {
            ...provided,
            borderRadius: "0.3rem",
            color: "#ffffff",
            backgroundColor: "#6c757d",
            lineHeight: "1rem",
          };
        },
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: "0.3rem",
      })}
      {...props}
    />
  );
}

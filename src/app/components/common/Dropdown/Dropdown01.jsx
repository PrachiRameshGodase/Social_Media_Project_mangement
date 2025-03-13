"use client";
import React, { useEffect, useState } from "react";
import { OutsideClick } from "../OutsideClick/OutsideClick";
import { ChevronUp, ChevronDown } from "lucide-react";
import { OtherIcons } from "@/assests/icons";
import { statusOptions } from "../Helper/Helper";
import { Tooltip } from "@mui/material";

const Dropdown01 = ({ options, selectedValue, onSelect, label, icon }) => {
  const dropdownOutsideClick = OutsideClick();
  const [selected, setSelected] = useState(selectedValue || ""); // Ensure default selection

  const handleOptionSelect = (value) => {
    onSelect(value);
    setSelected(value);
    dropdownOutsideClick.handleToggle();
  };

  return (
    <div className="relative" ref={dropdownOutsideClick?.ref}>
      <Tooltip title={selected || label} arrow disableInteractive>
        <div
          className={`h-[44px] flex items-center gap-2 border border-[#0000004D] hover:border-purple-500 hover:ring-2 hover:ring-purple-200 rounded-lg px-3 py-2 cursor-pointer ${label === "Designation"
            ? "w-fit"
            : label === "Sort By"
              ? "w-fit"
              : label === "Task Type"
                ? "w-fit" // Fixed incorrect "W-[120px]" to "w-[120px]"
                : "w-fit"
            }`}
          onClick={dropdownOutsideClick?.handleToggle}
          ref={dropdownOutsideClick?.buttonRef}
        >
          {icon}
          <span className={`text-gray-700 ${!selected ? "text-gray-400" : ""}`}>
            {selected || label}
          </span>
        </div>
      </Tooltip>

      {dropdownOutsideClick?.isOpen && (
        <div className="absolute top-[100%] mt-2 bg-white shadow-lg border border-[#0000004D] rounded-lg w-[150px] z-50">
          <ul>
            {options.map((option) => (
              <li
                key={option}
                className={`flex px-4 py-2 hover:bg-gray-100 cursor-pointer text-left ${selected === option ? "bg-gray-200" : ""
                  }`}
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default Dropdown01;


export const Dropdown001 = ({ options, selectedValue, onSelect, label, icon }) => {
  const dropdownOutsideClick = OutsideClick();
  const [selected, setSelected] = useState(selectedValue); // Store selected option

  const handleOptionSelect = (value) => {
    setSelected(value);
    onSelect(value);
    dropdownOutsideClick.handleToggle(); // Close dropdown after selection
  };
  useEffect(() => {
    setSelected(selectedValue); // Update state when selectedDate changes
  }, [selectedValue]);

  return (
    <div className="relative" ref={dropdownOutsideClick?.ref}>
      <div
        className="h-10 flex items-center justify-between gap-2 border border-[#0000004D] rounded-lg px-3 py-2 cursor-pointer w-[310px] sm:w-[350px]  md:w-[400px]"
        onClick={dropdownOutsideClick?.handleToggle}
        ref={dropdownOutsideClick?.buttonRef}
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className={`text-gray-600 ${selected ? "text-gray-700" : ""}`}>
            {selected || label}
          </span>
        </div>
        {/* Dynamic Arrow Icon */}
        <div className="ml-auto cursor-pointer" onClick={dropdownOutsideClick?.handleToggle}>
          {dropdownOutsideClick?.isOpen ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </div>
      </div>

      {/* Dropdown Menu */}
      {dropdownOutsideClick?.isOpen && (
        <div className="absolute top-[100%] mt-2 bg-white shadow-lg border border-[#0000004D] rounded-lg w-[310px] sm:w-[350px]  md:w-[400px]  z-50">
          <ul>
            {options.map((option) => (
              <li
                key={option}
                className={`flex px-4 py-2 hover:bg-gray-100 cursor-pointer text-left ${selected === option ? "bg-gray-200" : ""
                  }`}
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};


export const DropdownStatus = ({ selectedValue, onSelect }) => {
  const dropdownOutsideClick = OutsideClick();


  const [selected, setSelected] = useState(
    statusOptions.find((option) => option.value === selectedValue) || null
  );

  const handleOptionSelect = (option) => {
    setSelected(option);
    onSelect(option.value);
    dropdownOutsideClick.handleToggle();
  };

  return (
    <div className="relative" ref={dropdownOutsideClick?.ref}>
      {/* Dropdown Button */}
      <Tooltip title={selected ? selected.label : "Status"} arrow disableInteractive>
        <div
          className={`h-[44px] flex items-center gap-2  border border-[#0000004D] hover:border-purple-500 hover:ring-2 hover:ring-purple-200  rounded-lg px-3 py-2 cursor-pointer w-[120px]`}
          onClick={dropdownOutsideClick?.handleToggle}
          ref={dropdownOutsideClick?.buttonRef}
        >
          {OtherIcons.user_svg}
          <span className={`text-gray-700 ${!selected ? "text-gray-400" : ""}`}>
            {selected ? selected.label : "Status"}
          </span>
        </div>
      </Tooltip>

      {/* Dropdown List */}
      {dropdownOutsideClick?.isOpen && (
        <div className="absolute top-[100%] mt-2 bg-white shadow-lg border border-[#0000004D] rounded-lg w-[150px] z-50">
          <ul>
            {statusOptions?.map((option) => (
              <li
                key={option.value}
                className={`flex px-4 py-2 hover:bg-gray-100 cursor-pointer text-left ${selected?.value === option.value ? "bg-gray-200" : ""
                  }`}
                onClick={() => handleOptionSelect(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

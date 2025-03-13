"use client";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { OutsideClick } from "../OutsideClick/OutsideClick";

export const Dropdown03 = ({ options, selectedValue, onSelect, label, icon }) => {
  const dropdownOutsideClick = OutsideClick();
  const [selected, setSelected] = useState(null); // Store selected object
  const [searchQuery, setSearchQuery] = useState(""); // Store search input

  // Handle option selection and pass the ID
  const handleOptionSelect = (option) => {
    setSelected(option); // Store the selected object
    onSelect(option?.id); // Pass only the ID
    dropdownOutsideClick.handleToggle(); // Close dropdown after selection
  };

  // Update selected state when selectedValue (ID) changes
  useEffect(() => {
    if (selectedValue) {
      // Find the full option object by ID
      const foundOption = options?.find((option) => option.id === selectedValue);
      setSelected(foundOption || null);
    } else {
      setSelected(null);
    }
  }, [selectedValue, options]);

 
  return (
    <div className="relative w-[310px] sm:w-[350px] md:w-[400px]" ref={dropdownOutsideClick?.ref}>
      {/* Dropdown Header */}
      <div
        className="h-10 flex items-center justify-between gap-2 border border-[#0000004D] rounded-lg px-3 py-2 cursor-pointer w-full"
        onClick={dropdownOutsideClick?.handleToggle}
        ref={dropdownOutsideClick?.buttonRef}
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className={`text-gray-600 ${selected ? "text-gray-700" : ""}`}>
            {selected ? `${selected?.first_name} ${selected?.last_name}` : label}
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
        <div className="absolute top-[100%] mt-2 bg-white shadow-lg border border-[#0000004D] rounded-lg w-full z-50">
          {/* Search Input */}
          <div className="flex items-center border-b border-[#0000004D] px-3 py-2">
            <Search className="w-4 h-4 text-gray-500 mr-2" />
            <input
              type="text"
              className="w-full outline-none text-sm"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Options List */}
          <ul className="max-h-60 overflow-y-auto">
            {options?.length > 0 ? (
              options?.map((option) => (
                <li
                  key={option?.id}
                  className={`flex px-4 py-2 hover:bg-gray-100 cursor-pointer text-left ${
                    selected?.id === option?.id ? "bg-gray-200" : ""
                  }`}
                  onClick={() => handleOptionSelect(option)}
                >
                  {`${option?.first_name} ${option?.last_name}`}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500 text-sm">No results found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

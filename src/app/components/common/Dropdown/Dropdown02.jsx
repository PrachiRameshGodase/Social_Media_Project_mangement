import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, X, Search } from "lucide-react";
import { OutsideClick } from "../OutsideClick/OutsideClick"; // Ensure this is properly implemented

export const Dropdown02 = ({ options, selectedValues, onSelect, label, icon }) => {
  const dropdownOutsideClick = OutsideClick();
  const [selected, setSelected] = useState(selectedValues || []); // Store selected options
  const [searchQuery, setSearchQuery] = useState(""); // Store search input

  // Handle select/deselect option
  const handleOptionSelect = (value) => {
    let updatedSelection;
    if (selected.includes(value)) {
      updatedSelection = selected.filter((item) => item !== value); // Deselect if already selected
    } else {
      updatedSelection = [...selected, value]; // Select new option
    }
    setSelected(updatedSelection);
    onSelect(updatedSelection); // Pass updated values
  };

  // Remove selected item from list
  const removeSelected = (value) => {
    const updatedSelection = selected.filter((item) => item !== value);
    setSelected(updatedSelection);
    onSelect(updatedSelection);
  };

  // Filter options based on search query
  const filteredOptions = options?.filter((option) =>
    option.toLowerCase().includes(searchQuery.toLowerCase())
  );
  useEffect(() => {
    setSelected(Array.isArray(selectedValues) ? selectedValues : []);
  }, [selectedValues]);
  
  
  return (
    <div className="relative w-[310px] sm:w-[350px] md:w-[400px]  " ref={dropdownOutsideClick?.ref}>
      {/* Dropdown Header */}
      <div
        className="h-auto min-h-10 flex items-center gap-2 border border-[#0000004D] rounded-lg px-3 py-2 cursor-pointer w-full flex-wrap"
        ref={dropdownOutsideClick?.buttonRef}
        onClick={dropdownOutsideClick?.handleToggle}
      >
        <div className="flex items-center gap-2 flex-wrap">
          {icon}
          {/* Show selected items as pills */}
          {selected?.length > 0 ? (
            selected?.map((item) => (
              <div
                key={item}
                className={`flex items-center bg-gray-200 text-gray-700 rounded-md px-2 py-1 text-sm }`}
              >
                {item}
                <X
                  className="w-4 h-4 ml-2 cursor-pointer text-gray-500 hover:text-gray-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSelected(item);
                  }}
                />
              </div>
            ))
          ) : (
            <span className="text-gray-600">{label}</span>
          )}
        </div>

        {/* Arrow Icon (Right-Aligned & Clickable) */}
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
        <div className="absolute top-[100%] mt-1 bg-white shadow-lg border border-gray-200 rounded-lg w-full z-50 mb-4">
          {/* Search Bar */}
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

          {/* Options List (Scrollable) */}
          <ul className="max-h-60 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option}
                  className={`flex px-4 py-2 hover:bg-gray-100 cursor-pointer text-left ${
                    selected.includes(option) ? "bg-gray-200" : ""
                  }`}
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
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

export const Dropdown002 = ({ options, selectedValue, onSelect, label }) => {
 
  const dropdownOutsideClick = OutsideClick();
  const [selected, setSelected] = useState(selectedValue ||[]); // Store selected IDs
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
 
    if (selectedValue) {
      setSelected(selectedValue);
    }
  }, [selectedValue]);
  
  

  // Handle select/deselect option
  const handleOptionSelect = (option) => {
    let updatedSelection;
    const isAlreadySelected = selected?.includes(option.id);

    if (isAlreadySelected) {
      updatedSelection = selected?.filter((id) => id !== option.id);
    } else {
      updatedSelection = [...selected, option.id];
    }

    setSelected(updatedSelection);
    onSelect(updatedSelection); // Pass only IDs
  };

  // Remove selected item from list
  const removeSelected = (id) => {
    const updatedSelection = selected?.filter((selectedId) => selectedId !== id);
    setSelected(updatedSelection);
    onSelect(updatedSelection);
  };

  

  // Convert selected IDs to full option objects for display
  // const selectedOptions = options?.filter((option) => selected?.includes(option.id));
  const selectedOptions = options?.filter((option) => selected?.includes(option?.id) ?? false);


  return (
    <div className="relative w-[310px] sm:w-[350px] md:w-[400px] " ref={dropdownOutsideClick?.ref}>
      {/* Dropdown Header */}
      <div
        className="h-auto min-h-10 flex items-center gap-2 border border-[#0000004D] rounded-lg px-3 py-2 cursor-pointer w-full flex-wrap"
        ref={dropdownOutsideClick?.buttonRef}
        onClick={dropdownOutsideClick?.handleToggle}
      >
        <div className="flex items-center gap-2 flex-wrap">
       
          {/* Show selected items as pills */}
          {selectedOptions?.length > 0 ? (
            selectedOptions?.map((item) => (
              <div
                key={item.id}
                className={`flex items-center bg-gray-200 text-gray-600 rounded-md px-2 py-1 text-m ${selected ?"text-gray-700":""}`}
              >
                {`${item.first_name} ${item.last_name}`}
                <span
                  className="w-4 h-4 ml-2 cursor-pointer text-gray-500 hover:text-gray-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSelected(item.id);
                  }}
                >
                  ✕
                </span>
              </div>
            ))
          ) : (
            <span className="text-gray-600">{label}</span>
          )}
        </div>

        {/* Arrow Icon */}
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
        <div className="absolute top-[100%] mt-1 bg-white shadow-lg border border-gray-200 rounded-lg w-full z-50 mb-4">
          {/* Search Bar */}
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
              options
                .filter((option) =>
                  `${option.first_name} ${option.last_name}`
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
                )
                .map((option) => (
                  <li
                    key={option.id}
                    className={`flex px-4 py-2 hover:bg-gray-100 cursor-pointer text-left ${
                      selected?.includes(option.id) ? "bg-gray-200" : ""
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


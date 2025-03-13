import React from 'react';
import Tooltip from '@mui/material/Tooltip';

const SortBy = ({
    setSearchTrigger,
    selectedSortBy,
    setSelectedSortBy,
    sortOrder,
    setSortOrder,
    sortOptions,
    resetPageIfNeeded
}) => {

    const handleSort = (order) => {
        setSortOrder(order);
        setSelectedSortBy(sortOptions);
        resetPageIfNeeded();
        setSearchTrigger((prev) => prev + 1);
    };

    return (
        <span className="ml-2 flex flex-col gap-1">
            {/* Ascending Sort Button with Tooltip */}
            <Tooltip title="⬆ Sort Ascending" arrow disableInteractive>
                <button onClick={() => handleSort(1)}>
                    <svg
                        width="9"
                        height="6"
                        viewBox="0 0 9 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M7.80723 4.96777C7.80723 4.96777 5.16819 1.38447 4.22393 1.38447C3.27961 1.38447 0.640625 4.96777 0.640625 4.96777"
                            stroke={sortOrder === 1 ? "#6C757D" : "#320B57"}  // Active → Red, Inactive → Default Color
                            strokeWidth="0.895825"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </Tooltip>

            {/* Descending Sort Button with Tooltip */}
            <Tooltip title="⬇ Sort Descending" arrow disableInteractive>
                <button onClick={() => handleSort(2)}>
                    <svg
                        width="9"
                        height="6"
                        viewBox="0 0 9 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M7.80723 1.34375C7.80723 1.34375 5.16819 4.92705 4.22393 4.92705C3.27961 4.92705 0.640625 1.34375 0.640625 1.34375"
                            stroke={sortOrder === 2 ? "#6C757D" : "#320B57"}  // Active → Red, Inactive → Default Color
                            strokeWidth="0.895825"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </Tooltip>
        </span>
    );
};

export default SortBy;
// 
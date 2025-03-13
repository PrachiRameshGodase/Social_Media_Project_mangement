"use client";
import React from "react";

const TableSkeleton = ({ rows = 5, columns = 4 }) => {
    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        {Array.from({ length: columns }).map((_, index) => (
                            <th key={index} className="p-3">
                                <div className="h-4 bg-gray-300 rounded w-24 animate-pulse"></div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: rows }).map((_, rowIndex) => (
                        <tr key={rowIndex} className="border-t">
                            {Array.from({ length: columns }).map((_, colIndex) => (
                                <td key={colIndex} className="p-3">
                                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableSkeleton;

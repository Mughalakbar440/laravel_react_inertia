import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";
import React, { Children } from "react";

const TableHeading = ({ name, sortable = true, sort_field = null,children, sort_direction = null, sortChanged = ()=>{}}) => {

    return (
        <th onClick={() => sortChanged(name)} className="cursor-pointer">
            <div className="py-3 px-3 flex items-center justify-between">
                {children}
                {sortable && (
                    <div className="flex flex-col items-center">
                        <ChevronUpIcon
                            className={`w-4 ${sort_field === name && sort_direction === "asc" ? "text-white" : "text-gray-400"}`}
                        />
                        <ChevronDownIcon
                            className={`w-4 ${sort_field === name && sort_direction === "desc" ? "text-white" : "text-gray-400"}`}
                        />
                    </div>
                )}
            </div>
        </th>
    );
};

export default TableHeading;

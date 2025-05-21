import PropTypes from "prop-types";
import { Dropdown, DropdownItem, DropdownDivider } from "flowbite-react";
import { Checkbox } from "flowbite-react"; // If you're using Flowbite's Checkbox component
import { IoFilter } from "react-icons/io5";

export function ColumnFilterDropdown({ tableHeadings, visibleColumns, toggleColumnVisibility, toggleAllColumnsVisibility }) {
  return (
    <Dropdown  className="max-h-[15rem] md:max-h-[20rem] overflow-auto ml-10 md:ml-16" color="success" label={
      <div className="flex items-center gap-2">
        <IoFilter className="w-5 h-5" />
        <span className="hidden md:block">Filters</span>
      </div>
    }  
    dismissOnClick={false}>
    {/* Select All Checkbox */}
      <Dropdown.Item>
        <label className="flex w-full items-center space-x-2 cursor-pointer">
          <Checkbox
            color="success"
            checked={visibleColumns.every(Boolean)} // Check if all columns are visible
            onChange={toggleAllColumnsVisibility} // Toggle visibility of all columns
          />
          <span className="text-sm text-gray-700">All</span>
        </label>
      </Dropdown.Item>

      <DropdownDivider />

      {/* Individual Column Checkbox */}
      {tableHeadings.map((heading, index) => (
        <DropdownItem key={index}>
          <label className="flex w-full items-center space-x-2 cursor-pointer">
            <Checkbox
              color="success"
              checked={visibleColumns[index]} // Check if this column is visible
              onChange={() => toggleColumnVisibility(index)} // Toggle visibility of this column
            />
            <span className="text-sm text-gray-700">{heading}</span>
          </label>
        </DropdownItem>
      ))}
    </Dropdown>
  );
}

// SETTING THE PROPERTIES DATA TYPES
ColumnFilterDropdown.propTypes = {
  tableHeadings: PropTypes.arrayOf(PropTypes.string).isRequired,
  visibleColumns: PropTypes.arrayOf(PropTypes.bool).isRequired,
  toggleColumnVisibility: PropTypes.func.isRequired,
  toggleAllColumnsVisibility: PropTypes.func.isRequired,
};

import PropTypes from "prop-types";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { Table, Checkbox, Button, Select } from "flowbite-react";
import { LuPin, LuPinOff } from "react-icons/lu";
import { ColumnFilterDropdown } from "@/components/ui/ColumnFilterDropdown";
import SearchBar from "@/components/ui/SearchBar";
import { FaSortAlphaUp ,FaSortAlphaDown  } from "react-icons/fa";
// import AuthService from "@/services/authService";

export function TableComponent({
  table_id,
  tableHeadings = [],
  tableContent = [],
  deleteButton,
  editButton,
  deleteAllButton,
  onEditClick,
  onDeleteClick,
  onExportRef,
}) {
  //For column width
  const STORAGE_KEYS = {
    widths: (id) => `${id}_columnWidths`,
    sticky: (id) => `${id}_stickyHeader`,
  };
  //USE-STATE VARIABLES
  const [checkedRows, setCheckedRows] = useState({});
  const [checkAll, setCheckAll] = useState(false);
  const [selectedRowsCount, setSelectedRowsCount] = useState(0);
  const [visibleColumns, setVisibleColumns] = useState(() =>tableHeadings.map(() => true));
  const [filteredTableContent, setFilteredTableContent] = useState(tableContent);
  const [currentPage, setCurrentPage] = useState(1);
  const [stickyRow, setStickyRow] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.sticky(table_id));
    return stored === "true";
  });
  const [columnWidths, setColumnWidths] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.widths(table_id));
    return saved ? JSON.parse(saved) : tableHeadings.map(() => 150);
  });
  const [rowsPerPage, setRowsPerPage] = useState(10);
  //Function to handle the number of selected Rows
  const handlePerPageChange = (e) => {
    const selectedPageNumber = Number(e.target.value);
    setRowsPerPage(selectedPageNumber);
  }
  //use state for sorting
  const [sortConfig, setSortConfig] = useState({ columnIndex: null, direction: null });
 
  //Rows per page
  const tableRef = useRef(null);
  //Resize
  const resizeRef = useRef({ index: null, startX: 0 });

  //Storing or Persisting rows width to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.widths(table_id), JSON.stringify(columnWidths));
  });
  
  //Effect for filtering table content
  useEffect(() => {
    setCheckedRows(new Array(tableContent.length).fill(false));
    setFilteredTableContent(tableContent);
  }, [tableContent]);

  //Effect to count number of selected rows
  useEffect(() => {
    const count = Object.values(checkedRows).filter(Boolean).length;
    setSelectedRowsCount(count);
  }, [checkedRows]);

    //For pagination
    const totalPages = Math.ceil(filteredTableContent.length / rowsPerPage);

    const paginatedContent = useMemo(() => {
      const start = (currentPage - 1) * rowsPerPage;
      return filteredTableContent.slice(start, start + rowsPerPage);
    }, [filteredTableContent, currentPage, rowsPerPage]);
  
    const visibleColumnIndexes = visibleColumns
      .map((visible, index) => (visible ? index : null))
      .filter((i) => i !== null);
    
      useEffect(() => {
        const isIndeterminate = selectedRowsCount > 0 && selectedRowsCount < paginatedContent.length;
        if (tableRef.current) {
          const checkbox = tableRef.current.querySelector('thead input[type="checkbox"]');
          if (checkbox) checkbox.indeterminate = isIndeterminate;
        }
      }, [selectedRowsCount, paginatedContent.length]);

  //Function for search
  const handleSearch = (query) => {
    if (!query) {
      setFilteredTableContent(tableContent);
      return;
    }
    const lowerQuery = query.toLowerCase();
    const filtered = tableContent.filter((row) =>
      row.some(
        (cell) =>
          typeof cell === "string" && cell.toLowerCase().includes(lowerQuery)
      )
    );
    setFilteredTableContent(filtered);
    setCurrentPage(1);
  };
  //Function to toggle single columns in filtering
  const toggleColumnVisibility = (index) => {
    const updated = [...visibleColumns];
    updated[index] = !updated[index];
    setVisibleColumns(updated);
  };
 //Function to toggle all columns in filtering
  const toggleAllColumnsVisibility = () => {
    const newState = visibleColumns.every(Boolean)
      ? new Array(tableHeadings.length).fill(false)
      : new Array(tableHeadings.length).fill(true);
    setVisibleColumns(newState);
  };

  const handleRowCheck = (rowKey) => {
    setCheckedRows((prev) => ({...prev,[rowKey]: !prev[rowKey],}));
  };

  const handleCheckAllChange = (e) => {
    const isChecked = e.target.checked;
    setCheckAll(isChecked);
    const newChecked = { ...checkedRows };
    filteredTableContent.forEach((row) => {
      newChecked[row[0]] = isChecked;
    });    
  setCheckedRows(newChecked);
  };
  //For auto-update the checkbox state when switching pages
  useEffect(() => {
    const currentPageKeys = paginatedContent.map((row) => row[0]);
    const allChecked = currentPageKeys.every((key) => checkedRows[key]);
    setCheckAll(allChecked);
  }, [paginatedContent, checkedRows]);
  
  //Function to handle column resizing
  const handleColumnResizeStart = (e, index) => {
    resizeRef.current = { index, startX: e.clientX };
    document.addEventListener("mousemove", handleColumnResize);
    document.addEventListener("mouseup", stopColumnResize);
  };

  const handleColumnResize = (e) => {
    const { index, startX } = resizeRef.current;
    const deltaX = e.clientX - startX;
    setColumnWidths((prevWidths) => {
      const newWidths = [...prevWidths];
      newWidths[index] = Math.max(60, newWidths[index] + deltaX);
      return newWidths;
    });
    resizeRef.current.startX = e.clientX;
  };

  const stopColumnResize = () => {
    document.removeEventListener("mousemove", handleColumnResize);
    document.removeEventListener("mouseup", stopColumnResize);
  };

  const handleColumnReset = (index) => {
    setColumnWidths((prev) => {
      const updated = [...prev];
      updated[index] = 150;
      return updated;
    });
    // optional: trigger small animation class
  }

  //Function for sorting - handle header clicks:
  const handleSort = (index) => {
    setSortConfig((prev) => {
      if (prev.columnIndex === index) {
        const newDirection = prev.direction === "asc" ? "desc" : "asc";
        return { columnIndex: index, direction: newDirection };
      } else {
        return { columnIndex: index, direction: "asc" };
      }
    });
  };
  //useEffect that sets data after sorting:
  useEffect(() => {
    let sorted = [...tableContent];
    if (sortConfig.columnIndex !== null) {
      sorted.sort((a, b) => {
        const valA = a[sortConfig.columnIndex];
        const valB = b[sortConfig.columnIndex];
      if (typeof valA === "string" && typeof valB === "string") {
          return sortConfig.direction === "asc" ? valA.localeCompare(valB): valB.localeCompare(valA);
        }
        if (typeof valA === "number" && typeof valB === "number") {
          return sortConfig.direction === "asc" ? valA - valB : valB - valA;
        }
        return 0;
      });
    }
  
    setFilteredTableContent(sorted);
  }, [tableContent, sortConfig]);  
     
    //using useEffect to expose handleExport function to parent
    useEffect(() => {
      //Function to handle selected data in table to be exported
      const handleExport = () => {
        const selectedData = filteredTableContent.filter(
          (row) => checkedRows[row[0]]
          );
          return selectedData;
      };
      if (onExportRef) {
        onExportRef(handleExport);
      }
    },[onExportRef, filteredTableContent, checkedRows])

  return (
    <main>
      <div className="flex md:justify-between flex-col md:flex-row gap-4 my-4">
        <div className="flex gap-4">
          <ColumnFilterDropdown
            tableHeadings={tableHeadings}
            visibleColumns={visibleColumns}
            toggleColumnVisibility={toggleColumnVisibility}
            toggleAllColumnsVisibility={toggleAllColumnsVisibility}
          />
          {selectedRowsCount > 1 && deleteAllButton }
        </div>
        <SearchBar
          className = "max-w-md"
          onSearch={handleSearch}
          placeholder="Search by name, email, etc."
        />
      </div>

      <div className="overflow-x-auto" ref={tableRef}>
        <Table hoverable striped id={table_id}>
          <Table.Head>
            <Table.HeadCell className="text-center bg-green-600 text-white border-r-[1px] border-gray-50">
              <Checkbox
                checked={checkAll}
                onChange={handleCheckAllChange}
                color="success"
              />
            </Table.HeadCell>
            {tableHeadings.map((heading, index) =>
              visibleColumns[index] ? (
                <Table.HeadCell
                  key={index}
                  className={`relative ${sortConfig.columnIndex === index ? "bg-green-800": "bg-green-600"} text-white font-semibold text-center whitespace-nowrap overflow-hidden overflow-ellipsis border-r-[1px] border-gray-50`}
                  style={{
                    width: columnWidths[index],
                    maxWidth: columnWidths[index],
                  }}
                  onDoubleClick={()=>handleColumnReset(index)}
                >
                  <div className="flex justify-between items-center">
                    <span 
                      onClick={() => handleSort(index)}
                      className="w-full overflow-hidden text-ellipsis cursor-pointer flex justify-center items-center gap-1"
                      title={`Click to sort by ${heading}`}>
                      {heading}
                      {sortConfig.columnIndex === index && (
                        <span>{sortConfig.direction === "asc" ? <FaSortAlphaUp className="h-5 w-5"/> : <FaSortAlphaDown className="h-5 w-5"/>}</span>
                      )}
                    </span>
                    <div
                      className="absolute top-0 right-0 h-full w-2 cursor-col-resize z-10 hover:bg-green-400 transition-all"
                      onMouseDown={(e) => handleColumnResizeStart(e, index)}
                      onDoubleClick={() => {
                        setColumnWidths((prev) => {
                          const updated = [...prev];
                          updated[index] = 150;
                          return updated;
                        });
                      }}
                    />
                  </div>
                </Table.HeadCell>
              ) : null
            )}
            { (editButton || deleteButton) && (
            <Table.HeadCell className={`text-center bg-green-600 text-white ${stickyRow ? 'sticky z-20 right-0 border-l-gray-50 shadow-xl' : ''}`}>
              <span className="flex items-center justify-between">
                Action
                {stickyRow ? (
                  <LuPin
                    className="h-5 w-5 cursor-pointer"
                    onClick={() => {
                      setStickyRow(false);
                      localStorage.setItem(STORAGE_KEYS.sticky(table_id), "false");
                    }}
                  />
                ) : (
                  <LuPinOff
                    className="h-5 w-5 cursor-pointer"
                    onClick={() => {
                      setStickyRow(true);
                      localStorage.setItem(STORAGE_KEYS.sticky(table_id), "true");
                    }}
                  />
                )}
              </span>
            </Table.HeadCell>)
          }
          </Table.Head>

          <Table.Body className="divide-y">
            {paginatedContent.length > 0 ? (
              paginatedContent.map((row, index) => {
                const actualIndex = (currentPage - 1) * rowsPerPage + index;
                return (
                  <Table.Row key={actualIndex} className="bg-white text-base">
                    <Table.Cell>
                      <Checkbox
                        className="mb-1"
                        checked={!!checkedRows[row[0]]}
                        onChange={() => handleRowCheck(row[0])}
                        color="success"
                      />
                    </Table.Cell>
                    {visibleColumnIndexes.map((cellIndex) => (
                      <Table.Cell
                        className="text-center overflow-hidden whitespace-nowrap overflow-ellipsis"
                        key={cellIndex}
                        style={{
                          width: columnWidths[cellIndex],
                          maxWidth: columnWidths[cellIndex],
                        }}
                      >
                        {row[cellIndex]}
                      </Table.Cell>
                    ))}
                    {(editButton || deleteButton) && ( 
                    <Table.Cell
                      className={`${
                        stickyRow ? "sticky right-0 z-10 bg-white border-l-2 shadow-2xl" : ""
                      }`}
                    >
                      <div className="flex gap-2 items-center justify-center">
                        {deleteButton && React.cloneElement(deleteButton, {onClick: () => onDeleteClick(row),})}
                        {editButton && React.cloneElement(editButton, {onClick: () => onEditClick(row),})}
                      </div>
                    </Table.Cell>)
                    }
                  </Table.Row>
                );
              })
            ) : (
              <Table.Row>
                <Table.Cell
                  colSpan={visibleColumnIndexes.length + 2}
                  className="text-center py-4"
                >
                  No records available
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
            {/* Buttom Rows  */}
        <div className="flex justify-between md:justify-end items-center gap-2 mt-4">
          <Select color="success" className="p-0" name="gender" value={rowsPerPage} onChange={handlePerPageChange} >
            <option value= {5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={25}>25</option>
          </Select>
          <Button
            className = "p-0"
            gradientMonochrome="success"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Prev
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            className = "p-0"
            gradientMonochrome="success"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          >
            Next
          </Button>
        </div>
    </main>
  );
}

TableComponent.propTypes = {
  table_id: PropTypes.string,
  tableHeadings: PropTypes.arrayOf(PropTypes.string),
  tableContent: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.node])
    )
  ),
  deleteButton: PropTypes.node,
  editButton: PropTypes.node,
  deleteAllButton: PropTypes.node,
  onEditClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  onExportRef: PropTypes.func
};

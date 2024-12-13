import React, { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import Loading from "./UI/Loading";

const DataTable = ({
  columns,
  fetchData,
  currentPage = 1,
  onPageChange,
  onRecordsPerPageChange,
  recordsPerPage = 50,
  searchTerm = "",
  onSearchChange,
  isSearchable = true,
  isPagination = true,
  isPageSize = true,
  isLoading = false,
}) => {
  const { data, pages } = fetchData({
    searchTerm,
    recordsPerPage,
    currentPage,
  });

  const indexedColumns = useMemo(
    () => [
      {
        id: "index",
        header: "#",
        cell: ({ row }) => row.index + 1 + (currentPage - 1) * recordsPerPage,
      },
      ...columns,
    ],
    [columns, currentPage, recordsPerPage]
  );

  const table = useReactTable({
    columns: indexedColumns,
    data: data || [],
    getCoreRowModel: getCoreRowModel(),
  });

  const handleRecordsPerPageChange = (event) => {
    onRecordsPerPageChange(Number(event.target.value));
    onPageChange(1); // Reset to first page when records per page changes
  };

  const handleSearch = (event) => {
    onSearchChange(event.target.value);
    onPageChange(1); // Reset to first page when search term changes
  };

  const renderPageNumbers = () => {
    const visiblePages = 5; // Number of visible page buttons
    const pagesToShow = [];

    let startPage = Math.max(currentPage - Math.floor(visiblePages / 2), 1);
    let endPage = Math.min(startPage + visiblePages - 1, pages);

    if (endPage - startPage + 1 < visiblePages) {
      startPage = Math.max(endPage - visiblePages + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pagesToShow.push(
        <button
          key={i}
          className={`btn ${
            i === currentPage ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }

    return pagesToShow;
  };

  return (
    <>
      {/* Search and Records Per Page Controls */}
      {(isPageSize || isPagination) && (
        <div className="d-flex justify-content-between mb-3">
          {isPageSize && (
            <select
              className="form-select table_curt_select"
              value={recordsPerPage}
              onChange={handleRecordsPerPageChange}
            >
              <option value={50}>50</option>
              <option value={75}>75</option>
              <option value={100}>100</option>
              <option value={200}>200</option>
            </select>
          )}

          {isSearchable && (
            <input
              type="text"
              className="form-control table_curt_Search "
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
            />
          )}
        </div>
      )}

      {/* Table */}
      {data ? (
        <div className="table-responsive">
          <table className="table table-striped table-auto">
            <thead className="table-light">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header, index) => (
                    <th key={index}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={indexedColumns.length} className="text-center">
                    <Loading />
                  </td>
                </tr>
              ) : data && data.length === 0 ? (
                <tr>
                  <td colSpan={indexedColumns.length} className="text-center">
                    No records found
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row, index) => (
                  <tr key={index}>
                    {row.getVisibleCells().map((cell, index1) => (
                      <td key={index1}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        "No Record"
      )}

      {/* Pagination Controls */}
      {isPagination && (
        <div className="pagination  page_ageChange_box ">
          {/* First and Previous */}
          <button
            className="btn btn-outline-primary"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
          >
            First
          </button>
          <button
            className="btn btn-outline-primary "
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>

          {/* Page Numbers */}
          {renderPageNumbers()}

          {/* Next and Last */}
          <button
            className="btn btn-outline-primary "
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === pages}
          >
            &gt;
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={() => onPageChange(pages)}
            disabled={currentPage === pages}
          >
            Last
          </button>
        </div>
      )}
    </>
  );
};

export default DataTable;

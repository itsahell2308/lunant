import { debounce, values } from "lodash";
import React, { useCallback, useState } from "react";
import { getOddEven } from "../../Services/game/oddEvenService";
import { useQuery } from "@tanstack/react-query";

import { dateFormat } from "../../helper/common";
import { useSelector } from "react-redux";
import { DataTable, SubHeading } from "../../Components";

const OddEven = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(50);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const { user } = useSelector((state) => state.user);

  const debouncedSearch = useCallback(
    debounce((value) => {
      setDebouncedValue(value);
    }, 1000),
    []
  );

  const payload = {
    draw: currentPage,
    columns: [
      {
        data: "",
        name: "",
        searchable: true,
        orderable: false,
        search: {
          value: "",
          regex: false,
        },
      },
      {
        data: "fancyName",
        name: "",
        searchable: true,
        orderable: true,
        search: {
          value: "",
          regex: false,
        },
      },
      {
        data: "match.name",
        name: "",
        searchable: true,
        orderable: true,
        search: {
          value: "",
          regex: false,
        },
      },
      {
        data: "createdAt",
        name: "",
        searchable: true,
        orderable: true,
        search: {
          value: "",
          regex: false,
        },
      },
      {
        data: "marketStartTime",
        name: "",
        searchable: true,
        orderable: true,
        search: {
          value: "",
          regex: false,
        },
      },
      {
        data: "isActive",
        name: "",
        searchable: true,
        orderable: true,
        search: {
          value: "",
          regex: false,
        },
      },
      {
        data: "isActive",
        name: "",
        searchable: true,
        orderable: true,
        search: {
          value: "",
          regex: false,
        },
      },
      {
        data: "allowBat",
        name: "",
        searchable: true,
        orderable: true,
        search: {
          value: "",
          regex: false,
        },
      },
      {
        data: "assignTo",
        name: "",
        searchable: true,
        orderable: true,
        search: {
          value: "",
          regex: false,
        },
      },
      {
        data: "fancyModeType",
        name: "",
        searchable: true,
        orderable: true,
        search: {
          value: "",
          regex: false,
        },
      },
      {
        data: "displayOrder",
        name: "",
        searchable: true,
        orderable: true,
        search: {
          value: "",
          regex: false,
        },
      },
    ],
    order: [
      {
        column: 0,
        dir: "",
      },
    ],
    start: (currentPage - 1) * recordsPerPage,
    length: recordsPerPage,
    search: {
      value: debouncedValue,
      regex: false,
    },
    id: user?.user_id,
    userId: "",
    matchName: "",
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRecordsperPage = (value) => {
    setRecordsPerPage(value);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["oddEvenData", currentPage, recordsPerPage, debouncedValue],
    queryFn: async () => await getOddEven({ payload }),
  });

  const fetchData = () => {
    if (!data) return { data: [], pages: 0 };

    return {
      data: data.docs,
      pages: data.pages,
    };
  };

  const columns = [
    {
      accessorKey: "fancyName",
      header: "Name",
    },
    {
      accessorKey: "match.name",
      header: "Name",
      cell: ({ getValue }) =>
        getValue()
          ?.replace(/\s*\(.*?\)/, "")
          .trim(),
    },
    {
      accessorKey: "createdAt",
      header: "Created Time",
      cell: ({ getValue }) => {
        const value = getValue();
        return dateFormat(value);
      },
    },
    {
      accessorKey: "marketStartTime",
      header: "Matched Time",
      cell: ({ getValue }) => {
        const value = getValue();
        return dateFormat(value);
      },
    },
    {
      accessorKey: "marketStatus.name",
      header: "Status",
    },
    {
      accessorKey: "isActive",
      header: "Is Active",
      cell: ({ getValue }) => (
        <div className="form-check form-switch form-switch-success">
          <input
            className="form-check-input"
            type="checkbox"
            checked={getValue()}
            onChange={() => console.log("Checkbox toggled!")}
          />
        </div>
      ),
    },
    {
      accessorKey: "allowBat",
      header: "Allow Bet",
      cell: ({ getValue }) => (
        <div className="form-check form-switch form-switch-success">
          <input
            className="form-check-input"
            type="checkbox"
            checked={getValue()}
            onChange={() => console.log("Checkbox toggled!")}
          />
        </div>
      ),
    },
    {
      accessorKey: "fancyModeType",
      header: "Type",
    },
    {
      accessorKey: "assignTo.name",
      header: "Assign TO",
    },
    {
      accessorKey: "displayOrder",
      header: "Display Order",
    },
  ];

  return (
    <>
      <SubHeading title="odd even list" />
      <div className="card-body">
        <DataTable
          columns={columns}
          fetchData={fetchData}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onRecordsPerPageChange={handleRecordsperPage}
          recordsPerPage={recordsPerPage}
          onSearchChange={handleSearch}
          searchTerm={searchTerm}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default OddEven;

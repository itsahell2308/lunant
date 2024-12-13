import React, { useCallback, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";

import { dateFormat } from "../../helper/common";
import { getLine } from "../../Services/game/lineService";
import { useSelector } from "react-redux";
import { DataTable, SubHeading } from "../../Components";

const Line = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(50);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useSelector((state) => state.user);
  const [debouncedValue, setDebouncedValue] = useState("");

  const debouncedSearch = useCallback(
    debounce((value) => {
      setDebouncedValue(value);
    }, 1000),
    []
  );

  const payload = useMemo(() => {
    return {
      draw: currentPage,
      length: recordsPerPage,
      search: {
        value: debouncedValue,
        regex: false,
      },
      id: user?.user_id,
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
    };
  }, [currentPage, recordsPerPage, debouncedValue]);

  const { data, isLoading } = useQuery({
    queryKey: ["lineData", currentPage, recordsPerPage, debouncedValue],
    queryFn: async () => await getLine({ payload }),
  });

  const columns = useMemo(
    () => [
      {
        accessorKey: "fancyName",
        header: "Line Name",
      },
      {
        accessorKey: "match.name",
        header: "Matches",
      },
      {
        accessorKey: "isActive",
        header: "isActive",
        cell: ({ getValue }) => (
          <div className="form-check form-switch form-switch-success">
            <input
              className="form-check-input"
              type="checkbox"
              checked={getValue()}
              onChange={() => console.log(123)}
            />
          </div>
        ),
      },
      {
        accessorKey: "allowBat",
        header: "Allow Bat",
        cell: ({ getValue }) => (
          <div className="form-check form-switch form-switch-success">
            <input
              className="form-check-input"
              type="checkbox"
              checked={getValue()}
              onChange={() => console.log(123)}
            />
          </div>
        ),
      },
      {
        accessorKey: "displayOrder",
        header: "Display Order",
        cell: ({ getValue, row }) => (
          <div className="d-flex align-items-center">
            <input
              className="form-control input_cuter_box "
              type="text"
              value={row?.original?.displayOrder}
              id="example-text-input"
            ></input>
            <div className="form-check form-switch form-switch-success">
              <input
                className="form-check-input"
                type="checkbox"
                checked={getValue()}
                onChange={() => console.log(123)}
              />
            </div>
          </div>
        ),
      },
      {
        accessorKey: "assignTo.username",
        header: "AssignTo",
      },
      {
        accessorKey: "marketStatus.name",
        header: "Status",
        cell: ({ getValue }) => {
          const value = getValue();
          const flag = value ? "success" : "danger";
          return (
            <span className={`badge bg-${flag}-subtle text-${flag}`}>
              {value ? "OPEN" : "CLOSE"}
            </span>
          );
        },
      },
      {
        accessorKey: "marketStartTime",
        header: "Match Date",
        cell: ({ row }) => dateFormat(row.original.marketStartTime),
      },
      {
        accessorKey: "createdAt",
        header: "Created Date",
        cell: ({ row }) => dateFormat(row.original.createdAt),
      },
      {
        accessorKey: "fancyModeType",
        header: "Type",
        cell: ({ getValue }) => (
          <span className={`badge bg-primary-subtle text-primary`}>
            {getValue()}
          </span>
        ),
      },
    ],
    []
  );

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

  const fetchData = () => {
    if (!data) return { data: [], pages: 0 };

    return {
      data: data?.docs || [],
      pages: data?.pages || 0,
    };
  };

  return (
    <>
      <SubHeading title="line list" />
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

export default Line;

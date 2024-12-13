import React, { useCallback, useState } from "react";
import {
  editMarket,
  getMarket,
  putApiMarket,
} from "../../Services/game/marketServices";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { debounce } from "lodash";
import { dateFormat } from "../../helper/common";
import { useSelector } from "react-redux";
import { DataTable, SubHeading, Switch, TruFalseBadge } from "../../Components";
import { API_UPDATE_MARKET } from "../../utils/api/ApiConstant";

const Market = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(50);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [startRecord, setStartRecord] = useState(0);
  const queryClient = useQueryClient();
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
        data: "marketType",
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
        data: "marketType",
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
        data: "fancyMode",
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
        data: "createdAt",
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
    start: startRecord,
    length: recordsPerPage,
    search: {
      value: debouncedValue,
      regex: false,
    },
    userId: user?.user_id,
    matchName: "",
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setStartRecord((page - 1) * recordsPerPage);
  };

  const handleRecordsperPage = (value) => {
    setRecordsPerPage(value);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const { data, isLoading } = useQuery({
    queryKey: [
      "marketData",
      currentPage,
      recordsPerPage,
      debouncedValue,
      startRecord,
    ],
    queryFn: async () => await getMarket({ payload }),
  });

  const fetchData = () => {
    if (!data) return { data: [], pages: 0 };

    return {
      data: data.docs,
      pages: data.pages,
    };
  };

  const handleQueryClient = (rowData, updatedRowData, key) => {
    return queryClient.setQueryData(
      ["marketData", currentPage, recordsPerPage, debouncedValue, startRecord],
      (oldData) => {
        return {
          ...oldData,
          docs: oldData.docs.map((match) =>
            match._id === rowData._id
              ? { ...match, [key]: updatedRowData[key] }
              : match
          ),
        };
      }
    );
  };

  const handlePutRequest = async (apiUrl, rowData, newValue, key) => {
    const updatedRowData = {
      ...rowData,
      [key]: newValue,
    };
    const url = `${apiUrl}/${rowData?._id}`;

    const res = await putApiMarket(url, updatedRowData);

    if (res) {
      handleQueryClient(rowData, updatedRowData, key);
    }
  };

  const columns = [
    {
      accessorKey: "marketType",
      header: "Market",
      cell: ({ row }) => {
        const marketType = row.original.marketType;
        const fancyName = row.original.fancyName;
        return marketType === "Fancy" ? fancyName : marketType;
      },
    },
    {
      accessorKey: "match.name",
      header: "Match",
      cell: ({ getValue }) =>
        getValue()
          ?.replace(/\s*\(.*?\)/, "")
          .trim(),
    },
    {
      accessorKey: "marketType",
      header: "Type",
    },
    {
      accessorKey: "isActive",
      header: "Is Active",
      cell: ({ getValue, row }) => (
        <Switch
          getValue={getValue}
          onChange={() => {
            handlePutRequest(
              API_UPDATE_MARKET,
              row?.original,
              !getValue(),
              "isActive"
            );
          }}
        />
      ),
    },
    {
      accessorKey: "allowBat",
      header: "Allow Bet",
      cell: ({ getValue, row }) => (
        <Switch
          getValue={getValue}
          onChange={() => {
            handlePutRequest(
              API_UPDATE_MARKET,
              row?.original,
              !getValue(),
              "allowBat"
            );
          }}
        />
      ),
    },
    {
      accessorKey: "marketStatus.name",
      header: "Status",
      cell: ({ getValue, row }) => (
        <TruFalseBadge getValue={() => getValue()} />
      ),
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
      accessorKey: "createdAt",
      header: "Created Time",
      cell: ({ getValue }) => {
        const value = getValue();
        return dateFormat(value);
      },
    },
  ];

  return (
    <>
      <SubHeading title="market list" isAddBtn={false} />
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

export default Market;

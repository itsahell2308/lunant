import React, { useCallback, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { debounce } from "lodash";

import { getFancy } from "../../Services/game/fancyServices";
import { dateFormat } from "../../helper/common";
import {
  DataTable,
  DisplayOrder,
  OpenCloseBadge,
  StaticBadge,
  SubHeading,
  Switch,
} from "../../Components";
import { editMarket } from "../../Services/game/marketServices";
import { CommonModal, FancyModal } from "../../Modal";

const Fancy = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(50);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const queryClient = useQueryClient();
  const [isShow, setIsShow] = useState({
    isOpen: false,
    rowData: null,
    name: "",
    modalTitle: "",
    modalContent: null,
  });

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
      id: "5ebc1code68br4bik5b1808",
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

  const { isLoading, data } = useQuery({
    queryKey: ["fancyData", currentPage, recordsPerPage, debouncedValue],
    queryFn: async () => await getFancy({ payload }),
  });

  const handleQueryClient = (rowData, updatedRowData, key) => {
    return queryClient.setQueryData(
      ["fancyData", currentPage, recordsPerPage, debouncedValue],
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

  const handlePutRequest = async (rowData, newValue, key) => {
    const updatedRowData = {
      ...rowData,
      [key]: newValue,
    };

    const response = await editMarket(updatedRowData._id, updatedRowData);

    if (response) {
      handleQueryClient(rowData, updatedRowData, key);
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "fancyName",
        header: "Fancy Name",
      },
      {
        accessorKey: "match.name",
        header: "Matches",
      },
      {
        accessorKey: "isActive",
        header: "isActive",
        cell: ({ getValue, row }) => {
          return (
            <Switch
              getValue={getValue}
              onChange={() => {
                handlePutRequest(row?.original, !getValue(), "isActive");
              }}
            />
          );
        },
      },
      {
        accessorKey: "allowBat",
        header: "Allow Bat",
        cell: ({ getValue, row }) => {
          return (
            <Switch
              getValue={getValue}
              onChange={() => {
                handlePutRequest(row?.original, !getValue(), "allowBat");
              }}
            />
          );
        },
      },
      {
        accessorKey: "displayOrder",
        header: "Display Order",
        cell: ({ row }) => {
          const initialValue = row.original.displayOrder;

          return (
            <DisplayOrder
              initialValue={initialValue}
              onConfirm={(newValue) => {
                handlePutRequest(row?.original, newValue, "displayOrder");
              }}
            />
          );
        },
      },
      {
        accessorKey: "assignTo.username",
        header: "AssignTo",
      },
      {
        accessorKey: "marketStatus.name",
        header: "Status",
        cell: ({ getValue }) => {
          return <OpenCloseBadge getValue={getValue} />;
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
        cell: ({ getValue }) => <StaticBadge getValue={getValue} />,
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
      <SubHeading
        title="fancy list"
        handleShowHide={() =>
          setIsShow((prev) => ({
            ...prev,
            isOpen: open,
            rowData: {},
            name: "add",
            modalTitle: "Add Fancy",
            modalContent: FancyModal,
          }))
        }
      />
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

      <CommonModal
        isShow={isShow.isOpen}
        handleShowHide={() =>
          setIsShow((prev) => ({
            ...prev,
            isOpen: false,
            rowData: {},
            name: "",
          }))
        }
        modalTitle={isShow.modalTitle}
      >
        {isShow.modalContent &&
          React.createElement(isShow.modalContent, {
            handleShowHide: () =>
              setIsShow((prev) => ({
                ...prev,
                isOpen: false,
                rowData: {},
                name: "",
                modalTitle: "",
              })),
            rowData: isShow.rowData,
          })}
      </CommonModal>
    </>
  );
};

export default Fancy;

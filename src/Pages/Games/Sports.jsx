import React, { useCallback, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { debounce } from "lodash";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getAllSports,
  postApiSport,
  putApiSport,
} from "../../Services/game/sportService";
import { DataTable, DisplayOrder, SubHeading } from "../../Components";
import {
  CheckPasswordModal,
  CommonModal,
  ConfimationModal,
  SportModal,
} from "../../Modal";
import { API_GET_SPORT, API_UPDATE_SPORT } from "../../utils/api/ApiConstant";
import { featureActions } from "../../store/feature/feature-slice";
import { uiActions } from "../../store/ui/ui-slice";

const Sports = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(50);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const dispatch = useDispatch();
  const { sport } = useSelector((state) => state.feature);
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

  const payload = {
    draw: currentPage,
    length: recordsPerPage,
    search: {
      value: debouncedValue,
      regex: false,
    },
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
        data: "name",
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
        data: "betLock",
        name: "",
        searchable: true,
        orderable: true,
        search: {
          value: "",
          regex: false,
        },
      },
      {
        data: "isManual",
        name: "",
        searchable: true,
        orderable: true,
        search: {
          value: "",
          regex: false,
        },
      },
      {
        data: "isView",
        name: "",
        searchable: true,
        orderable: true,
        search: {
          value: "",
          regex: false,
        },
      },
      {
        data: "autoImport",
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

  const { isLoading, data } = useQuery({
    queryKey: ["sportData", currentPage, recordsPerPage, debouncedValue],
    queryFn: async () => await getAllSports(API_GET_SPORT, payload),
  });

  const handleQueryClient = (rowData, updatedRowData, key) => {
    return queryClient.setQueryData(
      ["sportData", currentPage, recordsPerPage, debouncedValue],
      (oldData) => {
        return {
          ...oldData,
          docs: oldData.docs.map((obj) =>
            obj._id === rowData._id
              ? { ...obj, [key]: updatedRowData[key] }
              : obj
          ),
        };
      }
    );
  };

  const handlePutRequest = async (rowData, value, key) => {
    const payload = { ...rowData, [key]: value };
    const url = `${API_UPDATE_SPORT}/${rowData?._id}`;
    const res = await putApiSport(url, payload);

    if (res) {
      handleQueryClient(rowData, payload, key);
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Sports",
        cell: ({ getValue, row }) => (
          <Link to={`/eventmaster/tournaments/${row?.original?.id}`}>
            {getValue()}
          </Link>
        ),
      },
      {
        accessorKey: "isActive",
        header: "Is Active",
        cell: ({ getValue, row }) => (
          <ConfimationModal
            getValue={() => getValue()}
            onStatusChange={(newValue) =>
              handlePutRequest(row?.original, newValue, "isActive")
            }
          />
        ),
      },
      {
        accessorKey: "betLock",
        header: "Bet Lock",
        cell: ({ getValue, row }) => (
          <ConfimationModal
            getValue={() => getValue()}
            onStatusChange={(newValue) =>
              handlePutRequest(row?.original, newValue, "betLock")
            }
          />
        ),
      },
      {
        accessorKey: "isManual",
        header: "Is Manual",
        cell: ({ getValue }) => {
          const value = getValue();
          const data = value ? "success" : "danger";
          return (
            <span className={`badge bg-${data}-subtle text-${data}`}>
              {value ? "TRUE" : "FALSE"}
            </span>
          );
        },
      },
      {
        accessorKey: "isView",
        header: "auto settle",
        cell: ({ getValue, row }) => (
          <CheckPasswordModal
            onStatusChange={(newValue, token) => {
              const modify = { ...row?.original, token };
              handlePutRequest(modify, newValue, "isView");
            }}
            rowData={row?.original}
            getValue={() => getValue()}
          />
        ),
      },
      {
        accessorKey: "autoImport",
        header: "auto import",
        cell: ({ getValue, row }) => (
          <CheckPasswordModal
            onStatusChange={(newValue, token) => {
              const modify = { ...row?.original, token };
              handlePutRequest(modify, newValue, "autoImport");
            }}
            rowData={row?.original}
            getValue={() => getValue()}
          />
        ),
      },
      {
        accessorKey: "displayOrder",
        header: "display order",
        cell: ({ row }) => {
          const initialValue = row.original.displayOrder;

          return (
            <DisplayOrder
              initialValue={initialValue}
              onConfirm={(newValue) =>
                handlePutRequest(row?.original, newValue, "displayOrder")
              }
            />
          );
        },
      },
    ],
    []
  );

  const fetchData = () => {
    if (!data) return { data: [], pages: 0 };

    return {
      data: data.docs,
      pages: data.pages,
    };
  };

  return (
    <>
      <SubHeading
        subTitle="sport list"
        handleShowHide={() =>
          setIsShow((prev) => ({
            ...prev,
            isOpen: open,
            rowData: {},
            name: "add",
            modalTitle: "Add Sport",
            modalContent: SportModal,
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

export default Sports;

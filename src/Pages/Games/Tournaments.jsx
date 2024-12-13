import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { debounce } from "lodash";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getTournaments,
  putApiTournament,
} from "../../Services/game/tournamentService";
import {
  DataTable,
  DisplayOrder,
  SubHeading,
  TableOptions,
  YesNoBadge,
} from "../../Components";
import {
  CommonModal,
  ConfimationModal,
  LimitModal,
  TournamentModal,
} from "../../Modal";
import { uiActions } from "../../store/ui/ui-slice";
import { featureActions } from "../../store/feature/feature-slice";
import { API_UPDATE_TOURNAMENT } from "../../utils/api/ApiConstant";
import { getFilterSport } from "../../Services/commonService";

const Tournaments = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(50);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [startRecord, setStartRecord] = useState(0);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { tournament } = useSelector((state) => state.feature);
  const queryClient = useQueryClient();
  const [allData, setAllData] = useState({
    sportList: [],
    tournamentList: [],
    marketList: [],
  });
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
      start: startRecord,
      search: {
        value: searchTerm,
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
  }, [currentPage, recordsPerPage, debouncedValue, startRecord]);

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

  const { isLoading, data } = useQuery({
    queryKey: [
      "tournamentData",
      currentPage,
      recordsPerPage,
      debouncedValue,
      startRecord,
    ],
    queryFn: async () => await getTournaments({ payload }),
  });

  const { data: sportsData } = useQuery({
    queryKey: ["sportData"],
    queryFn: async () => await getFilterSport(currentPage, -1),
  });

  useEffect(() => {
    if (data && sportsData) {
      setAllData((prev) => ({
        ...prev,
        sportList: [...sportsData.docs],
      }));
    }
  }, [data, sportsData]);

  const handleQueryClient = (rowData, updatedRowData, key) => {
    return queryClient.setQueryData(
      [
        "tournamentData",
        currentPage,
        recordsPerPage,
        debouncedValue,
        startRecord,
      ],
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
    dispatch(uiActions.setLoading(true));

    const payload = { ...rowData, [key]: value };
    const url = `${API_UPDATE_TOURNAMENT}/${rowData?._id}`;
    const res = await putApiTournament(url, payload);

    dispatch(uiActions.setLoading(false));
    if (res) {
      handleQueryClient(rowData, payload, key);
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Tournaments",
      },
      {
        accessorKey: "sport.name",
        header: "Sports",
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
        accessorKey: "isManual",
        header: "Is Manual",
        cell: ({ getValue }) => <YesNoBadge getValue={getValue} />,
      },
      {
        accessorKey: "displayOrder",
        header: "Display Order",
        cell: ({ getValue, row }) => {
          const handleLimit = () => {
            setIsShow((prev) => ({
              ...prev,
              isOpen: true,
              rowData: row?.original,
              modalTitle: "Limit show",
              modalContent: LimitModal,
            }));
          };
          const handleStock = () => {
            console.log("handleStock => ", row?.original?.sport.name);
          };
          const tableOptions = {
            limit: handleLimit,
            stock: handleStock,
          };

          return (
            <div className="d-flex">
              <DisplayOrder
                initialValue={getValue()}
                onConfirm={(newValue) =>
                  handlePutRequest(row?.original, newValue, "displayOrder")
                }
              />
              <TableOptions tableOptions={tableOptions} />
            </div>
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
        subTitle="tournament list"
        combineData={allData}
        handleShowHide={() =>
          setIsShow((prev) => ({
            ...prev,
            isOpen: open,
            rowData: {},
            name: "add",
            modalTitle: "Add Sport",
            modalContent: TournamentModal,
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
            combineData: allData,
          })}
      </CommonModal>
    </>
  );
};

export default Tournaments;

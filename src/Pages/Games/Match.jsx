import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState, useCallback } from "react";
import { debounce } from "lodash";
import { dateFormat } from "../../helper/common";
import {
  editMatch,
  getMatches,
  importMatchFancy,
} from "../../Services/game/matchService";
import {
  DataTable,
  DisplayOrder,
  SubHeading,
  TableOptions,
  YesNoBadge,
} from "../../Components";
import MatchModal from "../../Modal/GameModal/MatchModal";
import { AddScoreCardId, CommonModal, LiveTv } from "../../Modal";

const Match = () => {
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

  const payload = {
    draw: currentPage,
    columns: [
      {
        data: "",
        name: "",
        searchable: true,
        orderable: false,
        search: { value: "", regex: false },
      },
      {
        data: "name",
        searchable: true,
        orderable: true,
        search: { value: "", regex: false },
      },
      {
        data: "tournament.name",
        searchable: true,
        orderable: true,
        search: { value: "", regex: false },
      },
      {
        data: "sport.name",
        searchable: true,
        orderable: true,
        search: { value: "", regex: false },
      },
      {
        data: "openDate",
        searchable: true,
        orderable: true,
        search: { value: "", regex: false },
      },
      {
        data: "isManual",
        searchable: true,
        orderable: true,
        search: { value: "", regex: false },
      },
      {
        data: "isActive",
        searchable: true,
        orderable: true,
        search: { value: "", regex: false },
      },
      {
        data: "import",
        searchable: true,
        orderable: true,
        search: { value: "", regex: false },
      },
      {
        data: "inPlay",
        searchable: true,
        orderable: true,
        search: { value: "", regex: false },
      },
      {
        data: "displayOrder",
        searchable: true,
        orderable: true,
        search: { value: "", regex: false },
      },
    ],
    order: [{ column: 0, dir: "" }],
    start: (currentPage - 1) * recordsPerPage, // Calculate offset
    length: recordsPerPage, // Number of records per page
    search: { value: debouncedValue, regex: false },
    data: {},
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
    queryKey: ["matchData", currentPage, recordsPerPage, debouncedValue],
    queryFn: async () => await getMatches({ payload }),
  });

  const columns = [
    { accessorKey: "name", header: "Matches" },
    {
      accessorKey: "tournament.name",
      header: "Tournaments",
      cell: ({ getValue }) =>
        getValue()
          ?.replace(/\s*\(.*?\)/, "")
          .trim(),
    },
    {
      accessorKey: "sport.name",
      header: "Sport",
      cell: ({ getValue }) =>
        getValue()
          ?.replace(/\s*\(.*?\)/, "")
          .trim(),
    },
    {
      accessorKey: "openDate",
      header: "Match Date",
      cell: ({ getValue }) => {
        const value = getValue();
        return dateFormat(value);
      },
    },
    {
      accessorKey: "isManual",
      header: "Is Manual",
      cell: ({ getValue }) => <YesNoBadge getValue={getValue} />,
    },
    {
      accessorKey: "isActive",
      header: "Is Active",
      cell: ({ getValue, row }) => {
        const rowData = row.original;

        const handleToggle = async () => {
          const updatedRowData = {
            ...rowData,
            isActive: !rowData.isActive,
          };

          // Update the cache directly without making an API call
          queryClient.setQueryData(
            ["matchData", currentPage, recordsPerPage, debouncedValue],
            (oldData) => {
              return {
                ...oldData,
                docs: oldData.docs.map((match) =>
                  match._id === rowData._id
                    ? { ...match, isActive: updatedRowData.isActive }
                    : match
                ),
              };
            }
          );

          try {
            const response = await editMatch(rowData._id, updatedRowData);

            if (response) {
              console.log("Update successful");
            }
          } catch (error) {
            console.error("Error updating row:", error);
          }
        };

        return (
          <div className="form-check form-switch form-switch-success">
            <input
              className="form-check-input"
              type="checkbox"
              checked={getValue()}
              onChange={handleToggle}
            />
          </div>
        );
      },
    },
    {
      accessorKey: "import",
      header: "F Import",
      cell: ({ getValue, row }) => {
        const rowData = row.original;

        const handleToggle = async () => {
          const updatedRowData = {
            ...rowData,
            import: !rowData.import,
          };

          // Update the cache directly without making an API call
          queryClient.setQueryData(
            ["matchData", currentPage, recordsPerPage, debouncedValue],
            (oldData) => {
              return {
                ...oldData,
                docs: oldData.docs.map((match) =>
                  match._id === rowData._id
                    ? { ...match, import: updatedRowData.import }
                    : match
                ),
              };
            }
          );
          try {
            const response = await importMatchFancy(updatedRowData);
            if (response) {
              console.log("Update successful");
            }
          } catch (error) {
            console.error("Error updating row:", error);
          }
        };

        return (
          <div className="form-check form-switch form-switch-success">
            <input
              className="form-check-input"
              type="checkbox"
              checked={getValue()}
              onChange={handleToggle}
            />
          </div>
        );
      },
    },
    {
      accessorKey: "inPlay",
      header: "In Play",
      cell: ({ getValue, row }) => {
        const rowData = row.original;

        const handleToggle = async () => {
          const updatedRowData = {
            ...rowData,
            inPlay: !rowData.inPlay,
          };

          // Update the cache directly without making an API call
          queryClient.setQueryData(
            ["matchData", currentPage, recordsPerPage, debouncedValue],
            (oldData) => {
              return {
                ...oldData,
                docs: oldData.docs.map((match) =>
                  match._id === rowData._id
                    ? { ...match, inPlay: updatedRowData.inPlay }
                    : match
                ),
              };
            }
          );

          try {
            const response = await editMatch(rowData._id, updatedRowData);

            if (response) {
              console.log("Update successful");
            }
          } catch (error) {
            console.error("Error updating row:", error);
          }
        };

        return (
          <div className="form-check form-switch form-switch-success">
            <input
              className="form-check-input"
              type="checkbox"
              checked={getValue()}
              onChange={handleToggle}
            />
          </div>
        );
      },
    },
    {
      accessorKey: "displayOrder",
      header: "Display Order",
      cell: ({ getValue, row }) => {
        const handleLiveTv = () => {
          setIsShow((prev) => ({
            ...prev,
            isOpen: true,
            rowData: row?.original,
            modalTitle: "Live Tv",
            modalContent: LiveTv,
          }));
        };

        const handleScoreCardIdModal = () => {
          setIsShow((prev) => ({
            ...prev,
            isOpen: true,
            rowData: row?.original,
            modalTitle: "Add Score Card ID",
            modalContent: AddScoreCardId,
          }));
        };

        const tableOptions = {
          ["Live Tv"]: handleLiveTv,
          ScoreCard: handleScoreCardIdModal,
        };

        return (
          <div className="d-flex">
            <DisplayOrder
              initialValue={getValue()}
              onConfirm={(newValue) =>
                editMatch(row?.original?._id, {
                  ...row?.original,
                  displayOrder: newValue,
                })
              }
            />
            <TableOptions tableOptions={tableOptions} />
          </div>
        );
      },
    },
  ];

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
        title="Match List"
        handleShowHide={() =>
          setIsShow((prev) => ({
            ...prev,
            isOpen: open,
            rowData: {},
            name: "add",
            modalTitle: "Add Match",
            modalContent: MatchModal,
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

export default Match;

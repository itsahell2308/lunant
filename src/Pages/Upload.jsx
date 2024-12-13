import React, { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { DataTable, DisplayOrder, SubHeading, Switch } from "../Components";
import { getAxios } from "../Services/commonService";
import {
  API_DELETE_IMAGES,
  API_GET_IMAGES,
  API_GET_WHITE_LABEL_SETTING,
  API_UPDATE_IMAGES,
} from "../utils/api/ApiConstant";
import UploadModal from "../Modal/GameModal/UploadModal";
import { useDispatch, useSelector } from "react-redux";
import { postApiUpload } from "../Services/uploadService";
import { featureActions } from "../store/feature/feature-slice";
import Icon from "../assets/icons/Icon";
import { CommonModal } from "../Modal";

const Upload = () => {
  const [isShow, setIsShow] = useState({
    isOpen: false,
    rowData: null,
    name: "",
    modalTitle: "",
    modalContent: null,
  });
  const { upload } = useSelector((state) => state.feature);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { isLoading, data } = useQuery({
    queryKey: ["uploadData"],
    queryFn: async () => await getAxios(API_GET_IMAGES, {}),
  });

  const { data: whtLabel } = useQuery({
    queryKey: ["whtLabelData"],
    queryFn: async () =>
      await getAxios(API_GET_WHITE_LABEL_SETTING, { page: 1, limit: 10 }),
  });

  const handleDelete = async (apiUrl) => {
    const res = await postApiUpload(API_DELETE_IMAGES, { apiName: apiUrl });
    if (res) {
      dispatch(featureActions.setUpload());
    }
  };

  const handleQueryClient = (rowData, updatedRowData, key) => {
    const data = queryClient.setQueryData(["uploadData"], (oldData) => {
      if (!oldData) return oldData;

      return oldData.map((obj) =>
        obj.apiUrl === rowData.apiUrl
          ? { ...obj, [key]: updatedRowData[key] }
          : obj
      );
    });

    console.log("🚀 ~ data ~ data:", data);
    return data;
  };

  const handlePutRequest = async (url, rowData, newValue, key) => {
    const updatedRowData = {
      ...rowData,
      [key]: newValue,
    };
    console.log("🚀 ~ handlePutRequest ~ updatedRowData:", updatedRowData);

    const res = await postApiUpload(url, updatedRowData);

    if (res) {
      handleQueryClient(rowData, updatedRowData, key);
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "apiName",
        header: "Image Name",
      },
      {
        accessorKey: "type",
        header: "type",
      },
      {
        accessorKey: "apiUrl",
        header: "Image url",
      },
      {
        accessorKey: "isActive",
        header: "isActive",
        cell: ({ getValue, row }) => {
          return (
            <Switch
              getValue={getValue}
              onChange={() => {
                handlePutRequest(
                  API_UPDATE_IMAGES,
                  row?.original,
                  !getValue(),
                  "isActive"
                );
              }}
            />
          );
        },
      },
      {
        accessorKey: "whitelableTypes",
        header: "whitelabel",
      },
      {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => {
          const initialValue = row.original.displayOrder;

          return (
            <div className="d-flex align-items-center justify-content-center">
              <DisplayOrder
                initialValue={initialValue}
                onConfirm={(newValue) =>
                  handlePutRequest(
                    API_UPDATE_IMAGES,
                    row?.original,
                    newValue,
                    "displayOrder"
                  )
                }
              />
              <Icon
                name="FaRegTrashAlt"
                onClick={() => handleDelete(row?.original?.apiUrl)}
                cursorPointer={true}
                className="text-danger"
              />
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
      data: data,
      pages: data.pages || 0,
    };
  };

  return (
    <>
      <SubHeading
        subTitle="upload list"
        handleShowHide={() =>
          setIsShow((prev) => ({
            ...prev,
            isOpen: open,
            rowData: {},
            name: "add",
            modalTitle: "Add Sport",
            modalContent: UploadModal,
          }))
        }
      />
      <div className="card-body">
        <DataTable
          columns={columns}
          fetchData={fetchData}
          isSearchable={false}
          isPagination={false}
          isPageSize={false}
          isLoading={isLoading}
        />
      </div>

      {/* Modal for Add/Edit Sport */}
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

export default Upload;

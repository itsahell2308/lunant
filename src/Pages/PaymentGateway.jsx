import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { Button, DataTable, SubHeading } from "../Components";
import { getAxios } from "../Services/commonService";
import { API_GET_PAYMENT_GATEWAY } from "../utils/api/ApiConstant";
import Icon from "../assets/icons/Icon";

const PaymentGateway = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["gatewayData"],
    queryFn: async () => await getAxios(API_GET_PAYMENT_GATEWAY, {}),
  });

  const columns = useMemo(
    () => [
      {
        accessorKey: "apiName",
        header: "Name",
      },
      {
        accessorKey: "type",
        header: "type",
      },
      {
        accessorKey: "apiUrl",
        header: "QR Code",
      },
      {
        accessorKey: "isActive",
        header: "isActive",
      },
      {
        accessorKey: "whitelableTypes",
        header: "whitelabel",
      },
      {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => (
          <div className="d-flex align-items-center">
            <input
              className="form-control input_cuter_box"
              type="text"
              value={row?.original?.displayOrder}
              id="example-text-input"
            ></input>
            <Icon name="FaRegTrashAlt" />
          </div>
        ),
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
      <SubHeading title="payment gateway list" isAddBtn={false} />
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
    </>
  );
};

export default PaymentGateway;

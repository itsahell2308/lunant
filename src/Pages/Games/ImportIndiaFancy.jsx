import React from "react";
import { useQuery } from "@tanstack/react-query";

import { getImportIndiaFancy } from "../../Services/game/importIndiaFancyService";
import { dateFormat } from "../../helper/common";
import Loading from "../../Components/UI/Loading";

const ImportIndiaFancy = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["importIndiaFancyData"],
    queryFn: async () => await getImportIndiaFancy(),
  });

  return (
    <div className="card-body">
      <table className="table table-striped table-auto">
        <thead className="table-light">
          <tr>
            <th>No.</th>
            <th>Match Name</th>
            <th>ID</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                <Loading />
              </td>
            </tr>
          ) : (
            data &&
            Object.keys(data).map((key, i) => {
              const game = data[key];
              return (
                <tr key={game.game_srno}>
                  <td>{i + 1}</td>
                  <td>{game.game_name}</td>
                  <td>{game.marketid}</td>
                  <td>{dateFormat(game.game_time)}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ImportIndiaFancy;

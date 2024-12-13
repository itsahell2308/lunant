import React from "react";
import { getRadheFancy } from "../../Services/game/importRadheFancyService";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/UI/Loading";

const ImportRadheFancy = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["importRadheFancy"],
    queryFn: async () => await getRadheFancy(),
  });

  return (
    <div className="card-body">
      <table
        style={{ borderCollapse: "collapse", width: "100%" }}
        className="table table-striped table-auto"
      >
        <thead className="table-light">
          <tr>
            <th>No.</th>
            <th>Game Name</th>
            <th>Market ID</th>
            <th>Game Time</th>
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
                  <td>{new Date(game.game_time).toLocaleString()}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ImportRadheFancy;

import React from "react";
import { Dropdown } from "react-bootstrap";

const TableOptions = ({ tableOptions }) => {
  return (
    <Dropdown className="d-inline mx-2">
      <Dropdown.Toggle id="dropdown-autoclose-true"></Dropdown.Toggle>

      <Dropdown.Menu>
        {Object.keys(tableOptions).map((key, i) => (
          <Dropdown.Item href="#" onClick={tableOptions[key]} key={i}>
            {key}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default TableOptions;

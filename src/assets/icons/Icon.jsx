import React from "react";
import * as FaIcons from "react-icons/fa"; // Import all Font Awesome icons
import * as MdIcons from "react-icons/md"; // Import all Material Design icons
import * as Io5Icons from "react-icons/io5"; // Import all Material Design icons
import * as CgIcons from "react-icons/cg"; // Import all Material Design icons

const Icon = ({
  name,
  className = "",
  cursorPointer = false,
  onClick,
  size = "15",
}) => {
  // Dynamically choose the icon based on the name
  const IconComponent =
    FaIcons[name] || MdIcons[name] || Io5Icons[name] || CgIcons[name];

  if (!IconComponent) return null;

  return (
    <IconComponent
      className={className}
      style={{ cursor: cursorPointer ? "pointer" : "" }}
      size={size}
      onClick={onClick}
    />
  );
};

export default Icon;

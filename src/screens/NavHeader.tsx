import React from "react";
import "../css/NavHeader.css";
import imgur from "../images/imgur.svg";
import { useAppDispatch } from "../pages/hooks/reduxHooks";
import { setGallerySelection } from "../pages/redux/slice";

export const NavHeader = () => {
  const dispatch = useAppDispatch();
  // Function to handle gallery selection change
  const handleGallerySelectionChange = (selectedOption: string) => {
    dispatch(setGallerySelection(selectedOption));
  };
  return (
    <header className="header">
      <div className="header-wrap">
        <img src={imgur} className="Logo" alt="logo" />

        {/* <nav className="Nav"> */}
        <div className="dropdown">
          <div className="select">
            <span className="selected">Select Gallery:</span>
            <select
              className="gallery-selection"
              onChange={(e) => handleGallerySelectionChange(e.target.value)}
              style={{ cursor: "pointer" }}
            >
              <option value="hot">Hot</option>
              <option value="top">Top</option>
              <option value="user">User</option>
            </select>
          </div>
        </div>
      </div>
      {/* </nav> */}
    </header>
  );
};

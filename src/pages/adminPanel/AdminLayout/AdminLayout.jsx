import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import "./AdminLayout.scss";
import Header from "../../../containers/header/Header";
import Sidebar from "../../../containers/sidebar/Sidebar";
import Infobar from "../../../containers/infobar/infobar";

function AdminLayout() {
    const [infoBarData, setInfoBarData] = useState(null);
    const [sideBarCollapsed, setSideBarCollapsed] = useState(false);
    return (
        <div className="AdminLayoutContainer">
            <div className="headerContainer">
                <Header />
            </div>
            <div className="bodyContainer">
                <Sidebar sideBarCollapsed={sideBarCollapsed} setSideBarCollapsed={setSideBarCollapsed} />
                <Outlet context={[infoBarData, setInfoBarData]} />
                <Infobar infoBarData={infoBarData} setInfoBarData={setInfoBarData} />
          </div>
      </div>
  );
}

export default AdminLayout;

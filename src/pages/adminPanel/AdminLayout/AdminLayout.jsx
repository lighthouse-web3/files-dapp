import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import "./AdminLayout.scss";
import Header from "../../../containers/header/Header";
import Sidebar from "../../../containers/sidebar/Sidebar";
import Infobar from "../../../containers/infobar/infobar";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { otherDataAC } from "../../../store/action-creators";


function AdminLayout() {
    const store = useSelector((store) => store);
    const [infoBarData, setInfoBarData] = useState(null);

    const dispatch = useDispatch();
    const _otherData = bindActionCreators(otherDataAC, dispatch);

    useEffect(() => {
        infoBarData && store?.otherData?.isMobile && (_otherData.setOtherData({ sidebarClosed: true }))
    }, [infoBarData])

    useEffect(() => {
        !store?.otherData?.sidebarClosed && store?.otherData?.isMobile && infoBarData && setInfoBarData(null)
    }, [store?.otherData?.sidebarClosed])



    return (
        <div className="AdminLayoutContainer">
            <div className="headerContainer">
                <Header />
            </div>
            <div className="bodyContainer">
                <Sidebar infoBarData={infoBarData} setInfoBarData={setInfoBarData} />
                <div className="mainBody">
                    <Outlet context={[infoBarData, setInfoBarData]} />
                    <Infobar infoBarData={infoBarData} setInfoBarData={setInfoBarData} />
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;

import { Route, Routes, Navigate } from "react-router-dom";
import Landingpage from "./pages/landing-page/Landingpage";
import AdminLayout from "./pages/adminPanel/AdminLayout/AdminLayout";
import Myspace from "./pages/adminPanel/Myspace/Myspace";
import Gateway from "./pages/adminPanel/Gateway/Gateway";
import NoPage from "./pages/NoPage/NoPage";

import UploadNew from "./pages/adminPanel/uploadNew/uploadNew";
import RequireAuth from "./utils/RequireAuth";
import Collection from "./pages/adminPanel/Collection/Collection";
import ViewNFT from "./pages/adminPanel/ViewNFT/ViewNFT";
import Apikey from "./pages/adminPanel/ApiKey/Apikey";
import TopUp from "./pages/adminPanel/TopUp/TopUp";
import "./App.scss";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { initWeb3Auth } from "./utils/services/web3auth";
import Profile from "./pages/adminPanel/Profile/Profile";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { otherDataAC } from "./store/action-creators";
import UnderMaintenance from "./pages/UnderMaintainance/UnderMaintenance";
import FilePreview from "./pages/filePreview/FilePreview";

function App() {
  const dispatch = useDispatch();
  const _otherData = bindActionCreators(otherDataAC, dispatch);
  useEffect(() => {
    initWeb3Auth();
    let isMobile = window.matchMedia(
      "only screen and (max-width: 600px)"
    ).matches;
    _otherData.setOtherData({ isMobile: isMobile });
    _otherData.setOtherData({ sidebarClosed: isMobile ? true : false });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Landingpage />}></Route>
      {/* <Route path="/" element={<UnderMaintenance />}></Route> */}
      <Route
        path="/dashboard"
        element={
          <RequireAuth redirectTo="/">
            <AdminLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Myspace />} />
        <Route path="gateway" element={<Gateway />} />
        <Route path="topup" element={<TopUp />} />
        <Route path="collection" element={<Collection />} />
        <Route path="apikey" element={<Apikey />} />
        <Route path="viewNFT/:id" element={<ViewNFT />} />
        <Route path="profile" element={<Profile />} />
        <Route path="uploadNew" element={<UploadNew />} />
      </Route>
      <Route path="viewFile/:id" element={<FilePreview />} />
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
}

export default App;

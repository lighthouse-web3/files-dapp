import "./App.scss";
import { Route, Routes, Navigate } from "react-router-dom";
import Landingpage from "./pages/landing-page/Landingpage";
import AdminLayout from "./pages/adminPanel/AdminLayout/AdminLayout";
import Myspace from "./pages/adminPanel/Myspace/Myspace";
import Gateway from "./pages/adminPanel/Gateway/Gateway";
import NoPage from "./pages/NoPage/NoPage";
import "react-toastify/dist/ReactToastify.css";
import MintNFT from "./pages/adminPanel/MintNFT/MintNFT";
import UploadNew from "./pages/adminPanel/uploadNew/uploadNew";
import RequireAuth from "./utils/RequireAuth";
import Collection from "./pages/adminPanel/Collection/Collection";
import ViewNFT from "./pages/adminPanel/ViewNFT/ViewNFT";
import Apikey from "./pages/adminPanel/ApiKey/Apikey";
import TopUp from "./pages/adminPanel/TopUp/TopUp";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landingpage />}></Route>
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
        <Route path="mintNFT" element={<MintNFT />} />
        <Route path="uploadNew" element={<UploadNew />} />
      </Route>
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
}

export default App;

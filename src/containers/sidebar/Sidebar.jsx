import React, { useState, useEffect } from 'react';
import './sidebar.scss'
import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarContent,
    SidebarFooter,
} from "react-pro-sidebar";

import { AiOutlinePlus, AiOutlineGateway } from 'react-icons/ai';
import { MdFolderShared } from 'react-icons/md';
import { BiLogOut } from 'react-icons/bi';
import { HiOutlineDocument } from 'react-icons/hi';
import { BsCollection } from 'react-icons/bs';
import { AiOutlineApi } from 'react-icons/ai';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authAC } from '../../store/action-creators';



function logout(_auth, _navigate) {
    _auth.setAuthData(null);
    _navigate('/');
}


function Sidebar() {
    const [currentPage, setCurrentPage] = useState('dashboard');
    const _location = useLocation();
    const toastId = React.useRef(null);
    const dispatch = useDispatch();
    const _auth = bindActionCreators(authAC, dispatch);
    const _navigate = useNavigate();





    useEffect(
        () => {
            setCurrentPage(_location.pathname);
        },
        [_location]
    )

    return (
        <ProSidebar collapsed={false}>
            <SidebarHeader>
                <Menu iconShape="round">
                    <MenuItem icon={<AiOutlinePlus />} active={false}
                    >Add New  <Link to='/dashboard/uploadNew' /></MenuItem>
                </Menu>
            </SidebarHeader>
            <Menu iconShape="round">
                <MenuItem icon={<MdFolderShared />} active={currentPage === '/dashboard' ? true : false}
                >Dashboard <Link to='/dashboard' /></MenuItem>
                <MenuItem icon={<AiOutlineApi />} active={currentPage === '/dashboard/apikey' ? true : false}
                >API Key <Link to='apikey' /></MenuItem>
                <MenuItem icon={<BsCollection />} active={currentPage === '/dashboard/collection' ? true : false}
                >Collection <Link to='collection' /></MenuItem>

                <MenuItem icon={<AiOutlineGateway />} active={currentPage === '/dashboard/gateway' ? true : false}
                >Gateway <Link to='gateway' /></MenuItem>
                <MenuItem icon={<HiOutlineDocument />} active={currentPage === '/dashboard/mintNFT' ? true : false}
                >Mint NFT <Link to='mintNFT' /></MenuItem>
            </Menu>
            <SidebarContent>
            </SidebarContent>
            <SidebarFooter>
                <Menu iconShape="round">
                    <MenuItem icon={<AiOutlinePlus />} active={currentPage === '/dashboard/topup' ? true : false}
                    >
                        <p>
                            <small>Low Balance</small><br />
                            Recharge Now
                        </p>
                        <Link to='topup' />
                    </MenuItem>
                    <MenuItem icon={<BiLogOut />} active={false}
                        onClick={() => { logout(_auth, _navigate) }}
                    >Logout</MenuItem>
                </Menu>
            </SidebarFooter>
        </ProSidebar>
    );
}

export default Sidebar;

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
import { BsCollection } from 'react-icons/bs';
import { AiOutlineApi } from 'react-icons/ai';
import { HiOutlineDocument } from 'react-icons/hi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authAC, balanceAC, otherDataAC, sidebarAC } from '../../store/action-creators';
import { getBalance } from '../../utils/services/filedeploy';
import { notify } from '../../utils/services/notification';
import { bytesToString } from '../../utils/services/other';
import { logout } from '../../utils/services/auth';
import History from '../../utils/services/GlobalNavigation/navigationHistory';
import { CgProfile } from 'react-icons/cg';



async function systemLogout() {
    await logout();
}


function Sidebar() {
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [userBalance, setUserBalance] = useState('dashboard');
    const _location = useLocation();
    const dispatch = useDispatch();
    const store = useSelector((store) => store);
    const _auth = bindActionCreators(authAC, dispatch);
    const _otherData = bindActionCreators(otherDataAC, dispatch);
    const _balnceAC = bindActionCreators(balanceAC, dispatch);
    const _navigate = useNavigate();

    console.log(store);



    useEffect(() => {
        (async () => {
            let userBalance = await getBalance();
            console.log(userBalance, 'USER BALANCE')
            _balnceAC.setBalanceData(userBalance);
            setUserBalance(userBalance);
        })().catch(err => {
            notify(err, 'error');
            let dummyBalance = {
                "dataLimit": 0,
                "dataUsed": 0
            }
            _balnceAC.setBalanceData(dummyBalance);
            setUserBalance(dummyBalance);
        });
    }, [])
    useEffect(
        () => {
            setCurrentPage(_location.pathname);
            store?.otherData?.isMobile && (_otherData.setOtherData({ sidebarClosed: true }))
        },
        [_location]
    )

    return (
        <ProSidebar className='sidebarContainer' collapsed={store?.otherData?.sidebarClosed || false}>
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
                <MenuItem icon={<HiOutlineDocument />} onClick={() => {
                    window.open('https://lighthouse-storage.gitbook.io/lighthouse/', '_blank')
                }}
                >Documentation </MenuItem>
            </Menu>
            <SidebarContent>
            </SidebarContent>
            <SidebarFooter>
                <Menu iconShape="round">
                    <MenuItem icon={<AiOutlinePlus />} active={currentPage === '/dashboard/topup' ? true : false}
                    >
                        <p>
                            <small>{bytesToString(userBalance['dataLimit'] - userBalance['dataUsed'])} Left </small><br />
                            Top Up Storage
                        </p>
                        <Link to='topup' />
                    </MenuItem>
                    <MenuItem icon={<CgProfile />} active={false}
                        onClick={() => { History.navigate('/dashboard/profile') }}
                    >Profile</MenuItem>
                    <MenuItem icon={<BiLogOut />} active={false}
                        onClick={() => { systemLogout(_auth, _navigate) }}
                    >Logout</MenuItem>
                </Menu>
            </SidebarFooter>
        </ProSidebar>

    );
}

export default Sidebar;

import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const HomeLayout = ({ sidebarData }) => {
    return (
        <div className='layout-container'>
            <Sidebar sidebarData={sidebarData} />

            <main className='content'>
                <div className='content-container'>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default HomeLayout;
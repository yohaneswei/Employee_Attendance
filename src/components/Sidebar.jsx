import React from 'react'
import { useNavigate } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout';

const Sidebar = ({ sidebarData }) => {
    const navigate = useNavigate()

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        window.location.reload();
    };

    return (
        <>
            <div className='sidebar'>
                <ul className='sidebarList'>
                    {sidebarData.map(({ title, icon, link }) => {
                        return (
                            <li className={`row ${window.location.pathname == link ? "active" : ""}`} key={title} onClick={() => navigate(link)}>
                                <div className="icon">{icon}</div>
                                <div className="title">{title}</div>
                            </li>
                        )
                    })}

                    <li className='row danger' onClick={handleLogout} style={{ position: "absolute", bottom: "0px", borderTop: "2px solid #B0BEC5" }}>
                        <div className="icon"><LogoutIcon /></div>
                        <div className="title">Logout</div>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Sidebar

import React, { useContext } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Avatar, IconButton } from '@material-ui/core';
import './sidebar.css';
import SidebarChat from '../sidebar-chat/sidebar-chat';
import { UserContext } from '../../context/UserContext';

const Sidebar = () => {
    const userContext = useContext(UserContext);

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <div className="sidebar__header_profile">
                    <Avatar></Avatar>
                </div>
                <div className="sidebar__header_options">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__search_container">
                    <SearchIcon />
                    <input placeholder="search for groups" type='text'></input>
                </div>
            </div>
            <div className="sidebar__chat">
                {
                    userContext.groups.map((group) => {
                        return <SidebarChat key={group._id} group={group} />
                    })
                }
            </div>
        </div>
    )
}

export default React.memo(Sidebar);

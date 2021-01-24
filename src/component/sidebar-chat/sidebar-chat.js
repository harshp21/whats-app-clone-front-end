import React, { useContext, useState } from 'react'
import './sidebar-chat.css';
import { UserContext } from "../../context/UserContext";
import GroupIcon from '@material-ui/icons/Group';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

function SidebarChat({ group }) {

    const userContext = useContext(UserContext);
    const [showUser, setShowUser] = useState(false);

    const handleOnClick = () => {
        userContext.setGroupSelection(group);
        setShowUser(!showUser);
    }

    return (
        <>
            <div className={userContext.selectedGroup._id === group._id ? "sidebar-chat active-chat" : "sidebar-chat"} onClick={() => handleOnClick()}>
                <span className='sidebar-chat__profile'><SupervisedUserCircleIcon /></span>
                <div className="sidebar-chat__info">
                    <h2>{group.groupName}</h2>
                    <div className="sidebar-chat__info_user-count">{userContext.activeGroupUsers.map((activeGroup) => {
                        if (activeGroup.groupId === group._id) {
                            return <span key={activeGroup.groupId}>{activeGroup.users.length}</span>
                        }
                        return null;
                    })}<GroupIcon /></div>
                </div>
            </div>
            <div className="active-group-users">
                {
                    showUser && userContext.activeGroupUsers.map((activeGroup) => {
                        if (activeGroup.groupId === group._id) {
                            return activeGroup.users.map((user) => {
                                return <div className="active-group-users__name" key={user.id}><AccountCircleIcon />{user.username} <span className='online' >online</span></div>;
                            })
                        }
                        return null;
                    })}
            </div>
        </>
    )
}

export default SidebarChat

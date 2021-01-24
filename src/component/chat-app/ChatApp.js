import React, { useEffect, useState } from "react";
import Sidebar from '../sidebar/sidebar';
import Chat from "../chat-message/chat";
import axios from 'axios';
import './chat-app.css'
import { UserContext, apiUrl } from "../../context/UserContext";
import { io } from 'socket.io-client';

const ChatApp = () => {

    const [messages, setMessages] = useState([]);
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState({});
    const [activeGroupUsers, setActiveGroupUsers] = useState([]);
    const token = localStorage.getItem('token');

    const [socket] = useState(io(apiUrl, {
        query: { token }
    }));

    useEffect(() => {
        fetchGroups();

        return () => {
            socket.emit('leaveAllGroup');
            socket.off();
        }
    }, []);

    useEffect(() => {
        socket.on('chat-messages', (newMessage) => {
            setMessages(messages => [...messages, newMessage]);
        })
        socket.on('room-users', (groupUsers) => {
            setActiveGroupUsers(groupUsers);
        })
    }, [socket])

    let fetchGroups = async () => {
        const fetchGroupsData = await axios.get(`${apiUrl}/groups`);
        setGroups(fetchGroupsData.data.groups);
    }

    let fetchGroupMessages = async (groupId) => {
        const headers = {
            "Content-type": "application/json",
            "Authorization": token
        }
        const groupMessages = await axios.get(`${apiUrl}/groups/group-messages/${groupId}`, { headers });
        setMessages(groupMessages.data.data.messages);

    }
    const sendMessage = (newMessage) => {
        socket.emit('chat-message', newMessage);
        const data = {
            message: newMessage,
            timestamp: `${new Date()}`,
            userId: localStorage.getItem('userId'),
        }
        newMessage !== '' && setMessages([...messages, data]);
    }

    const setGroupSelection = (group) => {
        socket.emit('leaveAllGroup');
        socket.emit('joinGroup', group._id);
        setSelectedGroup(group);
        fetchGroupMessages(group._id);
    }
    return (
        <UserContext.Provider value={{ messages, selectedGroup, groups, activeGroupUsers, sendMessage, setGroupSelection }}>
            <div className="chat-app">
                <div className="chat-app__content">
                    <Sidebar />
                    {Object.keys(selectedGroup).length !== 0 ?
                        <Chat />
                        : <div className='chat-img'></div>}

                </div>
            </div>
        </UserContext.Provider>
    )
}

export default React.memo(ChatApp)

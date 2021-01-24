import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon } from '@material-ui/icons';
import SearchIcon from '@material-ui/icons/Search';
import React, { useState, useRef, useEffect, useContext } from 'react';
import './chat.css';
import SendIcon from '@material-ui/icons/Send';
import Message from '../message/message';
import { UserContext } from '../../context/UserContext';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import auth from '../../service/auth';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router-dom';

const Chat = () => {

    const [typedMessage, setTypedMessage] = useState('');
    const messageBodyRef = useRef(null);
    const userContext = useContext(UserContext);
    const alert = useAlert();
    const history = useHistory();

    useEffect(() => {

        if (messageBodyRef) {
            messageBodyRef.current.addEventListener('DOMNodeInserted', event => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight });
            });
        }
    }, [])

    const handleOnChange = (e) => {
        e.preventDefault();
        setTypedMessage(e.target.value);
    }

    const handleOnMessageSend = (e) => {
        e.preventDefault();
        userContext.sendMessage(typedMessage)
        setTypedMessage('');
    }

    const logoutFromApp = () => {
        confirmAlert({
            title: 'Logout',
            message: 'Are you sure you want to logout?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        auth.logoutUser();
                        history.push('/');
                        alert.success('Logged out');
                    },
                },
                {
                    label: 'No',
                }
            ]
        })
    }


    return (
        (
            <div className="chat">
                <div className="chat__header">
                    <Avatar />
                    <div className="chat__header_info">
                        <h3>{userContext.selectedGroup.groupName}</h3>
                    </div>
                    <div className="chat__header_options">
                        <IconButton>
                            <SearchIcon />
                        </IconButton>
                        <IconButton>
                            <AttachFile />
                        </IconButton>
                        <IconButton>
                            <ExitToAppIcon onClick={logoutFromApp} />
                        </IconButton>
                    </div>
                </div>
                <div className="chat__body" ref={messageBodyRef}>

                    {
                        userContext.messages.map((message, index) => {
                            return <Message key={index} message={message}></Message>
                        })
                    }

                </div>

                <div className="chat__footer">
                    <IconButton>
                        <InsertEmoticon />
                    </IconButton>
                    <div className="chat__footer_search">
                        <input type="text" placeholder="Type a message" onChange={handleOnChange} value={typedMessage}></input>
                    </div>
                    <div className="chat__footer_send-btn" onClick={handleOnMessageSend}>
                        <IconButton>
                            <SendIcon />
                        </IconButton>
                    </div>
                </div>
            </div>
        )
    )
}

export default React.memo(Chat);

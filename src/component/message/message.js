import React from 'react';
import DateUtilService from "../../service/date-util";
import './message.css';

function Message({ message }) {

    const received = (message.userId === localStorage.getItem('userId'));
    return (
        <div className={received ? "chat__body_messages  message-recieved" : "chat__body_messages"} >
            <div className="message-title">
                <div className="message-title__name">{received ? 'You' : message.username}</div>
                <div className="message-title__timestamp">{DateUtilService.parseDateInGivenFormat(message.timestamp, 'dd/mm/yy - hh:MM:ss')}</div>
            </div>
            <div className="message-content">{message.message}</div>
        </div>
    )
}

export default Message

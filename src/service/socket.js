import { io } from 'socket.io-client';
import { apiUrl } from '../context/UserContext';

const token = localStorage.getItem('token');
const socket = io(apiUrl, {
    query: { token }
});

export default socket;
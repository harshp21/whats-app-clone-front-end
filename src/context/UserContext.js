import { createContext } from "react"

const UserContext = createContext(null);
const apiUrl = 'https://server-whats-app-clone.herokuapp.com';

export { UserContext, apiUrl };
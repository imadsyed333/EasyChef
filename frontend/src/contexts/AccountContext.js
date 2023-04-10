import {createContext, useState} from "react";


export const useAccountContext = () => {
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refresh"))
    const [username, setUsername] = useState("User")

    return {
        username, token, setToken, setUsername, refreshToken, setRefreshToken
    }
}

const AccountContext = createContext({
    username: "User",
    token: localStorage.getItem("token"),
    setToken: () => {
    },
    setUsername: () => {
    },
    refreshToken: localStorage.getItem("refresh"),
    setRefreshToken: () => {
    }
})

export default AccountContext
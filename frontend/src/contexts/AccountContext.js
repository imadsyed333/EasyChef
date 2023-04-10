import {createContext, useState} from "react";


export const useAccountContext = () => {
    const [token, setToken] = useState("")
    const [refreshToken, setRefreshToken] = useState("")
    const [username, setUsername] = useState("User")

    return {
        username, token, setToken, setUsername, refreshToken, setRefreshToken
    }
}

const AccountContext = createContext({
    username: "User",
    token: "",
    setToken: () => {
    },
    setUsername: () => {
    },
    refreshToken: "",
    setRefreshToken: () => {
    }
})

export default AccountContext
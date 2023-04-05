import {createContext, useState} from "react";


export const useAccountContext = () => {
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refresh"))

    return {
        token, setToken, refreshToken, setRefreshToken
    }
}

const AccountContext = createContext({
    token: localStorage.getItem("token"),
    setToken: () => {
    },
    refreshToken: localStorage.getItem("refresh"),
    setRefreshToken: () => {
    }
})

export default AccountContext
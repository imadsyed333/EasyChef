import {createContext, useState} from "react";


export const useAccountContext = () => {
    const [token, setToken] = useState("")
    const [refreshToken, setRefreshToken] = useState("")

    return {
        token, setToken, refreshToken, setRefreshToken
    }
}

const AccountContext = createContext({
    token: "",
    setToken: () => {},
    refreshToken: "",
    setRefreshToken: () => {}
})

export default AccountContext
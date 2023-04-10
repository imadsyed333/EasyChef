import {createContext, useEffect, useState} from "react";


export const useAccountContext = () => {
    const [token, setToken] = useState("")
    const [username, setUsername] = useState("User")

    useEffect(() => {
        const stored_token = localStorage.getItem("token")
        console.log("i am being called", stored_token)
        if (stored_token) {
            console.log("i am being called here")
            setToken(stored_token)
        }
    }, [])

    return {
        username, token, setToken, setUsername
    }
}

const AccountContext = createContext({
    username: "User",
    token: "",
    setToken: () => {
    },
    setUsername: () => {
    },
})

export default AccountContext
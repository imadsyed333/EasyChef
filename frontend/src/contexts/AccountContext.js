import {createContext, useEffect, useState} from "react";


export const useAccountContext = () => {
    const [token, setToken] = useState("")
    const [username, setUsername] = useState("User")
    const [avatar, setAvatar] = useState('./icon.png')

    useEffect(() => {
        const stored_token = localStorage.getItem("token")
        console.log("i am being called", stored_token)
        if (stored_token) {
            console.log("i am being called here")
            setToken(stored_token)
        }
    }, [])

    return {
        username, token, avatar, setToken, setUsername, setAvatar
    }
}

const AccountContext = createContext({
    username: "User",
    token: "",
    avatar: "",
    setToken: () => {
    },
    setUsername: () => {
    },
    setAvatar: () => {
    }
})

export default AccountContext
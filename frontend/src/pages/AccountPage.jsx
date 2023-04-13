import MenuBar from "../components/MenuBar/MenuBar";
import {useContext, useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import AccountContext from "../contexts/AccountContext";

const AccountPage = () => {
    const {token, avatar, setAvatar, setUsername} = useContext(AccountContext)
    const [firstN, setFirstN] = useState("");
    const [lastN, setLastN] = useState("");
    const [phone, setPhone] = useState("");
    const [image, setImage] = useState();
    const [email, setEmail] = useState("");

    const save_changes = () => {

        const data = new FormData()
        data.append("first_name", firstN)
        data.append("last_name", lastN)
        data.append("phone_number", phone)
        data.append("email", email)
        data.append("avatar", image)

        console.log("avatar", image)

        if (token) {
            fetch("http://localhost:8000/accounts/profile/edit/",
                {
                    method: "PUT",
                    headers: {
                        "Authorization": "Bearer " + token
                    },
                    body: data
                }).then(response => response.json()).then(json => {
                console.log(json)
                setUsername(firstN)
                setAvatar(json.avatar)
            })
        }
    }


    useEffect(() => {
        if (token) {
            fetch("http://localhost:8000/accounts/profile/view/",
                {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": "Bearer " + token
                    }

                })
                .then(data => data.json())
                .then(r => {
                    // console.log(r)
                    setFirstN(r.first_name)
                    setLastN(r.last_name)
                    setPhone(r.phone_number)
                    setImage(r.avatar)
                    setEmail(r.email)
                })

        }
    }, [token])


    return (
        <div>
            <label>First name:
                <input type={"text"} name={"first_name"} defaultValue={firstN}
                       onChange={(event) => setFirstN(event.target.value)}>
                </input>
            </label>
            <br></br>

            <label>Last name:
                <input type={"text"} name={"last_name"} defaultValue={lastN}
                       onChange={(event) => setLastN(event.target.value)}>
                </input>
            </label>
            <br></br>

            <label>Email:
                <input type={"email"} name={"email"} value={email} disabled={"disabled"}>
                </input>
            </label>
            <br></br>

            <label>Phone number:
                <input type={"text"} name={"phone_number"} defaultValue={phone}
                       onChange={(event) => setPhone(event.target.value)}>
                </input>
            </label>
            <br></br>

            <label>Avatar:
                <input type={"file"} name={"avatar"}
                       onChange={(event) => {
                           console.log(event.target.files)
                           setImage(event.target.files[0])
                       }
                       }>
                </input>
            </label>

            <br></br>
            <Button onClick={save_changes}>Save profile</Button>
        </div>
    )
}

export default AccountPage

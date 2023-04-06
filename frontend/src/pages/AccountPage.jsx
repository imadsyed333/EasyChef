import MenuBar from "../components/MenuBar/MenuBar";
import {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
const AccountPage = () => {
    const token = localStorage.getItem("token");
    const [firstN, setFirstN] = useState("");
    const [lastN, setLastN] = useState("");
    const [phone, setPhone] = useState("");
    const [avatar, setAvatar] = useState("");
    const [email, setEmail] = useState("");

    const putdata = {
        first_name:firstN,
        last_name:lastN,
        phone_number:phone,
        avatar:avatar,
        email: email,
    }

    const save_changes = () => {
        if (token) {
            fetch("http://localhost:8000/accounts/profile/edit/",
                {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": "Bearer " + token
                    },
                    body: JSON.stringify(putdata)
                })
        }
        window.location.reload();
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
                    console.log(r)
                    setFirstN(r.first_name)
                    setLastN(r.last_name)
                    setPhone(r.phone_number)
                    setAvatar(r.avatar)
                    setEmail(r.email)
                })

        }
    }, [setFirstN, setLastN, setPhone, setAvatar])



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
                <input type={"image"} name={"avatar"} defaultValue={avatar}
                    onChange={(event) => setAvatar(event.target.value)}>
                </input>
            </label>

            <br></br>
            <Button onClick={save_changes}>Save profile</Button>
        </div>
    )
}

export default AccountPage

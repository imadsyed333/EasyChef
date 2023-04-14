import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("")
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");

    const [image, setImage] = useState()

    const navigate = useNavigate()

    const handleSubmit = () => {
        const formData = new FormData()
        formData.append("email", email)
        formData.append("password", password1)
        formData.append("password2", password2)
        formData.append("first_name", firstName)
        formData.append("last_name", lastName)
        formData.append("phone_number", phone)
        formData.append("avatar", image)
        fetch("http://localhost:8000/accounts/signup/", {
            method: "POST",
            body: formData
        }).then(response => {
            if (response.status === 200) {
                navigate("/login/")
            } else {
                response.json().then(json => console.log(json))
            }
        }).catch(error => console.log(error))
    }

    return (
        <div>
            Register here
            <br/>
            <label>
                Email:
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <br/>
            <label>
                Password:
                <input type={"password"} name={"password1"} value={password1}
                       onChange={e => setPassword1(e.target.value)}/>
            </label>
            <br/>
            <label>
                Repeat Password:
                <input type={"password"} name={"password2"} value={password2}
                       onChange={e => setPassword2(e.target.value)}/>
            </label>
            <br/>
            <label>
                First Name:
                <input type={"text"} name={"first_name"} value={firstName}
                       onChange={e => setFirstName(e.target.value)}/>
            </label>
            <br/>
            <label>
                Last Name:
                <input type={"text"} name={"last_name"} value={lastName} onChange={e => setLastName(e.target.value)}/>
            </label>
            <br/>
            <label>
                Phone Number:
                <input type={"tel"} name={"phone_number"} value={phone} onChange={e => setPhone(e.target.value)}/>
            </label>
            <br/>
            <label>Avatar:
                <input type={"file"} name={"avatar"}
                       accept={"image/*"}
                       onChange={(event) => {
                           console.log(event.target.files)
                           setImage(event.target.files[0])
                       }
                       }>
                </input>
            </label>
            <br/>
            <Button onClick={handleSubmit}>Register</Button>
        </div>
    );
};

export default RegisterPage

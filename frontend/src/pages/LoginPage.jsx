import AccountContext from "../contexts/AccountContext";
import {useContext, useState} from "react";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";
import Form from 'react-bootstrap/Form';

const LoginPage = () => {
    const {setToken} = useContext(AccountContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()

    const handleLogin = () => {
        // https://stackoverflow.com/questions/46640024/how-do-i-post-form-data-with-fetch-api
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        fetch("http://localhost:8000/accounts/login/", {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                if (response.status === 200) {
                    response.json().then((json) => {
                        setToken(json.access)
                        localStorage.setItem("token", json.access)
                        localStorage.setItem("refresh", json.refresh)
                        setErrors({});
                        navigate("/")
                    });
                } else {
                    response.json().then((json) => setErrors(json));
                }
            })
            .catch((error) => console.log(error));
    };

    const emailErrors = () => {
        if (errors.email) {
            return errors.email.map((error, i) => <li style={{color: 'red'}} key={i}>{error}</li>);
        } else {
            return <br/>;
        }
    };

    const passwordErrors = () => {
        if (errors.password) {
            return errors.password.map((error, i) => <li style={{color: 'red'}} key={i}>{error}</li>);
        } else {
            return <br/>;
        }
    };

    const authErrors = () => {
        if (errors.detail) {
            return (<div style={{color: 'red'}}>{errors.detail}</div>)
        } else {
            return <br/>;
        }
    };

    return (
        <div>
            Login here <br/>
            <Form>
            <label>
                Email:
                <input
                    type={"email"}
                    name={"email"}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
            </label>
            {emailErrors()}
            <label>
                Password:
                <input
                    type={"password"}
                    name={"password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </label>
            {passwordErrors()}
            <Button onClick={handleLogin}>Login</Button>
            </Form>
            {authErrors()}
        </div>
    );
};

export default LoginPage;

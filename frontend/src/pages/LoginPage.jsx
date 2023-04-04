import AccountContext from "../contexts/AccountContext";
import {useContext, useState} from "react";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    const {setToken, setRefreshToken} = useContext(AccountContext);
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
                        setToken(json.access);
                        setRefreshToken(json.refresh);
                        setErrors({});
                        navigate("/")
                    });
                } else if (response.status === 400) {
                    response.json().then((json) => setErrors(json));
                }
            })
            .catch((error) => console.log(error));
    };

    const emailErrors = () => {
        if (errors.email) {
            return errors.email.map((error) => <li>{error}</li>);
        } else {
            return <br/>;
        }
    };

    const passwordErrors = () => {
        if (errors.password) {
            return errors.password.map((error) => <li>{error}</li>);
        } else {
            return <br/>;
        }
    };

    return (
        <div>
            Login here <br/>
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
        </div>
    );
};

export default LoginPage;

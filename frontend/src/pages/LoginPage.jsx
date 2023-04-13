import AccountContext from "../contexts/AccountContext";
import {useContext, useState} from "react";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import {Image} from "react-bootstrap";




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
        //Inspired by https://react-bootstrap.github.io/forms/overview/
        // https://reactgo.com/react-center-component-horizontally-vertically/
        <div style={{display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '70vh',
            }}>
            <Form>
                 <img src={require('./EasyChefLogo.png')} alt={""} style={{height: 300, width: 300}}/>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label >
                Email address
        </Form.Label>
        <Form.Control type={"email"}
                    name={"email"}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
          {emailErrors()}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label >
            Password
        </Form.Label>
        <Form.Control type={"password"}
                    name={"password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)} />
         {authErrors()}
          {passwordErrors()}
      </Form.Group>

      <Button onClick={handleLogin}>Login</Button>

    </Form>

        </div>
    );
};

export default LoginPage;

 // Login here <br/>
 //            <Form>
 //            <label>
 //                Email:
 //                <input
 //                    type={"email"}
 //                    name={"email"}
 //                    value={email}
 //                    onChange={(event) => setEmail(event.target.value)}
 //                />
 //            </label>
 //            {emailErrors()}
 //            <label>
 //                Password:
 //                <input
 //                    type={"password"}
 //                    name={"password"}
 //                    value={password}
 //                    onChange={(event) => setPassword(event.target.value)}
 //                />
 //            </label>
 //            {passwordErrors()}
 //            <Button onClick={handleLogin}>Login</Button>
 //            </Form>
 //            {authErrors()}

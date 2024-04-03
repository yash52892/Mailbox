import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import { useRef, useState } from "react";
import {useNavigate} from "react-router-dom";

const AuthPage = () => {

    const nav=useNavigate();
  const [error, setError] = useState(false);
  const [errmsg, seterrmsg] = useState("");

  const [action, setAction] = useState(true);

  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  const handleaction = () => {
    setAction((t) => !t);
  };

  const handleLogin = (event) => {
    const obj = {
        email: email.current.value,
        password: password.current.value,
      };
    fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBTSDcMIiQIhAgney8KSc7Iurf0R3PPKFI",
        {
          method: "POST",
          body: JSON.stringify(obj),
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        }
      ).then((res)=>{
        if(res.ok){
            res.json().then((data)=>{
                localStorage.setItem("token",data.idToken);
            })
            nav("/home");
        }
        else
        {
            setError(true);
            seterrmsg("Invalid Password/Email");
        }
      })
  };

  const handleSingup = (event) => {
    event.preventDefault();
    if (password.current.value !== confirmPassword.current.value) {
      setError((error) => !error);
      seterrmsg("Password Mismatch!!");
    } else {
      setError(false);
      const obj = {
        email: email.current.value,
        password: password.current.value,
        confirmPassword: confirmPassword.current.value,
      };
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBTSDcMIiQIhAgney8KSc7Iurf0R3PPKFI",
        {
          method: "POST",
          body: JSON.stringify(obj),
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            res.json().then((data) => {
              console.log("User has successfully signed up with", data.email);
            });
          } else {
            throw new Error("Something went wrong");
          }
        })
        .catch((res) => {
          console.log(res);
          setError(true);
          seterrmsg("Something went wrong");
        });
    }
  };
  return (
    <Container className="d-flex p-5 mt-5 align-items-center justify-content-center">
      <Card>
        <Card.Body className="p-4">
          {action ? (
            <Card.Title className="text-center">Sign Up</Card.Title>
          ) : (
            <Card.Title className="text-center">Log In</Card.Title>
          )}
          <Form onSubmit={handleSingup}>
            <Form.Group className="mb-3 mt-4" controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Enter email"
                ref={email}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                ref={password}
                required
              />
            </Form.Group>
            {action && (
              <Form.Group className="mb-3" controlId="formConfirmPassword">
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  ref={confirmPassword}
                  required
                />
              </Form.Group>
            )}
            <div className="text-center">
              {action ? (
                <Button
                  className="align-items-center"
                  variant="primary"
                  type="submit"
                >
                  Sign In
                </Button>
              ) : (
                <>
                <Button
                  className="align-items-center"
                  variant="primary"
                  onClick={handleLogin}
                >
                  Log In
                </Button>
                <p className="align-items-center">Forgot password</p>
                </>
              )}
            </div>
          </Form>
        </Card.Body>
        <ListGroup variant="flush" className="align-items-center bg-info">
          {action ? (
            <>
            <ListGroup.Item className="align-items-center bg-info bg-gradient">
              Have an account?
              <button
                className="align-items-center bg-info bg-gradient"
                onClick={handleaction}
              >
                Login
              </button>
            </ListGroup.Item>
            
            </>
          ) : (
            <ListGroup.Item className="align-items-center bg-info bg-gradient">
              Dont have an account? 
              <button
                className="align-items-center bg-info bg-gradient"
                onClick={handleaction}
              >
                Sign Up
              </button>
            </ListGroup.Item>
          )}
          {error && (
            <ListGroup.Item className="align-items-center bg-warning bg-gradient">
              {errmsg}
            </ListGroup.Item>
          )}
        </ListGroup>
      </Card>
    </Container>
  );
};
export default AuthPage;

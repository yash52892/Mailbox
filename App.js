import "./App.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import { useRef, useState } from "react";

function App() {
  const [error, setError] = useState(false);
  const [errmsg, seterrmsg] = useState("");

  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  const handleSingup = (event) => {
    event.preventDefault();
    if (password.current.value !== confirmPassword.current.value)
    {
          setError((error) => !error);
          seterrmsg("Password Mismatch!!");
    }
    else {
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
        ).then((res) => {
          if(res.ok){
            res.json().then((data) => {
              console.log("User has successfully signed up with", data.email);
            });
          }
          else
          {
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
          <Card.Title className="text-center">Sign Up</Card.Title>
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
            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                ref={confirmPassword}
                required
              />
            </Form.Group>
            <div className="text-center">
              <Button
                className="align-items-center"
                variant="primary"
                type="submit"
              >
                Sign In
              </Button>
            </div>
          </Form>
        </Card.Body>
        <ListGroup variant="flush" className="align-items-center bg-info">
          <ListGroup.Item className="align-items-center bg-info bg-gradient">
            Have an account? Login
          </ListGroup.Item>
          {error && (
            <ListGroup.Item className="align-items-center bg-warning bg-gradient">
              {errmsg}
            </ListGroup.Item>
          )}
        </ListGroup>
      </Card>
    </Container>
  );
}

export default App;

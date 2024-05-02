import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.scss";
import { useEffect, useState } from "react";
import { PiTrainSimpleBold } from "react-icons/pi";
import Alert from 'react-bootstrap/Alert';


export default function SignUp() {
  const [exist, setExsit] = useState(false);
  const [pass, setPass] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();



  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        "https://localhost:44327/api/User/Registration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        setPass("Registration Successful");
        setExsit(false)
      } else {
        setExsit("Email Already Exist");
        setPass(false)

      }
    } catch (error) {
      console.error("Error occurred while registering:", error);
    }
  };


  return (
    <div className="signIn">
      <div style={{ display: 'flex', flexDirection: 'column' }} className="signIn__container">
        <h1 className="flex items-center justify-center gap-[1rem]" style={{ fontSize: '3rem', margin: '2rem 0', color: '#094273' }}> <img width={90} src="src/assets/images/Auckland_transport_train_logo.png" alt="" /> Sri Lanka Railway</h1>

        <Form onSubmit={handleSubmit(onSubmit)}>
          {pass && (<Alert className="text-dark text-center" variant='success'>
            {pass}
          </Alert>)}

          {exist && (

            <Alert className="text-dark text-center" variant='danger'>
              {exist}
            </Alert>
          )}

          <h3 style={{ textAlign: "center", margin: "0.7em 0" }}>
            Sign Up
          </h3>
          <FloatingLabel
            controlId="floatingEmail"
            label="Email address"
            className="mb-3"
          >
            <Form.Control
              type="email"
              placeholder="name@example.com"
              name="email"
              {...register("email", {
                required: true,
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Entered value does not match email format",
                },
              })}
            />
            {errors.email && (
              <small style={{ color: "red" }}>
                {errors.email.message || "Email is required"}
              </small>
            )}
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="User Name"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="User Name"
              name="username"
              {...register("username", { required: true })}
            />
            {errors.username && (
              <small style={{ color: "red" }}>User Name is required</small>
            )}
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <small style={{ color: "red" }}>Password is required</small>
            )}
          </FloatingLabel>
          <Button
            className="signIn__button"
            style={{ backgroundColor: ' #094793', border: 'none' }}
            type="submit"
          >
            Sign up
          </Button>
          <p style={{ textAlign: "center" }}>
            Already have an account? <Link to="/signin">Sign in</Link>
          </p>
        </Form>
      </div>
    </div>
  );
}

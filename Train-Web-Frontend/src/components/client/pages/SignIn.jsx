// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import FloatingLabel from "react-bootstrap/FloatingLabel";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { PiTrainSimpleBold } from "react-icons/pi";
// import "../style.scss";
// import Alert from 'react-bootstrap/Alert';

// export default function SignIn({ onLogin }) {
//   const [fail, setFail] = useState("");

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = async (data) => {
//     try {
//       const response = await fetch("https://localhost:44327/api/User/Login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });
//       if (response.ok) {
//         const responseData = await response.json();
//         console.log("Login successful");
//         if (responseData.userType === "admin") {
//           window.location.href = "/admin"; 
//         } else if (responseData.userType === "customer") {
//           window.location.href = "/"; 
//         }
//         onLogin();
//       } else {
//         setFail("Invalid Email or Password");
//       }
//     } catch (error) {
//       console.error("Error occurred while logging in:", error);
//     }
//   };

//   return (
//     <div className="signIn">
//       <div style={{ display: 'flex', flexDirection: 'column' }} className="signIn__container">
//         <h1 className="flex items-center justify-center gap-[1rem]" style={{ fontSize: '3rem', margin: '2rem 0', color: '#094273' }}> <img width={90} src="src/assets/images/Auckland_transport_train_logo.png" alt="" /> Sri Lanka Railway</h1>

//         <Form onSubmit={handleSubmit(onSubmit)}>
//           {fail && (<Alert className="text-dark text-center" variant='danger'>
//             {fail}
//           </Alert>)}

//           <h3 style={{ textAlign: "center", margin: "0.7em 0" }}>
//             Sign In
//           </h3>
//           <FloatingLabel
//             controlId="floatingEmail"
//             label="Email address"
//             className="mb-3"
//           >
//             <Form.Control
//               type="email"
//               placeholder="name@example.com"
//               name="email"
//               {...register("email", {
//                 required: true,
//                 pattern: {
//                   value: /\S+@\S+\.\S+/,
//                   message: "Entered value does not match email format",
//                 },
//               })}
//             />
//             {errors.email && (
//               <small style={{ color: "red" }}>
//                 {errors.email.message || "Email is required"}
//               </small>
//             )}
//           </FloatingLabel>
//           <FloatingLabel controlId="floatingPassword" label="Password">
//             <Form.Control
//               type="password"
//               placeholder="Password"
//               name="password"
//               {...register("password", { required: true })}
//             />
//             {errors.password && (
//               <small style={{ color: "red" }}>Password is required</small>
//             )}
//           </FloatingLabel>

//           <Button
//             className="signIn__button"
//             style={{ backgroundColor: ' #094793', border: 'none' }}
//             type="submit"
//           >
//             Sign in
//           </Button>
//           <p style={{ textAlign: "center" }}>
//             Don't have an account? <Link to="/signup">Sign up</Link>
//           </p>

//         </Form>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "bootstrap/dist/css/bootstrap.min.css";
import { PiTrainSimpleBold } from "react-icons/pi";
import "../style.scss";
import Alert from 'react-bootstrap/Alert';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function SignIn({ onLogin }) {
  const [fail, setFail] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const redirectUrl = searchParams.get('redirectUrl');
    console.log(redirectUrl)
    try {
      const response = await fetch("https://localhost:44327/api/User/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const responseData = await response.json();
        console.log("Login successful");
        if (responseData.userType === "admin") {
          // window.location.href = "/admin"; 
          navigate("/home")
        } else if (responseData.userType === "customer") {
          // window.location.href = "/"; 
          redirectUrl ? navigate(redirectUrl) : navigate("/")

        }
        onLogin();
      } else {
        setFail("Invalid Email or Password");
        setTimeout(() => {
          setFail('')
        }, 3000)
      }
    } catch (error) {
      console.error("Error occurred while logging in:", error);
    }
  };

  return (
    <div className="signIn">
      <div style={{ display: 'flex', flexDirection: 'column' }} className="signIn__container">
        <h1 className="flex items-center justify-center gap-[1rem]" style={{ fontSize: '3rem', margin: '2rem 0', color: '#094273' }}> <img width={90} src="src/assets/images/Auckland_transport_train_logo.png" alt="" /> Sri Lanka Railway</h1>

        <Form onSubmit={handleSubmit(onSubmit)}>
          {fail && (<Alert className="text-dark text-center" variant='danger'>
            {fail}
          </Alert>)}

          <h3 style={{ textAlign: "center", margin: "0.7em 0" }}>
            Sign In
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
            Sign in
          </Button>
          <p style={{ textAlign: "center" }}>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>

        </Form>
      </div>
    </div>
  );
}

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import FloatingLabel from "react-bootstrap/FloatingLabel";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { PiTrainSimpleBold } from "react-icons/pi";
// import "../style.scss";
// import Alert from 'react-bootstrap/Alert';
// import { useSearchParams } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";

// export default function SignIn({ onLogin }) {
//   const [fail, setFail] = useState("");
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = async (data) => {
//     const redirectUrl = searchParams.get('redirectUrl');
//     console.log(redirectUrl)
//     try {
//       const response = await fetch("https://localhost:44327/api/User/Login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });
//       if (response.ok) {
//         const responseData = await response.json();
//         console.log("Login successful");
        
//         // Store user data in local storage
//         localStorage.setItem('userData', JSON.stringify(responseData));

//         if (responseData.userType === "admin") {
//           navigate("/admin");
//         } else if (responseData.userType === "customer") {
//           redirectUrl ? navigate(redirectUrl) : navigate("/");
//         }
//         // onLogin();
//       } else {
//         setFail("Invalid Email or Password");
//         setTimeout(() => {
//           setFail('');
//         }, 3000);
//       }
//     } catch (error) {
//       console.error("Error occurred while logging in:", error);
//     }
//   };

//   return (
//     <div className="signIn">
//       <div style={{ display: 'flex', flexDirection: 'column' }} className="signIn__container">
//         <h1 className="flex items-center justify-center gap-[1rem]" style={{ fontSize: '3rem', margin: '2rem 0', color: '#094273' }}> <img width={90} src="src/assets/images/Auckland_transport_train_logo.png" alt="" /> Sri Lanka Railway</h1>

//         <Form onSubmit={handleSubmit(onSubmit)}>
//           {fail && (<Alert className="text-dark text-center" variant='danger'>
//             {fail}
//           </Alert>)}

//           <h3 style={{ textAlign: "center", margin: "0.7em 0" }}>
//             Sign In
//           </h3>
//           <FloatingLabel
//             controlId="floatingEmail"
//             label="Email address"
//             className="mb-3"
//           >
//             <Form.Control
//               type="email"
//               placeholder="name@example.com"
//               name="email"
//               {...register("email", {
//                 required: true,
//                 pattern: {
//                   value: /\S+@\S+\.\S+/,
//                   message: "Entered value does not match email format",
//                 },
//               })}
//             />
//             {errors.email && (
//               <small style={{ color: "red" }}>
//                 {errors.email.message || "Email is required"}
//               </small>
//             )}
//           </FloatingLabel>
//           <FloatingLabel controlId="floatingPassword" label="Password">
//             <Form.Control
//               type="password"
//               placeholder="Password"
//               name="password"
//               {...register("password", { required: true })}
//             />
//             {errors.password && (
//               <small style={{ color: "red" }}>Password is required</small>
//             )}
//           </FloatingLabel>

//           <Button
//             className="signIn__button"
//             style={{ backgroundColor: ' #094793', border: 'none' }}
//             type="submit"
//           >
//             Sign in
//           </Button>
//           <p style={{ textAlign: "center" }}>
//             Don't have an account? <Link to="/signup">Sign up</Link>
//           </p>

//         </Form>
//       </div>
//     </div>
//   );
// }


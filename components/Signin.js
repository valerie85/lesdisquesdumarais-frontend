import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";

const Signup = ({closeModal}) => {
  const dispatch = useDispatch();

  const [isModalVisible, setIsModalVisible] = useState(true);
  const [signUpFirstName, setSignUpFirstname] = useState("");
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const handleSignup = () => {
    fetch("http://localhost:3000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname: signUpFirstName,
        username: signUpUsername,
        password: signUpPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            login({
              firstname: signUpFirstName,
              username: signUpUsername,
              token: data.token,
            })
          );
          setSignUpUsername("");
          setSignUpFirstname("");
          setSignUpPassword("");
          // setIsModalVisible(false);
          closeModal();
          console.log("Tu es bien inscrit à Twitter");
        }
      });
  };

  return (
    <>
      <img
        src="/twitter_logo.jpg"
        alt="Hackatweet Logo"
        style={{ display: "block", marginBottom: "10px" }}
      />
      <title>Create your Hackatweet account</title>
      <input
        type="text"
        placeholder="Firstname"
        id="signUpFirstname"
        onChange={(e) => setSignUpFirstname(e.target.value)}
        value={signUpFirstName}
        style={{ display: "block", marginBottom: "10px" }}
      />
      <input
        type="text"
        placeholder="Username"
        id="signUpUsername"
        onChange={(e) => setSignUpUsername(e.target.value)}
        value={signUpUsername}
        style={{ display: "block", marginBottom: "10px" }}
      />
      <input
        type="password"
        placeholder="Password"
        id="signUpPassword"
        onChange={(e) => setSignUpPassword(e.target.value)}
        value={signUpPassword}
        style={{ display: "block", marginBottom: "10px" }}
      />
      <button
        id="register"
        onClick={handleSignup}
        style={{ display: "block", marginTop: "10px" }}
      >
        Sign Up
      </button>
    </>
  );
};

export default Signup;

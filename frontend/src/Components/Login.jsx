import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { TextField, Container, Box, Button } from "@mui/material";
import { useLoginMutation } from "../redux/api/users";
import Loader from "../Containers/Loader";
import { toast } from "react-toastify";

import { setCredentials } from "../redux/features/auth/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();

      dispatch(setCredentials({ ...res }));
      navigate("/items");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Container
      maxWidth="sm"
      className="bg-black text-white m-12 p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">User Login</h2>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { mb: 3, width: "100%" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={submitHandler}
      >
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          InputLabelProps={{
            style: { color: "#fff" },
          }}
          InputProps={{
            style: { color: "#fff" },
          }}
          className="bg-gray-800"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          InputLabelProps={{
            style: { color: "#fff" },
          }}
          InputProps={{
            style: { color: "#fff" },
          }}
          className="bg-gray-800"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className="bg-teal-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
          disabled={isLoading}
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </Button>
        <button></button>

        {isLoading && <Loader />}
      </Box>
    </Container>
  );
};

export default Login;

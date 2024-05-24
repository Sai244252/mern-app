import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Box } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useRegisterMutation } from "../redux/api/users";
import { toast } from "react-toastify";
import Loader from "../Containers/Loader";
import { setCredentials } from "../redux/features/auth/authSlice";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (userInfo) {
      navigate("/items");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (!username || !email || !password || !confirmPassword) {
        toast.error("Please fill all required fields");
        return;
      }

      if (password !== confirmPassword) {
        toast.error("Password do not match");
      } else {
        try {
          const res = await register({ username, email, password }).unwrap();
          dispatch(setCredentials({ ...res }));

          navigate("/items");
          toast.success("User successfully registered!!");
        } catch (error) {
          console.log(error);
          toast.error(error?.data?.message);
        }
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Container
      maxWidth="sm"
      className="bg-black text-white m-12 p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Create User</h2>
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
          label="Username"
          variant="outlined"
          InputLabelProps={{
            style: { color: "#ffffff" },
          }}
          InputProps={{
            style: { color: "#fff" },
          }}
          className="bg-gray-800"
          onChange={(e) => setUsername(e.target.value)}
        />
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
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-800"
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
          onChange={(e) => setPassword(e.target.value)}
          className="bg-gray-800"
        />
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          InputLabelProps={{
            style: { color: "#fff" },
          }}
          InputProps={{
            style: { color: "#fff" },
          }}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="bg-gray-800"
        />
        {!isLoading ? (
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="w-full"
          >
            Submit
          </Button>
        ) : (
          <Loader />
        )}
      </Box>
    </Container>
  );
};

export default Register;

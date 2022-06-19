import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { loginInitiate, setFuelData } from "../redux/actions";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "./Login.css";

const Login = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const { currentUser } = useSelector((state) => state.user);
  const { email, password } = state;
  const history = useHistory();
  useEffect(() => {
    let fuelData = [
      {
        fuelType: "Petrol",
        pricePerLiter: 40,
      },
      {
        fuelType: "Diesel",
        pricePerLiter: 30,
      },
      {
        fuelType: "Gas",
        pricePerLiter: 20,
      },
    ];
    AsyncStorage.setItem("fuelData", JSON.stringify(fuelData));
    AsyncStorage.setItem("userMaxAllowance", JSON.stringify(300));
  }, []);
  useEffect(() => {
    if (currentUser) {
      AsyncStorage.multiGet(["fuelData", "userMaxAllowance"]).then((value) => {
        const data = Object.fromEntries(value);
        let finalData = {
          fuelData: JSON.parse(data.fuelData),
          userMaxAllowance: parseInt(data.userMaxAllowance),
        };
        debugger;
        dispatch(setFuelData(finalData));
        // props.navigation.navigate('Home')
      });
      history.push("/");
    }
  }, [currentUser, history]);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    dispatch(loginInitiate(email, password));
    debugger;
    setState({ email: "", password: "" });
  };
  const handleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  return (
    <div>
      <div id="logreg-forms">
        <form onSubmit={handleSubmit} className="form-signin"></form>
        <h1
          className="h3 mb-3 font-weight-normal"
          style={{ textAlign: "center" }}
        >
          Sign in
        </h1>
        <p style={{ textAlign: "center" }}> </p>
        <input
          type="email"
          id="inputEmail"
          className="form-control"
          placeholder="Email Address"
          name="email"
          onChange={handleChange}
          value={email}
          required
        />
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={password}
          required
        />
        <button
          className="btn btn-secondary btn-block"
          onClick={handleSubmit}
          type="submit"
        >
          <i className="fas fa-sign-in-alt"></i> Sign in
        </button>
        <br></br>
        OR<br></br>
        <h1
          className="h3 mb-3 font-weight-normal"
          style={{ textAlign: "center" }}
        >
          Sign Up
        </h1>
        <input
          type="email"
          id="inputEmail"
          className="form-control"
          placeholder="Email Address"
          name="email"
          onChange={handleChange}
          value={email}
          required
        />
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={password}
          required
        />
        <button
          className="btn btn-secondary btn-block"
          onClick={handleSubmit}
          type="submit"
        >
          <i className="fas fa-sign-in-alt"></i> Sign Up
        </button>
        <hr />
      </div>
    </div>
  );
};

export default Login;

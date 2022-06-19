import React, { useState } from "react";
import { useDispatch, useSelector, useReducer } from "react-redux";
import { logoutInitiate } from "../redux/actions";
import "./Login.css";
import { Redirect } from "react-router";
import { useHistory } from "react-router-dom";

const Home = () => {
  debugger;
  const { currentUser } = useSelector((state) => state.user);
  const data = useSelector((state) => state);
  const userMaxAllowance = useSelector((state) => state.user.userMaxAllowance);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleAuth = () => {
    if (currentUser) {
      dispatch(logoutInitiate());
    }
  };

  function createRedirect() {
    debugger;
    history.push("/create"); // navigate("/Create");
  }

  let items = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];
  let item_list = items.map((item, index) => {
    return (
      <table className="list-class">
        <tr>
          <td>Fuel Type:{item}</td>
          <td>Price:{item}</td>
        </tr>
        <tr>
          <td className="padding-left">Fuel Used:{item}</td>
          <td className="padding-left">Remove</td>
        </tr>
      </table>
    );
  });

  return (
    <div>
      <h2></h2>
      <br />
      <button className="btn btn-info" onClick={createRedirect}>
        Create List
      </button>
      <button className="btn btn-danger" onClick={handleAuth}>
        Logout
      </button>
      <br />

      <label className="allowance-remaining">
        Allowance Remaining: {userMaxAllowance}{" "}
      </label>
      {item_list}
    </div>
  );
};

export default Home;

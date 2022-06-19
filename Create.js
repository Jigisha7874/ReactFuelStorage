import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutInitiate, addData } from "../redux/actions";
import "./Login.css";

const Create = () => {
  debugger;
  const dispatch = useDispatch();
  const fuelData = useSelector((state) => state.user.fuelData);
  const userMaxAllowance = useSelector((state) => state.user.userMaxAllowance);
  const [inputValue, setInputValue] = useState("");
  const [item, setItem] = useState(
    fuelData.map((obj) => {
      return { label: obj.fuelType, value: obj.pricePerLiter };
    })[0]
  );

  const calculate = () => {
    debugger;
    let total = parseFloat(inputValue) * item.value;
    if (total < userMaxAllowance) {
      let data = {
        id: Date.now() + Math.random(),
        type: item.label,
        price: total,
        used: parseFloat(inputValue),
      };
      let finalBalance = userMaxAllowance - total;
      dispatch(
        addData({
          finalBalance,
          data,
        })
      );
      alert("Added successfully..");
    } else {
      alert("Don't have balance!!");
    }
  };
  return (
    <div>
      <table>
        <tr>
          <td className="">
            <select className="fuel_type" id="fuel_type">
              <option>Fuel Type</option>
              <option id="Petrol">Petrol</option>
              <option id="Diesel">Diesel</option>
              <option id="Gas">Gas</option>
            </select>
            <br />
            <input
              type="text"
              className="liters"
              placeholder="Enter Liters/ Charge Unit here"
            />
            <br />
            <button
              className="create btn btn-danger"
              value="create"
              onClick={calculate}
            >
              Create{" "}
            </button>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default Create;

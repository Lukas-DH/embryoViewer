import Link from "next/link";
import { React, useState } from "react";
import data from "../public/patienList.json";
import styles from "../styles/Patient.module.css";

function ListSearch(props) {
  const filteredData = data.filter((el) => {
    //if no input the return the original
    if (props.input.length === 0) {
      return null;
    }
    //return the item which contains the user input
    else {
      return (
        el.first_name.toLowerCase().includes(props.input) ||
        el.last_name.toLowerCase().includes(props.input)
      );
    }
  });
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th scope="col">Date of birth</th>
          </tr>
        </thead>
        {filteredData.map((item) => (
          <>
            <tr>
              <th key={item.id} scope="row">
                <Link
                  key={item.id}
                  href="/patient"
                  // onClick={props.onImageCownload}
                >
                  {item.first_name + " " + item.last_name}
                </Link>
              </th>
              <td>
                <button onClick={() => props.QRdownload(item.first_name)}>
                  {" "}
                  {item.random_num}
                </button>
              </td>{" "}
            </tr>
          </>
        ))}
      </table>
    </>
  );
}

export default ListSearch;

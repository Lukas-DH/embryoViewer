import Link from "next/link";
import { React, useState } from "react";
import data from "../public/patienList.json";
import styles from "../styles/Patient.module.css";

function ListSearch(props) {
  const filteredData = data.filter((el) => {
    //if no input the return the original
    if (props.input.length === "") {
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
    <ul>
      {filteredData.map((item) => (
        <Link key={item.id} href="/patient">
          <li key={item.id}>{item.random_num}</li>
        </Link>
      ))}
    </ul>
  );
}

export default ListSearch;

import Link from "next/link";
import { React, useState } from "react";

import styles from "../styles/Patient.module.css";

function ListSearch(props) {
  const filteredData = props.data.length === 0 ? [] : props.data;

  return (
    <>
      {filteredData.map((item, index) => (
        <Link
          key={crypto.randomUUID()}
          href="/createQR"
          onClick={() => {
            props.qUuid(item.dish_uuid);
            props.qRValue(
              item.patient_given_names + ", " + item.patient_name,
              item.dish_uuid
            );
          }}
          className={styles.card}
        >
          <h2> {item.patient_name + ", " + item.patient_given_names}</h2>
          <h5>
            dob:{" "}
            {item.patient_date_of_birth.replace(
              /^\[(\d{4}),\s*(\d{1,2}),\s*(\d{1,2})]$/,
              "$3-$2-$1"
            )}
          </h5>
          <h5>Patient ID: {item.identifier_1}</h5>
        </Link>
      ))}
    </>
  );
}

export default ListSearch;

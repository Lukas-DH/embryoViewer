import Link from "next/link";
import { React, useState } from "react";

import styles from "../styles/Patient.module.css";

function ListSearch(props) {
  // const convertToDateObject = ([year, month, day]) => {
  //   return new Date(year, month - 1, day);
  // };
  const filteredData =
    props.data.length === 0
      ? []
      : props.data.sort((a, b) => {
          return a.patient_date_of_birth - b.patient_date_of_birth;
        });

  // function formattedDate(dob) {
  //   const formattedDate = dob
  //     .match(/\[(\d{4}),\s*(\d{1,2}),\s*(\d{1,2})\]/)
  //     .slice(1)
  //     .map((value) => value.toString().padStart(2, "0"))
  //     .join("");
  //   return formattedDate;
  // }
  return (
    <>
      {filteredData.length < 1
        ? ""
        : filteredData.map((item, index) => {
            return (
              <Link
                key={index}
                href="/createQR"
                onClick={() => {
                  props.qUuid(item.dish_uuid);
                  props.qRValue(
                    item.patient_given_names,
                    // + ", " + item.patient_name
                    item.dish_uuid
                  );
                }}
                className={styles.card}
              >
                <h2>
                  {" "}
                  {
                    // item.patient_name + ", " +
                    item.patient_given_names
                  }
                </h2>
                <h5>
                  dob:{" "}
                  {item.patient_date_of_birth.replace(
                    /^\[(\d{4}),\s*(\d{1,2}),\s*(\d{1,2})]$/,
                    "$3-$2-$1"
                  )}
                </h5>
                <h5>Patient ID: {item.identifier_1}</h5>
                <h5>
                  Created:{" "}
                  {
                    new Date(item.record_created * 1000)
                      .toISOString()
                      .split("T")[0]
                  }
                </h5>
              </Link>
            );
          })}
    </>
  );
}

export default ListSearch;

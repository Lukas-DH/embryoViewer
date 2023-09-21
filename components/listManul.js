import Link from "next/link";
import { React, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Patient.module.css";
import hello from "./patientVideo";

function ListSearch(props) {
  // const convertToDateObject = ([year, month, day]) => {
  //   return new Date(year, month - 1, day);
  // };
  const filteredData =
    props.data.length === 0
      ? []
      : props.data.sort((a, b) => {
          return b.record_created - a.record_created;
        });
  const router = useRouter();
  async function handleClick(value) {
    console.log(`Scanned value: ${value}`);

    try {
      const result = await hello(value);

      // Access the returned values from the hello function
      const { dishRecord, sessionRecord } = result;
      // Do something with dishRecord and sessionRecord
      console.log("BRRRRRRAAAA", dishRecord);
      // Redirect to the next step

      router.push(sessionRecord.videoID.session_uuid);
      //change list order here testxxx

      // window.location.href = `https://10.13.45.201/files/video.json/${sessionRecord.videoID.session_uuid}/well01_zid99.mp4`;
    } catch (error) {
      // Handle any errors that occurred during the fetch calls
      console.log(error);
    }
  }

  return (
    <>
      {filteredData.length < 1
        ? ""
        : filteredData.map((item, index) => {
            return (
              <Link
                key={index}
                href="/manualSearch"
                onClick={() => {
                  handleClick(item.dish_uuid);
                }}
                className={styles.card}
              >
                <h2>
                  {" "}
                  {
                    // item.patient_name
                    // + ", " +
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

/* eslint-disable no-use-before-define */
import React from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import "./TagInput.css";
export default function TagInput({ Tags, setTags, value, placeholder }) {
  const onChange = (newTags) => {
    setTags(newTags);
  };
  return (
    <>
      <ReactTagInput
        style={{ background: "red" }}
        tags={Tags}
        placeholder={placeholder}
        maxTags={20}
        editable={true}
        readOnly={false}
        removeOnBackspace={true}
        onChange={onChange}
        // validator={(value) => {
        //   // Don't actually validate e-mails this way
        //   const isEmail = value.indexOf("@") !== -1;
        //   if (!isEmail) {
        //     alert("Please enter an e-mail address");
        //   }
        //   // Return boolean to indicate validity
        //   return isEmail;
        // }}
      />
      <pre>{JSON.stringify(Tags, null, 2)}</pre>
    </>
  );
}

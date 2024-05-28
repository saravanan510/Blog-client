import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import FormHelperText from "@mui/material/FormHelperText";

const TextEditor = ({ formik }) => {
  return (
    <div>
      <ReactQuill
        theme="snow"
        onChange={(value) => formik.setFieldValue("content", value)}
        onBlur={() => formik.setFieldTouched("content", true)}
        value={formik.values.content}
      />
      {formik.touched.content && formik.errors.content ? (
        <FormHelperText error>{formik.errors.content}</FormHelperText>
      ) : null}
    </div>
  );
};

export default TextEditor;

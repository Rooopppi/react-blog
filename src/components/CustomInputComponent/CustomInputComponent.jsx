/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import Warn from "../../style/Warn.styled";
import Input from "../../style/Input.styled";

const CustomInputComponent = ({
  field,
  form: { touched, errors },
  backgroundDark,
  ...props
}) => (
  <div>
    <Input backgroundDark={backgroundDark} type="text" {...field} {...props} />
    {touched[field.name] && errors[field.name] && (
      <Warn>{errors[field.name]}</Warn>
    )}
  </div>
);

export default CustomInputComponent;

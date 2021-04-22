import { useState } from "react";
import { useSelector } from "react-redux";

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChange = (event) => {
    console.log({ name: event.target.value });
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    values,
    setValues,
  };
};
export const useUser = () => {
  let auth = useSelector((state) => state.auth);
  let user = useSelector((state) => state.auth.user);
  const isAdmin = auth.user?.role_type === "admin";
  return {
    auth,
    user,
    isAdmin,
  };
};

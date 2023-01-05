import React, { useContext } from "react";
import { UserContext } from "../../context/UserComponentContext";

export const Home = () => {
  const { user } = useContext(UserContext);

  console.log(user);

  return (
    <>
      <h1>Welcome {user.name}!</h1>
    </>
  );
};

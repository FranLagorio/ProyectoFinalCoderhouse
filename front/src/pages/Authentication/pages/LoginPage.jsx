import { useEffect, useState } from "react";

import { Link as RouterLink, useNavigate } from "react-router-dom";

import { Alert, Button, Card, Grid, Link, Typography } from "@mui/material";
import { Google } from "@mui/icons-material";

import { AuthLayout } from "../layouts/AuthLayout";

import { loginUser } from "../../../api/backCoderAPI";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

import { CardBody, Form } from "reactstrap";
import { useContext } from "react";
import { UserContext } from "../../../context/UserComponentContext";
import { InputYupForm } from "../../../components/InputYupForm";

const handleGoogleSubmit = () => {
  alert("Pronto podras conectarte con tu cuenta de Google");
};

export const LoginPage = () => {
  const { user, setUser } = useContext(UserContext);
  const [alert, setAlert] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      navigate("/home");
    }
  }, [user, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert("");
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [alert]);

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {
      const user = {
        username: values.email,
        password: values.password,
      };

      loginUser(user, setUser, setAlert);
    },
  });

  return (
    <AuthLayout
      bgColorPick={
        "linear-gradient(343deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)"
      }>
      <Grid item md={6} lg={4} xl={4}>
        <Card style={{ borderRadius: 5, fontFamily: "poppins" }}>
          <Typography
            variant="h5"
            textAlign={"center"}
            style={{ margin: "1.5rem", marginTop: "3rem" }}>
            BACKEND CODERHOUSE 32080 {<br />} BIENVENIDO
          </Typography>

          <CardBody style={{ margin: "1rem" }}>
            <div className="p-2">
              <Form
                className="form-horizontal"
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}>
                <InputYupForm
                  validation={validation}
                  typeInput={"string"}
                  inputName={"email"}
                />
                <InputYupForm
                  validation={validation}
                  typeInput={"password"}
                  inputName={"password"}
                />

                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customControlInline"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="customControlInline">
                    Remember me
                  </label>
                </div>
                <div className="mt-3">
                  {alert ? <Alert severity="error">{alert}</Alert> : ""}
                </div>
                <div className="mt-4 text-center -50">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ width: "50%" }}>
                    Log In
                  </Button>
                </div>

                <div className="mt-2 text-center">
                  <Button
                    variant="outlined"
                    sx={{ width: "50%" }}
                    onClick={() => handleGoogleSubmit()}>
                    <Google /> &nbsp; Google
                  </Button>
                </div>

                <div className="mt-3 d-flex flex-column align-items-center">
                  <Link sx={{ textDecoration: "none" }}>
                    {/* <Link to="/reset-password" className="text-muted"> */}
                    Forgot your password?
                  </Link>
                  <div className="mt-2">
                    Don't have an account?{" "}
                    <Link
                      component={RouterLink}
                      to="/register"
                      sx={{ textDecoration: "none" }}>
                      Register
                    </Link>
                  </div>
                </div>
              </Form>
            </div>
          </CardBody>
        </Card>
      </Grid>
    </AuthLayout>
  );
};

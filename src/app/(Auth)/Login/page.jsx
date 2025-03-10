"use client";
import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  Row,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useForm, FormProvider } from "react-hook-form";
import TextField from "@/components/ui/text-field";
import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/navigation";
import { LoginUser } from "@/lib/state/slice/auth/LoginSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();

  const methods = useForm({
    defaultValues: {
      email: "", // Sesuai dengan API (huruf kecil)
      password: "", // Sesuai dengan API (huruf kecil)
    },
    mode: "onSubmit",
  });

  const handleLogin = async (values) => {
    setErrorMessage(null);

    const result = await dispatch(LoginUser(values));

    if (result.meta.requestStatus === "fulfilled") {
      setTimeout(() => {
        router.push("/");
      }, [1000]);
    } else {
      setErrorMessage(
        result.payload || "Terjadi kesalahan. Silakan coba lagi."
      );
    }
  };

  return (
    <FormProvider {...methods}>
      <section className="sign-in-page">
        <Container className=" sign-in-page-bg mb-md-5 mb-3 p-0">
          <Row className="row no-gutters">
            <Col md="6" className="text-center">
              <div className="sign-in-detail text-white">
                <Image
                  src="/Images/logo-quilvian-1.png"
                  className="img-fluid sign-in-logo mb-4"
                  alt="logo"
                />
              </div>
            </Col>
            <Col md="6" className="position-relative">
              <div className="sign-in-from">
                <Image
                  src="/Images/logo_mmc.png"
                  className="img-fluid mt-5"
                  alt="logo-MMC"
                />
                <Form
                  className="mt-4"
                  onSubmit={methods.handleSubmit(handleLogin)}
                >
                  {errorMessage && (
                    <Alert variant="danger">{errorMessage}</Alert>
                  )}

                  {/* Email Field */}
                  <TextField
                    label="Email"
                    name="email"
                    type="text"
                    placeholder="Enter email"
                    className="form-control mb-0"
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Invalid email format",
                      },
                    }}
                  />

                  {/* Password Field */}
                  <TextField
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="form-control mb-0"
                    rules={{
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long",
                      },
                    }}
                  />

                  <div className="d-flex w-100 justify-content-between align-items-center mt-3">
                    <Button
                      type="submit"
                      className="btn btn-primary float-end"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Spinner
                            animation="border"
                            size="sm"
                            className="me-2"
                          />
                          Logging in...
                        </>
                      ) : (
                        "Sign in"
                      )}{" "}
                    </Button>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </FormProvider>
  );
};

export default LoginPage;

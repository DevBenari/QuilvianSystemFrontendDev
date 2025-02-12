"use client";
import Link from "next/link";
import React, { Fragment } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { useForm, FormProvider } from "react-hook-form";
import TextField from "@/components/ui/text-field";
import { useDispatch } from "react-redux";
import { LoginUser } from "@/lib/state/slice/auth/LoginSlice";

const LoginPage = () => {
  const dispatch = useDispatch();

  const handleLogin = (values) => {
    dispatch(LoginUser(values))
      .then((result) => {
        if (result.payload) {
          console.log(result.payload);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = (data) => {
    handleLogin(data);
  };
  return (
    <FormProvider {...methods}>
      <section className="sign-in-page">
        <Container className="sign-in-page-bg mb-md-5 mb-3 p-0">
          <Row className="row no-gutters">
            <Col md="6" className="text-center">
              <div className="sign-in-detail text-white ">
                <Image
                  src="/Images/logo-quilvian-1.png"
                  className="img-fluid sign-in-logo mb-4"
                  alt="logo"
                ></Image>
              </div>
            </Col>
            <Col md="6" className="position-relative">
              <div className="sign-in-from">
                {/* <h1 className="mb-0">Sign in</h1>
                                <p>Enter your email address and password to access admin panel.</p> */}
                <Image
                  src="/Images/logo_mmc.png"
                  className="img-fluid mt-5"
                  alt="logo-MMC"
                />
                <Form
                  className="mt-4"
                  onSubmit={methods.handleSubmit(onSubmit)}
                >
                  <TextField
                    label="Email"
                    name="email"
                    type="text"
                    placeholder="Enter email"
                    className="form-control mb-0"
                    rules={{
                      required: "email is required",
                      pattern: {
                        value: 2,
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

                  {/* Remember Me Checkbox */}
                  <div className="d-flex w-100 justify-content-between align-items-center mt-3 w-100">
                    <div className="custom-control custom-checkbox d-inline-block mt-2 pt-1">
                      <Form.Check.Input
                        type="checkbox"
                        className="custom-control-input"
                        id="customCheck1"
                      />
                      <Form.Label
                        className="custom-control-label"
                        htmlFor="customCheck1"
                      >
                        Remember Me
                      </Form.Label>
                    </div>
                    <Button type="submit" className="btn btn-primary float-end">
                      Sign in
                    </Button>
                  </div>
                  <div className="sign-info">
                    <span className="dark-color d-inline-block line-height-2">
                      Dont have an account? <Link href="/sign-up">Sign up</Link>
                    </span>
                    <ul className="iq-social-media">
                      <li>
                        <Link href="/#">
                          <i className="ri-facebook-box-line"></i>
                        </Link>
                      </li>
                      <li>
                        <Link href="/#">
                          <i className="ri-twitter-line"></i>
                        </Link>
                      </li>
                      <li>
                        <Link href="/#">
                          <i className="ri-instagram-line"></i>
                        </Link>
                      </li>
                    </ul>
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

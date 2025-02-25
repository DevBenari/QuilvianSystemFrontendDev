"use client";
import Link from "next/link";
import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  Row,
  Alert,
} from "react-bootstrap";
import { useForm, FormProvider } from "react-hook-form";
import TextField from "@/components/ui/text-field";
import { useDispatch } from "react-redux";
import { LoginUser } from "@/lib/state/slice/auth/LoginSlice";
import { useRouter } from "next/navigation";
import { showAlert } from "@/components/features/alert/custom-alert";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const router = useRouter(); // Untuk navigasi

  const methods = useForm({
    defaultValues: {
      Email: "", // Sesuai dengan API
      Password: "", // Sesuai dengan API
    },
    mode: "onSubmit",
  });

  const handleLogin = async (values) => {
    setErrorMessage(null);
    setSuccessMessage(null);

    dispatch(LoginUser(values))
      .then((result) => {
        const responseMessage = result.payload?.message?.toLowerCase(); // Ambil pesan API dan ubah ke huruf kecil

        if (!responseMessage) {
          setErrorMessage("Terjadi kesalahan. Silakan coba lagi.");
          return;
        }

        if (responseMessage.includes("user belum terdaftar")) {
          // Jika user tidak terdaftar
          setErrorMessage(
            "User belum terdaftar. Silakan cek email dan password."
          );
          showAlert.error("User belum terdaftar. Silakan coba lagi.");
          console.error("Login failed:", result.payload.message);
        } else if (responseMessage.includes("password salah")) {
          // Jika password salah

          showAlert.error("Password salah. Silakan coba lagi.");
          console.error("Login failed:", result.payload.message);
        } else if (result.payload) {
          // Jika login berhasil
          showAlert.success("Anda Berhasil Login", () => {
            setTimeout(() => {
              router.push("/"); // Redirect ke halaman utama
            }, 500);
          });
          console.log("Login successful:", result.payload);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
                  {/* Alert untuk error dan sukses */}
                  {errorMessage && (
                    <Alert variant="danger">{errorMessage}</Alert>
                  )}
                  {successMessage && (
                    <Alert variant="success">{successMessage}</Alert>
                  )}

                  {/* Email Field */}
                  <TextField
                    label="Email"
                    name="Email"
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
                    name="Password"
                    type="password"
                    placeholder="Password"
                    className="form-control mb-0"
                    rules={{
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long",
                      },
                      pattern: {
                        value: /^(?=.*[A-Z])(?=.*\d).{6,}$/,
                        message:
                          "Password must contain at least 1 uppercase letter and 1 number",
                      },
                    }}
                  />

                  {/* Remember Me Checkbox */}
                  <div className="d-flex w-100 justify-content-between align-items-center mt-3">
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

                  {/* Sign Up and Social Links */}
                  <div className="sign-info">
                    <span className="dark-color d-inline-block line-height-2">
                      Don’t have an account?{" "}
                      <Link href="/sign-up">Sign up</Link>
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

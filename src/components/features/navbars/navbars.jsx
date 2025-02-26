"use client";
import React, { Fragment, memo, useEffect, useState } from "react";
import { Navbar, Dropdown, Form, Image } from "react-bootstrap";
import CustomToggle from "@/components/ui/dropdown";
import FullScreen from "@/components/ui/fullscreen";
import Link from "next/link";

import UseIsMobile from "@/lib/hooks/useIsMobile";
import Sidemenu from "./side-menu";
// import user1 from "@/assets/images/user/1.jpg";
// import user2 from "@/assets/images/user/02.jpg";
// import user3 from "@/assets/images/user/03.jpg";
// import user4 from "@/assets/images/user/04.jpg";
// import user5 from "@/assets/images/user/05.jpg";

const Navbars = memo(({ module }) => {
  // const [isFixed, setIsFixed] = useState(false);

  // useEffect(() => {
  //     const handleScroll = () => {
  //       if (window.scrollY >= 75) {
  //         setIsFixed(true);
  //       } else {
  //         setIsFixed(false);
  //       }
  //     };

  //     window.addEventListener("scroll", handleScroll);

  //     return () => {
  //       window.removeEventListener("scroll", handleScroll);
  //     };
  //   }, []);
  const isMobile = UseIsMobile(1000);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  console.log("isMobile:", isMobile);

  const [isClicked, setIsClicked] = useState(false);
  const minisidebar = () => {
    setIsClicked(isClicked);
    document.body.classList.toggle("sidebar-main");
  };
  return (
    <Fragment>
      <div className={`iq-top-navbar fixed-header `}>
        <div className="iq-navbar-custom ">
          <Navbar expand="lg" variant="light" className="p-0">
            <div className="iq-search-bar">
              <form action="#" className="searchbox">
                <input
                  type="text"
                  className="text search-input"
                  placeholder="Type here to search..."
                />
                <Link className="search-link " href={"/#"}>
                  <i className="ri-search-line"></i>
                </Link>
              </form>
            </div>

            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="ri-menu-3-line"></i>
            </button>
            <div className="iq-menu-bt align-self-center">
              <div className="wrapper-menu">
                <div className="main-circle">
                  <i className="ri-more-fill"></i>
                </div>
                <div className="hover-circle">
                  <i className="ri-more-2-fill" onClick={minisidebar}></i>
                </div>
                <div className="align-self-center">
                  {/* SideMenu hanya muncul di mobile */}
                  {isMobile && <Sidemenu module={module} />}
                </div>
              </div>
            </div>

            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ml-auto navbar-list">
                {/* <li className="nav-item iq-full-screen"> */}
                <div className="iq-waves-effect" id="btnFullscreen">
                  <FullScreen />
                </div>
                {/* </li> */}
                <Dropdown as="li" className="nav-item">
                  <Dropdown.Toggle
                    as={CustomToggle}
                    // className="search-toggle iq-waves-effect"
                  >
                    <i className="ri-notification-3-fill"></i>
                    <span className="bg-danger dots"></span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="iq-sub-dropdown">
                    <div className="iq-card shadow-none m-0">
                      <div className="iq-card-body p-0 ">
                        <div className="bg-primary p-3">
                          <h5 className="mb-0 text-white d-flex justify-content-between">
                            All Notifications
                            <small className="badge  badge-dark float-right pt-1">
                              4
                            </small>
                          </h5>
                        </div>
                        <Dropdown.Item className="iq-sub-card">
                          <div className="media align-items-center d-flex">
                            <div className="">
                              {/* <Image
                                    className="avatar-40 rounded"
                                    src={user1}
                                    alt=""
                                /> */}
                            </div>
                            <div className="media-body ms-3">
                              <h6 className="mb-0 ">Emma Watson Bini</h6>
                              <small className="float-end font-size-12">
                                Just Now
                              </small>
                              <p className="mb-0">95 MB</p>
                            </div>
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item className="iq-sub-card">
                          <div className="media align-items-center d-flex">
                            <div className="">
                              {/* <Image
                                    className="avatar-40 rounded"
                                    src={user2}
                                    alt=""
                                /> */}
                            </div>
                            <div className="media-body ms-3">
                              <h6 className="mb-0 ">New customer is join</h6>
                              <small className="float-end font-size-12">
                                5 days ago
                              </small>
                              <p className="mb-0">Jond Bini</p>
                            </div>
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item className="iq-sub-card">
                          <div className="media align-items-center d-flex">
                            <div className="">
                              {/* <Image
                                    className="avatar-40 rounded"
                                    src={user3}
                                    alt=""
                                /> */}
                            </div>
                            <div className="media-body ms-3">
                              <h6 className="mb-0 ">Two customer is left</h6>
                              <small className="float-end font-size-12">
                                2 days ago
                              </small>
                              <p className="mb-0">Jond Bini</p>
                            </div>
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item className="iq-sub-card">
                          <div className="media align-items-center d-flex">
                            <div className="">
                              {/* <Image
                                    className="avatar-40 rounded"
                                    src={user4}
                                    alt=""
                                /> */}
                            </div>
                            <div className="media-body ms-3">
                              <h6 className="mb-0 ">New Mail from Fenny</h6>
                              <small className="float-end font-size-12">
                                3 days ago
                              </small>
                              <p className="mb-0">Jond Bini</p>
                            </div>
                          </div>
                        </Dropdown.Item>
                      </div>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown as="li" className="nav-item ">
                  <Dropdown.Toggle
                    as={CustomToggle}
                    className="search-toggle iq-waves-effect"
                  >
                    <i className="ri-mail-open-fill"></i>
                    <span className="bg-primary count-mail"></span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="iq-sub-dropdown">
                    <div className="iq-card shadow-none m-0">
                      <div className="iq-card-body p-0 ">
                        <div className="bg-primary p-3">
                          <h5 className="mb-0 text-white d-flex justify-content-between">
                            All Messages
                            <small className="badge  badge-dark float-right pt-1">
                              5
                            </small>
                          </h5>
                        </div>
                        <Dropdown.Item className="iq-sub-card">
                          <div className="media align-items-center d-flex">
                            <div className="">
                              {/* <Image
                                    className="avatar-40 rounded"
                                    src={user1}
                                    alt=""
                                /> */}
                            </div>
                            <div className="media-body ms-3">
                              <h6 className="mb-0 ">Bini Emma Watson</h6>
                              <small className="float-left font-size-12">
                                13 Jun
                              </small>
                            </div>
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item className="iq-sub-card">
                          <div className="media align-items-center d-flex">
                            <div className="">
                              {/* <Image
                                    className="avatar-40 rounded"
                                    src={user2}
                                    alt=""
                                /> */}
                            </div>
                            <div className="media-body ms-3">
                              <h6 className="mb-0 ">Lorem Ipsum Watson</h6>
                              <small className="float-left font-size-12">
                                20 Apr
                              </small>
                            </div>
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item className="iq-sub-card">
                          <div className="media align-items-center d-flex">
                            <div className="">
                              {/* <Image
                                    className="avatar-40 rounded"
                                    src={user3}
                                    alt=""
                                /> */}
                            </div>
                            <div className="media-body ms-3">
                              <h6 className="mb-0 ">Why do we use it?</h6>
                              <small className="float-left font-size-12">
                                30 Jun
                              </small>
                            </div>
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item className="iq-sub-card">
                          <div className="media align-items-center d-flex">
                            <div className="">
                              {/* <Image
                                    className="avatar-40 rounded"
                                    src={user4}
                                    alt=""
                                /> */}
                            </div>
                            <div className="media-body ms-3">
                              <h6 className="mb-0 ">Variations Passages</h6>
                              <small className="float-left font-size-12">
                                12 Sep
                              </small>
                            </div>
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item className="iq-sub-card">
                          <div className="media align-items-center d-flex">
                            <div className="">
                              {/* <Image
                                    className="avatar-40 rounded"
                                    src={user5}
                                    alt=""
                                /> */}
                            </div>
                            <div className="media-body ms-3">
                              <h6 className="mb-0 ">Lorem Ipsum generators</h6>
                              <small className="float-left font-size-12">
                                5 Dec
                              </small>
                            </div>
                          </div>
                        </Dropdown.Item>
                      </div>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>
              </ul>
            </div>

            <ul className="navbar-list">
              <Dropdown as="li">
                <Dropdown.Toggle
                  as={CustomToggle}
                  variant="search-toggle iq-waves-effect d-flex align-items-center gap-2"
                >
                  <Image
                    src="/Images/jamal.jpg"
                    className="img-fluid rounded mr-3"
                    alt="user"
                  />
                  <div className="caption">
                    <h6 className="mb-0 line-height">Bini Jets</h6>
                    <span className="font-size-12">Available</span>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className="iq-sub-dropdown iq-user-dropdown">
                  <div className="iq-card shadow-none m-0">
                    <div className="iq-card-body p-0 ">
                      <div className="bg-primary p-3">
                        <h5 className="mb-0 text-white line-height">
                          Hello Bini Jets
                        </h5>
                        <span className="text-white font-size-12">
                          Available
                        </span>
                      </div>
                      <Dropdown.Item
                        href="/doctors-profile"
                        className="iq-sub-card iq-bg-primary-hover"
                      >
                        <div className="media align-items-center d-flex">
                          <div className="rounded iq-card-icon iq-bg-primary">
                            <i className="ri-file-user-line"></i>
                          </div>
                          <div className="media-body ms-3">
                            <h6 className="mb-0 ">My Profile</h6>
                            <p className="mb-0 font-size-12">
                              View personal profile details.
                            </p>
                          </div>
                        </div>
                      </Dropdown.Item>
                      <Dropdown.Item
                        href="/edit-doctors"
                        className="iq-sub-card iq-bg-primary-hover"
                      >
                        <div className="media align-items-center d-flex">
                          <div className="rounded iq-card-icon iq-bg-primary">
                            <i className="ri-profile-line"></i>
                          </div>
                          <div className="media-body ms-3">
                            <h6 className="mb-0 ">Edit Profile</h6>
                            <p className="mb-0 font-size-12">
                              Modify your personal details.
                            </p>
                          </div>
                        </div>
                      </Dropdown.Item>
                      <Dropdown.Item
                        href="/account-setting"
                        className="iq-sub-card iq-bg-primary-hover"
                      >
                        <div className="media align-items-center d-flex">
                          <div className="rounded iq-card-icon iq-bg-primary">
                            <i className="ri-account-box-line"></i>
                          </div>
                          <div className="media-body ms-3">
                            <h6 className="mb-0 ">Account settings</h6>
                            <p className="mb-0 font-size-12">
                              Manage your account parameters.
                            </p>
                          </div>
                        </div>
                      </Dropdown.Item>
                      <Dropdown.Item
                        href="/privacy-setting"
                        className="iq-sub-card iq-bg-primary-hover"
                      >
                        <div className="media align-items-center d-flex">
                          <div className="rounded iq-card-icon iq-bg-primary">
                            <i className="ri-lock-line"></i>
                          </div>
                          <div className="media-body ms-3">
                            <h6 className="mb-0 ">Privacy Settings</h6>
                            <p className="mb-0 font-size-12">
                              Control your privacy parameters.
                            </p>
                          </div>
                        </div>
                      </Dropdown.Item>
                      <div className="d-inline-block w-100 text-center p-3">
                        <Link
                          className="bg-primary iq-sign-btn"
                          href={"/#"}
                          role="button"
                        >
                          Sign out<i className="ri-login-box-line ml-2"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </ul>
          </Navbar>
        </div>
      </div>
    </Fragment>
  );
});
Navbars.displayName = "Navbars";
export default Navbars;

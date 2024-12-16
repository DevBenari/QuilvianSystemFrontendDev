import React, { useState, useContext, memo, Fragment } from "react";
import {
    Accordion,
    useAccordionButton,
    AccordionContext,
    Tooltip,
    OverlayTrigger,
  } from "react-bootstrap";
  import SidebarMenu from "./sidebar-menu";
  import ToggleCustom from "@/components/ui/ToggleCustom";


  const SideBarItems = memo(() => {
    const [activeMenu, setActiveMenu] = useState(false);
    const [active, setActive] = useState("");

    const toggleActive = (key) => {
        // Toggle antara "email" dan null untuk mengatur apakah menu aktif atau tidak
        setActive(active === key ? null : key);
      };
    return (
        <Fragment>
            <nav className="iq-sidebar-menu">
                <Accordion as="ul" className="iq-menu">
                    <li className="iq-menu-title">
                        <i className="ri-subtract-line"></i>
                        <span>Dashboard</span>
                    </li>
                    <SidebarMenu
                        isTag="true"
                        pathname="/pendaftaran"
                        title="pendaftaran"
                    >
                        <i className="ri-briefcase-4-fill"></i>
                    </SidebarMenu>
                    <SidebarMenu
                        isTag="true"
                        pathname="/Dokter"
                        title="Dokter"
                    >
                        <i className="ri-briefcase-4-fill"></i>
                    </SidebarMenu>
                    <SidebarMenu
                        isTag="true"
                        pathname="/IGD"
                        title="IGD"
                    >
                        <i className="ri-briefcase-4-fill"></i>
                    </SidebarMenu>
                    <SidebarMenu
                        isTag="true"
                        pathname="/Laboratorium"
                        title="laboratorium"
                    >
                        <i className="ri-briefcase-4-fill"></i>
                    </SidebarMenu>
                    <SidebarMenu
                        isTag="true"
                        pathname="/Radiologi"
                        title="Radiologi"
                    >
                        <i className="ri-briefcase-4-fill"></i>
                    </SidebarMenu>
                    <SidebarMenu
                        isTag="true"
                        pathname="/rehab-medik"
                        title="Rehab Medik"
                    >
                        <i className="ri-briefcase-4-fill"></i>
                    </SidebarMenu>
                    <SidebarMenu
                        isTag="true"
                        pathname="/gizi-medik"
                        title="Gizi Medik"
                    >
                        <i className="ri-briefcase-4-fill"></i>
                    </SidebarMenu>
                    <SidebarMenu
                        isTag="true"
                        pathname="/hemodialisa"
                        title="Hemodialisa"
                    >
                        <i className="ri-briefcase-4-fill"></i>
                    </SidebarMenu>
                    <SidebarMenu
                        isTag="true"
                        pathname="/ruang-bedah"
                        title="Ruang Bedah/VK"
                    >
                        <i className="ri-briefcase-4-fill"></i>
                    </SidebarMenu>
                    <SidebarMenu
                        isTag="true"
                        pathname="/ruang-rawat-inap"
                        title="Ruang Rawat Inap"
                    >
                        <i className="ri-briefcase-4-fill"></i>
                    </SidebarMenu>
                    <SidebarMenu
                        isTag="true"
                        pathname="/mcu"
                        title="MCU"
                    >
                        <i className="ri-briefcase-4-fill"></i>
                    </SidebarMenu>
                    <SidebarMenu
                        isTag="true"
                        pathname="/bank-darah"
                        title="Bank Darah"
                    >
                        <i className="ri-briefcase-4-fill"></i>
                    </SidebarMenu>
                    <SidebarMenu
                        isTag="true"
                        pathname="/rekam-medis"
                        title="Rekam Medis"
                    >
                        <i className="ri-briefcase-4-fill"></i>
                    </SidebarMenu>
                    <SidebarMenu
                        isTag="true"
                        pathname="/kasir"
                        title="Kasir"
                    >
                        <i className="ri-briefcase-4-fill"></i>
                    </SidebarMenu>
                    <SidebarMenu
                        isTag="true"
                        pathname="/keuangan-akunting"
                        title="Keuangan dan Akunting"
                    >
                        <i className="ri-briefcase-4-fill"></i>
                    </SidebarMenu>
                    <SidebarMenu
                        isTag="true"
                        pathname="/crm"
                        title="CRM"
                    >
                        <i className="ri-briefcase-4-fill"></i>
                    </SidebarMenu>
                    <SidebarMenu
                        isTag="true"
                        pathname="/purchasing"
                        title="Purchasing"
                    >
                        <i className="ri-briefcase-4-fill"></i>
                    </SidebarMenu>
                    <SidebarMenu
                        isTag="true"
                        pathname="/warehouse"
                        title="Warehouse"
                    >
                        <i className="ri-briefcase-4-fill"></i>
                    </SidebarMenu>
                    <SidebarMenu
                        isTag="true"
                        pathname="/depo"
                        title="Depo"
                    >
                        <i className="ri-briefcase-4-fill"></i>
                    </SidebarMenu>
                    <SidebarMenu
                        isTag="true"
                        pathname="/farmasi"
                        title="Farmasi"
                    >
                        <i className="ri-briefcase-4-fill"></i>
                    </SidebarMenu>
                    <SidebarMenu
                        isTag="true"
                        pathname="/report"
                        title="Report   "
                    >
                        <i className="ri-briefcase-4-fill"></i>
                    </SidebarMenu>
                </Accordion>

            </nav>
            <div className="p-3"></div>
        </Fragment>
    )
  })

  SideBarItems.displayName = "SideBarItems"
  export default SideBarItems

  {/* <Accordion.Item
                        as="li"
                        eventKey="email-menu"
                        bsPrefix={`${active === "email" ? "active menu-open" : ""} `}
                        onClick={() => toggleActive("email")}
                    >
                        <ToggleCustom
                        eventKey="email-menu"
                        onClick={(activeKey) => setActiveMenu(activeKey)}
                        >
                        <OverlayTrigger
                            placement="right"
                            overlay={<Tooltip>Admisi</Tooltip>}
                        >
                            <i className="ri-mail-open-fill"></i>
                        </OverlayTrigger>
                        <span className="item-name">Admisi</span>
                        <i className="ri-arrow-right-s-line iq-arrow-right"></i>
                        </ToggleCustom>
                        <Accordion.Collapse eventKey="email-menu">
                        <ul className="iq-submenu collapse menu-open">
                            <SidebarMenu
                                isTag="false"
                                staticIcon="true"
                                iconClass="ri-inbox-fill"
                                pathname="/app/pendaftaran-pasien"
                                title="Pendaftaran Pasien"
                            ></SidebarMenu>
                            <SidebarMenu
                                isTag="false"
                                staticIcon="true"
                                iconClass="ri-edit-2-fill"
                                pathname="/app/List Pasien"
                                title="List Pasien"
                            ></SidebarMenu>
                        </ul>
                        </Accordion.Collapse>
                    </Accordion.Item>
                    <SidebarMenu
                        isTag="true"
                        pathname="/asuransi"
                        title="Asuransi"
                    >
                        <i className="ri-briefcase-4-fill"></i>
                    </SidebarMenu>
                    <SidebarMenu
                        isTag="true"
k                     pathname="/kasir"
                        title="Kasir"
                    >
                        <i className="ri-briefcase-4-fill"></i>
                    </SidebarMenu>
                    <SidebarMenu
                        isTag="true"
                        pathname="/rawat-jalan"
                        title="Rawat Jalan"
                    >
                        <i className="ri-briefcase-4-fill"></i>
                    </SidebarMenu>
                    <SidebarMenu
                        isTag="true"
                        pathname="/rawat-inap"
                        title="Rawat Inap"
                    >
                        <i className="ri-briefcase-4-fill"></i>
                    </SidebarMenu>
                    <SidebarMenu
                        isTag="true"
                        pathname="/farmasi"
                        title="Farmasi"
                    >
                        <i className="ri-briefcase-4-fill"></i>
                    </SidebarMenu>
                    <SidebarMenu
                        isTag="true"
                        pathname="/igd"
                        title="IGD"
                    >
                        <i className="ri-briefcase-4-fill"></i>
                    </SidebarMenu>
                    <SidebarMenu
                        isTag="true"
                        pathname="/icu"
                        title="ICU"
                    >
                        <i className="ri-briefcase-4-fill"></i>
                    </SidebarMenu>
                    <SidebarMenu
                        isTag="true"
                        pathname="/crm"
                        title="CRM"
                    >
                        <i className="ri-briefcase-4-fill"></i>
                    </SidebarMenu>
                    <li className="iq-menu-title">
                        <i className="ri-subtract-line"></i>
                        <span>Departements</span>
                    </li>

                    <Accordion.Item
                        as="li"
                        eventKey="pelayanan-medik-menu"
                        bsPrefix={`${active === "pelayanan-medik" ? "active menu-open" : ""} `}
                        onClick={() => toggleActive("pelayanan-medik")}
                    >
                        <ToggleCustom
                        eventKey="pelayanan-medik-menu"
                        onClick={(activeKey) => setActiveMenu(activeKey)}
                        >
                        <OverlayTrigger
                            placement="right"
                            overlay={<Tooltip>Pelayanan Medic</Tooltip>}
                        >
                            <i className="ri-mail-open-fill"></i>
                        </OverlayTrigger>
                        <span className="item-name">Pelayanan Medic</span>
                        <i className="ri-arrow-right-s-line iq-arrow-right"></i>
                        </ToggleCustom>
                        <Accordion.Collapse eventKey="pelayanan-medik-menu">
                        <ul className="iq-submenu collapse menu-open">
                            <SidebarMenu
                                isTag="false"
                                staticIcon="true"
                                iconClass="ri-inbox-fill"
                                pathname="/pelayanan-medik/instalasi-medik"
                                title="Instansi Rawat Intensif"
                            ></SidebarMenu>
                            <SidebarMenu
                                isTag="false"
                                staticIcon="true"
                                iconClass="ri-edit-2-fill"
                                pathname="/app/List Pasien"
                                title="List Pasien"
                            ></SidebarMenu>
                        </ul>
                        </Accordion.Collapse>
                    </Accordion.Item> */}
import React, { useState } from "react";
import { Tab, Nav, Col } from "react-bootstrap";

const ReusableTabs = ({ children }) => {
  const defaultKey = children[0]?.props.eventKey || "";

  return (
    <Tab.Container defaultActiveKey={defaultKey}>
      <Col sm={12}>
        <Nav
          as="ul"
          className="nav nav-pills mb-3 nav-fill"
          id="pills-tab"
          role="tablist"
        >
          {children.map((child) => (
            <Nav.Item key={child.props.eventKey} as="li">
              <Nav.Link
                eventKey={child.props.eventKey}
                id={`tab-${child.props.eventKey}`}
                data-bs-toggle="pill"
                aria-controls={`pane-${child.props.eventKey}`}
              >
                {child.props.title}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </Col>
      <Col sm={12}>
        <Tab.Content className="tab-content">
          {children.map((child) => (
            <Tab.Pane
              key={child.props.eventKey}
              eventKey={child.props.eventKey}
              id={`pane-${child.props.eventKey}`}
              aria-labelledby={`tab-${child.props.eventKey}`}
            >
              {child.props.children}
            </Tab.Pane>
          ))}
        </Tab.Content>
      </Col>
    </Tab.Container>
  );
};

const TabItem = ({ eventKey, title, children }) => {
  // Komponen ini hanya berfungsi sebagai wrapper untuk tab
  return null;
};

ReusableTabs.TabItem = TabItem;

export default ReusableTabs;

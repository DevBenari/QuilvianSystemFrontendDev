'use client'
import React, { Fragment, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
  Row,
} from "react-bootstrap";
import { useForm } from "react-hook-form";

const FormValidations = () => {
    const methods = useForm({
        defaultValues:{
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    })

  return (
    <div>
        <div className="iq-card">
            <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                    <h4 className="card-title">Tooltips</h4>
                </div>
            </div>
            <div className="iq-card-body">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vulputate, ex ac venenatis mollis, diam nibh finibus leo</p>
                <Form className="needs-validation" noValidate
                >
                    <Row>
                        <Col md='6' className="mb-3 position-relative">
                            <FormLabel className="mb-0" htmlFor="validationTooltip01">First name</FormLabel>
                            <FormControl type="text" className="form-control" id="validationTooltip01" defaultValue="Mark" required />
                            <div className="valid-tooltip">
                            Looks good!
                            </div>
                        </Col>
                        <Col md='6' className="mb-3 position-relative">
                            <FormLabel className="mb-0" htmlFor="validationTooltip02">Last name</FormLabel>
                            <FormControl type="text" className="form-control" id="validationTooltip02" defaultValue="Jets" required />
                            <div className="valid-tooltip">
                            Looks good!
                            </div>
                        </Col>
                        <Col md='6' className="mb-3 position-relative">
                            <FormLabel className="mb-0" htmlFor="validationDefaultUsername">Username</FormLabel>
                            <div className="input-group">
                            <span className="input-group-text" id="inputGroupPrepend2">@</span>
                            <FormControl type="text" className="form-control" id="validationDefaultUsername"  aria-describedby="inputGroupPrepend2" required />
                            <div className="invalid-tooltip">
                                Please choose a unique and valid username.
                            </div>
                            </div>
                        </Col>
                        <Col md='6' className="mb-3 position-relative">
                            <FormLabel className="mb-0" htmlFor="validationTooltip03">City</FormLabel>
                            <FormControl type="text" className="form-control" id="validationTooltip03" required />
                            <div className="invalid-tooltip">
                                Please provide a valid city.
                            </div>
                        </Col>
                        <Col md='6' className="mb-3 position-relative">
                            <FormLabel className="mb-0" htmlFor="validationTooltip04">State</FormLabel>
                            <FormSelect className="form-control" id="validationTooltip04" required>
                            <option defaultValue disabled>Choose...</option>
                            <option>...</option>
                            </FormSelect>
                            <div className="invalid-tooltip">
                            Please select a valid state.
                            </div>
                        </Col>
                        <Col md='6' className="mb-3 position-relative">
                            <FormLabel className="mb-0" htmlFor="validationTooltip05">Zip</FormLabel>
                            <FormControl type="text" className="form-control" id="validationTooltip05" required />
                            <div className="invalid-tooltip">
                                Please provide a valid zip.
                            </div>
                        </Col>
                    </Row>
                    <Button className="btn btn-primary" type="submit">Submit form</Button>
                </Form>
            </div>
        </div>
    </div>
  )
}

export default FormValidations

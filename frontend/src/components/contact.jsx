
import React from "react";
import { Row, Col } from "react-bootstrap";

export default function ContactSection() {
  return (
    <section className="contact pt-5">
      <Row>
        <h1 className="mt-5 text-center">Contact us</h1>
      </Row>

      <Row>
        <p className="fs-5 mt-5 text-center">
          Please feel free to contact us with any questions or concerns you may have.
          We will contact you shortly.
        </p>
      </Row>

      <Row className="mt-5 mb-5 justify-content-center">
        <Col md={2}></Col>
        <Col md={4}>
          <img
            src="https://i.postimg.cc/0yCrmffj/temp-Imagee-Mr508.avif"
            className="img-fluid ms-5"
            alt="contact-option-1"
          />
        </Col>
        <Col md={4}>
          <img
            src="https://i.postimg.cc/XYWpph9t/temp-Image5t0-PO0.avif"
            className="img-fluid ms-5"
            alt="contact-option-2"
          />
        </Col>
        <Col md={2}></Col>
      </Row>
    </section>
  );
}

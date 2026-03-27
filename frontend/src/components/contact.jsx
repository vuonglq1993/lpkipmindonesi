import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useLanguage } from "../context/LanguageContext";
import { Link } from "react-router-dom";
import "./contact.css";

export default function ContactSection() {
  const { language } = useLanguage();
  const [contactData, setContactData] = useState({});

  useEffect(() => {
    const fetchContact = async () => {
      const col = language === "en" ? "contactus" : "contactusjp";
      const snap = await getDoc(doc(db, col, "menu"));
      if (snap.exists()) {
        setContactData(snap.data());
      }
    };
    fetchContact();
  }, [language]);

  return (
    <section className="contact bg-white py-5 mb-0">
      <Row>
        <h1 className="mt-5 text-center">{contactData.title || "Contact us"}</h1>
      </Row>

      <Row>
        <p className="fs-5 mt-5 text-center">
          {contactData.text || "Please feel free to contact us with any questions or concerns you may have. We will contact you shortly."}
        </p>
      </Row>

      <Row className="mt-5 mb-5 justify-content-center">
        <Col md={2}></Col>
        <Col md={4}>
<p className="fs-4 fw-bold text-center" style={{ color: "#b80201" }} >
  Tel. <br />(+62) 812-8316-3842
</p>
        </Col>
        <Col md={4}>
        <Link to="/contact"><img
            src={contactData.img2}
            className="img-fluid ms-5"
            alt="contact-option-2"
          />
          </Link>
        </Col>
        <Col md={2}></Col>
      </Row>
    </section>
  );
}

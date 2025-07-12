import { Container, Row, Col, Button } from "react-bootstrap";
import logo from '../assets/LPKPMINDONESIA.png';

export default function Footer() {
    return (
        <Container className="bg-dark text-white">
            <Row className="text-start justify-content-center pb-4 pt-5">
                <Col md={9}>
                    <Row className="justify-content-center">
                        <Col md={3} className="px-3">
                            <h5 className="fw-bold">What we want to tell you</h5>
                            <ul className="list-unstyled mt-3 ms-3">
                                <li className="mt-2">Our thoughts</li>
                                <li className="mt-2">Our Strengths</li>
                                <li className="mt-2">Our Role</li>
                            </ul>
                        </Col>
                        <Col md={3} className="px-3">
                            <h5 className="fw-bold">About the system</h5>
                            <ul className="list-unstyled mt-3 ms-3">
                                <li className="mt-2">Technical Intern</li>
                                <li className="mt-2">Training Program</li>
                                <li className="mt-2">Specific skill</li>
                                <li className="mt-2">system</li>
                            </ul>
                        </Col>
                        <Col md={3} className="px-3">
                            <h5 className="fw-bold">Union overview</h5>
                            <ul className="list-unstyled mt-3 ms-3">
                                <li className="mt-2">Q&A</li>
                                <li className="mt-2">inquiry</li>
                                <li className="mt-2">Privacy Policy</li>
                            </ul>
                        </Col>
                        <Col md={3} className="text-center mt-4">
                            <a href="/contact">
                                <img
                                    src="http://toyo-coop.jp/tcsweb/wp-content/uploads/2022/03/ban-contact.png"
                                    alt="TOYO"
                                    className="img-fluid"
                                />
                            </a>

                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row className="text-center mt-4">
                <Col>
                    <img
                        src={logo}
                        alt="logo"
                        className="mb-3"
                        height={120}
                    />
                    <p>2nd floor, Kameido Tosei Building II , 6-1-8 Kameido, Koto-ku, Tokyo</p>
                    <p className="fs-5 fw-bold">Tel. 03-6807-0104</p>
                    <p className="text-muted small mt-3">
                        Copyright© TOYO COOPERATIVE SOCIETY All Rights Reserved.
                    </p>

                </Col>
            </Row>


        </Container>
    );
}

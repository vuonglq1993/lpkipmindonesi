import React from 'react';
import {Container, Row, Col } from 'react-bootstrap';
import './About.css';
import ContactSection from '../../components/contact';
export default function OurStrength() {
    return (
        <Container className="py-5">

            {/* Section Header */}
            <Row className="about-head">
                <p className="text-center fs-1 mb-5">Our Strength</p>
            </Row>

            {/* Hero Image + Caption */}
            <Row className="justify-content-center">
                <Col md={12}>
                    <Row className="justify-content-center">
                        <Col xs={10}>
                            <img
                                src="https://i.postimg.cc/L4NpzWdr/temp-Image-Hf2xxs.avif"
                                className="passion-img img-fluid"
                                alt="Main Visual"
                            />
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col xs={10}>
                            <img
                                src="https://i.postimg.cc/rFsLg9Mz/temp-Image-Nn-KA1z.avif"
                                className="passion-img img-fluid"
                                alt="Main Visual"
                            />
                        </Col>
                    </Row>
                    <Row className="mt-5 pb-5">
                        <p className="fs-1 text-center text-black">
                            Passion alone is not enough. We also have extensive
                            professional experience and a proven track record.

                        </p>
                    </Row>
                </Col>
            </Row>

            {/* Secondary Image */}
            <Row className="mt-4 justify-content-center">
                <Col xs={10} md={8}>
                    <img
                        src="https://i.postimg.cc/h4bkMqgM/temp-Image-ZNi-Wvt.avif"
                        className="img-fluid"
                        alt="Quote Visual"
                    />
                </Col>
            </Row>

            {/* Section st-01 */}
            <Row className="st-01">
                <Col>
                    <img
                        src="http://toyo-coop.jp/tcsweb/wp-content/uploads/2022/05/st-title01.png"
                        className="img-fluid"
                        alt="Quote Visual"
                    />
                    <p className="fs-2 mt-5">A long history of accepting students</p>
                    <p className="fs-6">The total number of companies accepting trainees is approximately 500, and the number of trainees exceeds 5,000.</p>
                    <p className="fs-2">Achievements covering a wide area from Hokkaido to Okinawa</p>
                    <p className="fs-6">One of our strengths is our ability to cover a wide area, mainly in the metropolitan area.</p>
                    <p className="fs-2">Obtained permission from a quality supervision organization</p>
                    <p className="fs-6">We have obtained permission for "general supervision business," which is proof of being a superior supervision organization.</p>

                </Col>
            </Row>

            {/* Section st-02 */}
            <Row className="st-02">
                <Col md={6}></Col>
                <Col md={6}>
                    <img
                        src="http://toyo-coop.jp/tcsweb/wp-content/uploads/2022/05/st-title02.png"
                        className="img-fluid"
                        alt="Quote Visual"
                    />
                    <p className="fs-2 mt-3 fw-bold">Passionate and thorough teaching</p>
                    <p className="fs-6">Experienced staff members will provide guidance and make regular visits to business premises, dormitories, and accommodation facilities.</p>
                    <p className="fs-2 mt-3 fw-bold">We have experienced, dedicated interpreters</p>
                    <p className="fs-6">We have full-time staff available to respond to emergencies, and we also have several female interpreters on staff who can assist female trainees.</p>
                    <p className="fs-2 mt-3 fw-bold">Rapid response when a problem occurs</p>
                    <p className="fs-6">In addition to responding quickly, we also focus on aftercare to prevent recurrence.</p>

                </Col>
            </Row>

            {/* Section st-03 */}
            <Row className="st-03">
                <Col>
                    <img
                        src="http://toyo-coop.jp/tcsweb/wp-content/uploads/2022/05/st-title03-1.png"
                        className="img-fluid"
                        alt="Quote Visual"
                    />
                    <p className="fs-2 mt-3 fw-bold">Adopting a system where each company has a designated person in charge</p>
                    <p className="fs-6">The person in charge will accurately grasp the situation at each workplace and provide appropriate supervision.</p>
                    <p className="fs-2 mt-3 fw-bold">Careful selection of sending organizations</p>
                    <p className="fs-6">We strive to identify sending organizations that can consistently send high-level trainees, including through objective evaluation of candidates during interviews.</p>
                    <p className="fs-2 mt-3 fw-bold">Conducting thorough and planned interviews with candidates</p>
                    <p className="fs-6">By conducting various tests that cannot be gauged through simple questions and answers, we are able to accurately identify the type of people we are looking for.</p>
                    <p className="fs-2 mt-3 fw-bold">Recommendations and support for obtaining Japanese language proficiency tests and qualifications</p>
                    <p className="fs-6">Encouraging employees to obtain qualifications will not only contribute to their Japanese language and technical acquisition, but also allow them to accumulate many successful experiences, which will help them maintain their motivation in the future.</p>
                </Col>
            </Row>

            {/* Section st-04 */}
            <Row className="st-04 text-center justify-content-center">
                <Col md={10}>
                    <div className="cycle-text-wrapper">
                        <p className="cycle-text">
                            As a result of being selected,<br />
                            the company and the union will enjoy <span className="highlight">a virtuous cycle ...</span>
                        </p>
                    </div>
                </Col>
            </Row>

            {/* Section st-05 */}
            <Row className="st-05">
                <Col md={5}>
                    <img
                        src="http://toyo-coop.jp/tcsweb/wp-content/uploads/2022/05/result01_1.png"
                        className="img-fluid"
                        alt="Quote Visual"
                    />
                </Col>
                <Col md={5}>
                    <img
                        src="http://toyo-coop.jp/tcsweb/wp-content/uploads/2022/05/result02_1.png"
                        className="img-fluid"
                        alt="Quote Visual"
                    />
                </Col>
                <Col md={5}>
                    <img
                        src="http://toyo-coop.jp/tcsweb/wp-content/uploads/2022/05/result03_1.png"
                        className="img-fluid"
                        alt="Quote Visual"
                    />
                </Col>
                <Col md={5}>
                    <img
                        src="http://toyo-coop.jp/tcsweb/wp-content/uploads/2022/05/result04_1.png"
                        className="img-fluid"
                        alt="Quote Visual"
                    />
                </Col>
            </Row>


            {/* Section contact */}
            <ContactSection />

        </Container>
    );
}

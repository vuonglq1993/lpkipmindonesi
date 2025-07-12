import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import './About.css';
import ContactSection from '../../components/contact';
export default function OurRole() {
    return (
        <Container className="py-5 bg-white">

            {/* Section Header */}
            <Row className="about-head">
                <p className="text-center fs-1 mb-5">Our Role</p>
            </Row>

            {/* Hero Image + Caption */}
            <Row className="justify-content-center ms-01">
                <Col md={12}>
                    <Row className="justify-content-center">
                        <Col xs={10}>
                            <img
                                src="http://toyo-coop.jp/tcsweb/wp-content/uploads/2022/09/yakuwari-title.jpg"
                                className="passion-img img-fluid"
                                alt="Main Visual"
                            />
                        </Col>
                    </Row>
                    <Row className="mt-5 pb-5">
                        <p className="fs-1 text-center text-black">
                            Our goal is to achieve results through a variety of solutions .

                        </p>
                    </Row>
                </Col>
            </Row>

            {/* Secondary Image */}
            <Row className="mt-4 justify-content-center text-center">
                <Col xs={10} md={8}>
                    <img
                        src="http://toyo-coop.jp/tcsweb/wp-content/uploads/2022/05/yakuwari-title02.png"
                        className="img-fluid"
                        alt="Quote Visual"
                    />
                </Col>
            </Row>

            {/* Section ms-02 */}
            <Row className="ms-02">
                <Col>
                    <h1>Continue to provide clear guidelines for accepting trainees</h1>

                    <p className="fs-2 mt-5">What is our mission as a supervisory organization?</p>
                    <p className="fs-2">What role should we play? What is our raison d'être and value?</p>
                    <p className="fs-2">We believe it is to "achieve results through various solutions."</p>
                </Col>
            </Row>

            {/* Section ms-03 */}
            <Row className="ms-03 justify-content-center text-center">
                <Col md={10}>
                    <img
                        src="http://toyo-coop.jp/tcsweb/wp-content/uploads/2022/09/kotaeru2-768x710.jpg"
                        className="img-fluid"
                        alt="Quote Visual"
                    />
                </Col>
            </Row>

            {/* Section ms-04 */}
            <Row className="ms-04 justify-content-center text-center pb-5">
                <Col md={7}>
                    <img
                        src="http://toyo-coop.jp/tcsweb/wp-content/uploads/2022/05/yaku-title02.jpg"
                        className="img-fluid"
                        alt="Quote Visual"
                    />

                    <p className="fs-1 mt-5 mb-5">Efforts will always be rewarded.
                        If there is any effort that is not rewarded,
                        it cannot be called effort.</p>



                </Col>
            </Row>

            {/* Section ms-05 */}
            <Row className="ms-05">
                <Col>
                    <h1>To allow more successful experiences</h1>
                    <p className="fs-1 mt-5">They keep trying even if it is difficult. We believe that the only way to help
                        them grow is to experience success after going through such hardships . They will never forget the joy they felt when they were able to communicate with someone for the first time, even if their Japanese was broken . If they can do it, the success of their training is all but guaranteed.
                    </p>
                </Col>
            </Row>

            {/* Section ms-06 */}
            <Row className="ms-06 text-center justify-content-center">
                <Col md={10}>
                <img
                        src="http://toyo-coop.jp/tcsweb/wp-content/uploads/2022/09/cheer-1.jpg"
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

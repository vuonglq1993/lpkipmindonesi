import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './About.css';
import ContactSection from '../../components/contact';

export default function OurThoughts() {
    return (
        <Container  className="py-5">

            {/* Section Header */}
            <Row className="about-head">
                <p className="text-center fs-1 mb-5">Our Thoughts</p>
            </Row>

            {/* Hero Image + Caption */}
            <Row className="justify-content-center">
                <Col md={12}>
                    <Row className="justify-content-center">
                        <Col xs={10}>
                            <img
                                src="https://i.postimg.cc/LXGwCWh8/temp-Image-GXxgzn.avif"
                                className="passion-img img-fluid"
                                alt="Main Visual"
                            />
                        </Col>
                    </Row>
                    <Row className="mt-5 passion-text">
                        <p className="fs-1 text-center text-black">
                            Success doesn't depend on ability or experience.<br />
                            It's all about passion.
                        </p>
                    </Row>
                </Col>
            </Row>

            {/* Secondary Image */}
            <Row className="mt-4 justify-content-center">
                <Col xs={10} md={8}>
                    <img
                        src="https://i.postimg.cc/66RbSfrY/temp-Image9-YBb6k.avif"
                        className="img-fluid"
                        alt="Quote Visual"
                    />
                </Col>
            </Row>

            {/* Section PA-04 */}
            <Row className="PA-04">
                <Col>
                    <h1>All you need is PASSION</h1>
                    <p className="fs-3">What moves people's hearts in any era</p>
                    <p className="fs-3">is not some clever technique or sweet word.</p>
                    <p className="fs-3">It is always a burning passion accompanied by sincere words and actions that</p>
                    <p className="fs-3">moves people's hearts and opens the way to mutual understanding.</p>
                </Col>
            </Row>

            {/* Section PA-05 */}
            <Row className="PA-05">
                <Col>
                    <h1>PASSION on the work</h1>
                    <p className="fs-3 fw-bold mt-5">Live as if you were to die tomorrow,</p>
                    <p className="fs-3 fw-bold">learn as if you were to live forever</p>
                    <p className="fs-6">(Indian independence leader: Mahatma Gandhi)</p>

                    <p className="fs-3">This is one of the messages sent by the union to the trainees, who are expected to have a clear resolve and self-discipline.</p>
                    <p className="fs-3">A half-hearted trainee who is not prepared will not be tolerated.</p>
                    <p className="fs-3">That is why it is necessary to be enthusiastic and take the trainees seriously.</p>
                </Col>
            </Row>

            {/* Section contact */}
            <ContactSection />

        </Container>
    );
}

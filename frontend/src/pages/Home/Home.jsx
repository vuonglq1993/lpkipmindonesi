import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './Home.css';

export default function Home() {
    return (
        <Container className="home-head py-5 bg-white">
            <Row className="justify-content-center">
                {/* Slide */}
                <section>
                    <div id="carouselExampleFade" class="carousel slide carousel-fade">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src="http://toyo-coop.jp/tcsweb/wp-content/uploads/2022/05/main-pc01.jpg" className="d-block w-100" alt="..." />
                            </div>
                            <div class="carousel-item">
                                <img src="http://toyo-coop.jp/tcsweb/wp-content/uploads/2022/06/main02pc.jpg" className="d-block w-100" alt="..." />
                            </div>
                            <div class="carousel-item">
                                <img src="http://toyo-coop.jp/tcsweb/wp-content/uploads/2022/09/main03pc.jpg" className="d-block w-100" alt="..." />
                            </div>
                            <div class="carousel-item">
                                <img src="http://toyo-coop.jp/tcsweb/wp-content/uploads/2022/06/main02pc.jpg" className="d-block w-100" alt="..." />
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </section>

                {/* H01 */}
                <Row className="py-5 text-center justify-content-center">
                    <Col md={10}>
                        <p className="fs-3">
                            It is about bringing

                        </p>
                        <p className="fs-3">
                            together people from different cultures and environments who share the same aspirations and work together to achieve their goals.

                        </p>
                        <p className="fs-3">
                            Without fear of change, we come together with a passionate heart

                        </p>
                        <p className="fs-3">
                            , moving forward together, and striving to achieve success together. We have seen time and time again that

                        </p>
                        <p className="fs-3">
                            hiring foreigners is the perfect opportunity to achieve this .

                        </p>
                    </Col>
                </Row>

                {/* H02 */}
                <Row className="text-center justify-content-center py-3 h02">
                    <p className="fs-3 text-white">SPIRITS OF TOYO</p>
                    <p className="fs-2 text-white fw-bold">What we want to tell you</p>
                </Row>

                {/* H03 */}
                <Row className="py-5 justify-content-center my-5">
                    <Col md={3}>
                        <img
                            src="http://toyo-coop.jp/tcsweb/wp-content/uploads/2022/03/p01.png"
                            className="img-fluid"
                            alt="Quote Visual"
                        />
                    </Col>
                    <Col md={3}>
                        <img
                            src="http://toyo-coop.jp/tcsweb/wp-content/uploads/2022/09/p02.png"
                            className="img-fluid"
                            alt="Quote Visual"
                        />
                    </Col>
                    <Col md={3}>
                        <img
                            src="http://toyo-coop.jp/tcsweb/wp-content/uploads/2022/03/p03.png"
                            className="img-fluid"
                            alt="Quote Visual"
                        />
                    </Col>
                </Row>

                {/* H04*/}
                <Row className="h04 text-white text-center py-3">
                    <p className="fs-3 text-white">ZOOM-in.</p>
                    <p className="fs-2 text-white fw-bold">About the two systems</p>
                </Row>

                {/* H05 */}
                <Row className="h05 text-white justify-content-center">
                    <Col md={5} className="text-end">
                        <img
                            src="http://toyo-coop.jp/tcsweb/wp-content/uploads/2022/03/s-01.png"
                            className="img-fluid"
                            alt="Quote Visual"
                        />
                    </Col>
                    <Col md={5}>
                        <img
                            src="http://toyo-coop.jp/tcsweb/wp-content/uploads/2022/03/s-02.png"
                            className="img-fluid"
                            alt="Quote Visual"
                        />
                    </Col>
                </Row>

                {/* h06 */}
                <Row className="h06 text-white text-center py-3">
                    <p className="fs-3 text-white">REAL VOICE.</p>
                    <p className="fs-2 text-white fw-bold">Real voices of trainees who achieved success</p>
                </Row>

                <Row className="h07 justify-content-center text-center py-5">
                    <Col md={7} className="my-5">
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/7Qi4d7eN3Ic"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen>
                    </iframe>
                    </Col>

                </Row>
            </Row>
        </Container>
    );
}

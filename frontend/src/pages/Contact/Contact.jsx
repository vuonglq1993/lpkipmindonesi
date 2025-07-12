import { Form, Button, Row, Col, Container } from "react-bootstrap";
import './Contact.css';

export default function Contact() {
    return (
        <Container className="py-5">

            {/* Section Header */}
            <Row className="about-head">
                <p className="text-center fs-1 mb-5">Contact</p>
            </Row>

            {/* Section Form */}
            <Row className="justify-content-center">
                <Col md={8}>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Company name (or individual name if individual) <strong>[Required]</strong></Form.Label>
                    <Form.Control type="text" required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Location <strong>[required]</strong></Form.Label>
                    <Form.Control type="text" required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Phone number <strong>[required]</strong></Form.Label>
                    <Row>
                        <Col xs={3}><Form.Control required /></Col>
                        <Col xs={7}><Form.Control required /></Col>
                    </Row>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Person in charge <strong>[required]</strong></Form.Label>
                    <Form.Control type="text" required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Name of person in charge (furigana) <strong>[Required]</strong></Form.Label>
                    <Form.Control type="text" required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email address <strong>[required]</strong></Form.Label>
                    <Form.Control type="email" required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Industry <span className="text-muted">(optional)</span></Form.Label>
                    <Form.Control type="text" />
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>Inquiry details <span className="text-muted">(optional)</span></Form.Label>
                    <Form.Control as="textarea" rows={4} />
                </Form.Group>

                <div className="text-center">
                    <Button variant="danger" type="submit">
                        Check your input
                    </Button>
                </div>
            </Form>
            </Col>
            </Row>
        </Container>
    );
}

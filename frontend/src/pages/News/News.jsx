import { Container, Row, Col, Card } from 'react-bootstrap';
import ContactSection from '../../components/contact';
import './News.css';

const dummyNews = [
  {
    id: 1,
    title: 'New trainees arrive in Tokyo',
    summary: 'We welcomed new trainees from Vietnam and Indonesia this week.',
    image: 'http://toyo-coop.jp/tcsweb/wp-content/uploads/2022/09/g-03.png',
    date: 'July 5, 2025',
  },
  {
    id: 2,
    title: 'Seminar on Specific Skill Visa',
    summary: 'A seminar was held regarding the requirements and updates on the Specific Skill Visa.',
    image: 'https://via.placeholder.com/600x400?text=News+2',
    date: 'June 28, 2025',
  },
  {
    id: 3,
    title: 'Annual General Meeting 2025',
    summary: 'The 2025 AGM was successfully held at our headquarters with key stakeholders.',
    image: 'https://via.placeholder.com/600x400?text=News+3',
    date: 'June 15, 2025',
  },
];

export default function News() {
  return (
    <Container fluid className="py-5">
      {/* Header */}
      <div className="about-head">
        <h1 className="text-white text-center fw-bold">News</h1>
      </div>

      {/* News List */}
      <Container className="my-5">
        <Row className="g-4">
          {dummyNews.map((news) => (
            <Col md={4} key={news.id}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Img variant="top" src={news.image} />
                <Card.Body>
                  <Card.Title>{news.title}</Card.Title>
                  <Card.Text className="text-muted" style={{ fontSize: '0.9rem' }}>{news.date}</Card.Text>
                  <Card.Text>{news.summary}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Contact Section */}
      <ContactSection />
    </Container>
  );
}

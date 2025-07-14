import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import {
    Container, Row, Col, Card, Spinner, Pagination
} from 'react-bootstrap';

const ITEMS_PER_PAGE = 6;

export default function AdminContact() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const enSnap = await getDocs(collection(db, 'contactMessages'));
                const jpSnap = await getDocs(collection(db, 'contactMessagesjp'));

                const all = [];

                enSnap.forEach((doc) => {
                    all.push({ id: doc.id, lang: 'en', ...doc.data() });
                });

                jpSnap.forEach((doc) => {
                    all.push({ id: doc.id, lang: 'jp', ...doc.data() });
                });

                all.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);
                setContacts(all);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch contacts:", err);
            }
        };

        fetchData();
    }, []);

    // Pagination logic
    const indexOfLast = currentPage * ITEMS_PER_PAGE;
    const indexOfFirst = indexOfLast - ITEMS_PER_PAGE;
    const currentItems = contacts.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(contacts.length / ITEMS_PER_PAGE);

    const handlePageChange = (number) => {
        setCurrentPage(number);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const renderPagination = () => {
        const items = [];
        for (let number = 1; number <= totalPages; number++) {
            items.push(
                <Pagination.Item
                    key={number}
                    active={number === currentPage}
                    onClick={() => handlePageChange(number)}
                >
                    {number}
                </Pagination.Item>
            );
        }

        return (
            <Pagination className="justify-content-center mt-4">
                {items}
            </Pagination>
        );
    };

    return (
        <Container className="py-5">
            <h2 className="text-center mb-4">📬 Danh sách liên hệ đã gửi</h2>

            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : (
                <>
                    <Row className="g-4">
                        {currentItems.map((entry, idx) => (
                            <Col md={6} key={entry.id}>
                                <Card className="shadow-sm border border-2">
                                    <Card.Body>
                                        <h5 className="mb-3">#️⃣ Mã: {entry.id}</h5>
                                        <p><strong>🌐 Ngôn ngữ:</strong> {entry.lang === 'en' ? 'English' : 'Japanese'}</p>
                                        <p><strong>🏢 Company:</strong> {entry.companyName}</p>
                                        <p><strong>📍 Location:</strong> {entry.location}</p>
                                        <p><strong>📞 Phone:</strong> {entry.phone1}-{entry.phone2}</p>
                                        <p><strong>🧑‍💼 In charge:</strong> {entry.personInCharge}</p>
                                        <p><strong>🈶 Furigana:</strong> {entry.personFurigana}</p>
                                        <p><strong>📧 Email:</strong> {entry.email}</p>
                                        <p><strong>🏭 Industry:</strong> {entry.industry || '---'}</p>
                                        <p><strong>💬 Inquiry:</strong> {entry.inquiry || '---'}</p>
                                        <p className="text-muted">
                                            <strong>🕒 Time:</strong> {entry.createdAt?.seconds
                                                ? new Date(entry.createdAt.seconds * 1000).toLocaleString()
                                                : 'N/A'}
                                        </p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    {/* Pagination */}
                    {totalPages > 1 && renderPagination()}
                </>
            )}
        </Container>
    );
}

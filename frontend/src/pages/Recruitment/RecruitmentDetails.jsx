import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Container, Row, Col } from 'react-bootstrap';
import { useLanguage } from '../../context/LanguageContext';

export default function RecruitmentDetail() {
    const { id } = useParams();
    const { language } = useLanguage();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            const col = language === 'en' ? 'recruitment' : 'recruitmentjp';
            const docRef = doc(db, col, id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setArticle(docSnap.data());
            }
            setLoading(false);
        };
        fetchArticle();
    }, [id, language]);

    return (
        <Container className="py-5 bg-white">
            {loading ? (
                <p className="text-center">Loading...</p>
            ) : article ? (
                <>
                    <Row className="about-head">
                        <h1 className="text-white text-center fw-bold">{language === 'en' ? 'recruitment' : '募集'}</h1>
                    </Row>
                    <Row className="mb-4 bg-light justify-content-center">
                        <Col xs={10}>
                            <h1>{article.name}</h1>
                            {article.image && (
                                <img src={article.image} alt={article.name} className="img-fluid my-4" />
                            )}
                            <div className="rendered-article"  dangerouslySetInnerHTML ={{ __html: article.description }} /> 

                        </Col>
                    </Row>
                </>
            ) : (
                <p className="text-center">Article not found.</p>
            )}
        </Container>
    );
}

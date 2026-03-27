import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Container, Row, Col } from 'react-bootstrap';
import { useLanguage } from '../../context/LanguageContext';
import ContactSection from '../../components/contact';
import './News.css';
export default function NewsDetail() {
    const { id } = useParams();
    const { language } = useLanguage();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleContextMenu = (e) => {
          if (e.target.tagName === "IMG") {
            e.preventDefault();
          }
        };
      
        document.addEventListener("contextmenu", handleContextMenu);
      
        return () => {
          document.removeEventListener("contextmenu", handleContextMenu);
        };
      }, []);
      
    useEffect(() => {
        const fetchArticle = async () => {
            const col = language === 'en' ? 'news' : 'newsjp';
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
        <Container fluid className=" bg-white">
            {loading ? (
                <p className="text-center">Loading...</p>
            ) : article ? (
                <>
                    <Row className="news-head">
                        <h1 className="text-white text-center fw-bold">{language === 'en' ? 'News' : 'ニュース'}</h1>
                    </Row>
                    <Row className="mb-4 bg-light justify-content-center py-5">
                        <Col xs={10}>
                            <h1>{article.title}</h1>
                            <p className="text-muted">
                                {new Date(article.date.seconds * 1000).toLocaleDateString()}
                            </p>
                            {article.image && (
                                <img src={article.image} alt={article.title} className="img-fluid my-4" />
                            )}
                            <div className="rendered-article"  dangerouslySetInnerHTML ={{ __html: article.content }} /> 

                        </Col>
                    </Row>
                    <ContactSection />
                </>
            ) : (
                <p className="text-center">Article not found.</p>
            )}
        </Container>
    );
}

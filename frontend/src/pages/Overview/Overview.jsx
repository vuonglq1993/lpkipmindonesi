import { Container, Row, Col, Table } from 'react-bootstrap';
import './Overview.css';
import ContactSection from '../../components/contact';

export default function Overview() {
    return (
        <Container className="my-5">

            {/* Section Header */}
            <Row className="about-head">
                <p className="text-center fs-1 mb-5">Union Overview</p>
            </Row>

            {/* Section Table */}
            <Row className="justify-content-center">
                <Col xs ={12} md={8}>
                    <Table responsive className="table table-striped table-top-bottom-border ">
                        <tbody>
                            <tr>
                                <th className="py-3">Union name</th>
                                <td className="py-3">TOYO cooperative</td>
                            </tr>
                            <tr>
                                <th className="py-3">Representative director</th>
                                <td className="py-3">Kenji Sato</td>
                            </tr>
                            <tr>
                                <th className="py-3">Date of establishment</th>
                                <td className="py-3">August 4, 2005</td>
                            </tr>
                            <tr>
                                <th className="py-3">Supervising organization license number</th>
                                <td className="py-3">
                                    General Supervision Business Permit 1704001880 (Technical Intern Training)
                                </td>
                            </tr>
                            <tr>
                                <th className="py-3">Registration support organization registration number</th>
                                <td className="py-3">20 entry-003457 (specific skills)</td>
                            </tr>
                            <tr>
                                <th className="py-3">Tokyo Headquarters</th>
                                <td className="py-3">
                                    Address: 2nd floor, Kameido Tosei Building II, 1-8 Kameido 6-chome, Koto-ku, Tokyo 136-0071<br />
                                    [ <a href="#">Google Map</a> ]<br />
                                    TEL: 03-6807-0104
                                </td>
                            </tr>
                            <tr>
                                <th className="py-3">Okinawa branch</th>
                                <td className="py-3">
                                    2-22-1 Gusuku, Urasoe City, Okinawa Prefecture, 901-2133<br />
                                    [ <a href="#">Google Map</a> ]<br />
                                    TEL: 098-878-5043
                                </td>
                            </tr>
                            <tr>
                                <th className="py-3">Business content</th>
                                <td className="py-3">
                                    • Joint acceptance of foreign technical intern trainees for members and job placement services related to that <br />
                                    • Support program for specific skilled foreign workers<br />
                                    • Education and info to improve management and disseminate knowledge
                                </td>
                            </tr>
                            <tr>
                                <th className="py-3">Acceptable countries</th>
                                <td className="py-3">
                                    Vietnam, China, Indonesia, Philippines, Myanmar, Thailand, Mongolia, Cambodia
                                </td>
                            </tr>
                            <tr>
                                <th className="py-3">District</th>
                                <td className="py-3">
                                    Hokkaido, Aomori, Iwate, Miyagi, Akita, Yamagata, Fukushima, Ibaraki, Tochigi, Gunma, Saitama, Chiba, Tokyo, Kanagawa,
                                    Niigata, Toyama, Ishikawa, Fukui, Yamanashi, Nagano, Gifu, Shizuoka, Aichi, Mie, Shiga, Osaka, Hyogo, Nara, Fukuoka, Saga,
                                    Nagasaki, Okinawa
                                </td>
                            </tr>
                            <tr>
                                <th className="py-3">Union membership fee</th>
                                <td className="py-3">
                                    Membership fee: 11,000 yen and up, capital contribution: 10,000 yen, membership fee: 1,000 yen/month <br />
                                    <a href="#" className="text-primary text-decoration-underline">
                                        * Regulations concerninge operation of the supervising organization's business
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>


            {/* Contact section */}
            <ContactSection />

        </Container>


    );
}

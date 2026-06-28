import { Accordion, Container } from 'react-bootstrap'
import { ListOfOrchids } from '../data/ListOfOrchids'

const uniqueOrigins = [...new Set(ListOfOrchids.map(o => o.origin))].length

const faqs = [
    {
        q: 'What is the difference between Natural and Hybrid orchids?',
        a: 'Natural orchids grow in the wild without human intervention. Hybrid orchids are bred by crossing two or more species to produce new colors, patterns, or hardier plants.',
    },
    {
        q: 'How do I care for orchids at home?',
        a: 'Most orchids prefer bright indirect light, well-draining potting media, and watering once a week. Avoid letting roots sit in standing water, and fertilize monthly during the growing season.',
    },
    {
        q: 'Which orchid family has the most species?',
        a: 'Orchidaceae is one of the largest flowering plant families with over 28,000 accepted species. Among the genera in our gallery, Dendrobium and Cattleya are among the most diverse.',
    },
    {
        q: 'Can I grow orchids outdoors?',
        a: 'It depends on your climate. Many tropical orchids such as Vanda and Dendrobium thrive outdoors in warm, humid regions. In cooler climates they are best kept as indoor plants.',
    },
]

export default function About() {
    return (
        <Container className="py-5" style={{ maxWidth: 900 }}>
            {/* header */}
            <div className="text-center mb-5">
                <h1 className="fw-bold">About us</h1>
                <p className="text-muted">
                    Orchid Gallery is a React application developed through the FER202 Lab series.
                            It demonstrates core React concepts including components, hooks, routing and UI libraries.
                            The collection spans {uniqueOrigins} countries across the world.
                </p>
            </div>

            <Accordion flush>
                {faqs.map((item, i) => (
                    <Accordion.Item key={i} eventKey={String(i)}>
                        <Accordion.Header>{item.q}</Accordion.Header>
                        <Accordion.Body className="text-muted">{item.a}</Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </Container>
    )
}

import { Carousel } from 'react-bootstrap'
import { ListOfOrchids } from '../data/ListOfOrchids.js'
import './HeroBanner.css'

const slideImages = [
    'https://cdn.wallpapersafari.com/61/52/uO7pCb.jpg',
    'https://images5.alphacoders.com/371/371639.jpg',
    'https://wallpapershome.com/images/pages/pic_h/5355.jpg',
]

export default function HeroBanner() {
    return (
        <div className="hero-banner-wrap">
            <Carousel interval={2500} className="hero-banner" indicators controls>
                {slideImages.map((src, i) => (
                    <Carousel.Item key={i}>
                        <div
                            className="hero-slide"
                            style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.25)), url(${src})` }}
                        />
                    </Carousel.Item>
                ))}
            </Carousel>

            <div className="hero-overlay">
                <h1 className="hero-title">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/1087/1087431.png"
                        alt="Orchid Gallery logo"
                        style={{ height: '1em', verticalAlign: '-0.15em', marginRight: '0.4rem' }}
                    />
                    Orchid Gallery
                </h1>
                <p className="hero-subtitle">
                    Discover {ListOfOrchids.length} beautiful orchids from around the world
                </p>
            </div>
        </div>
    )
}

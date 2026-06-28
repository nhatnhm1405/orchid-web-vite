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
        // wrap: position relative để overlay chữ phủ tuyệt đối lên trên, đứng yên
        <div className="hero-banner-wrap">
            {/* chỉ ẢNH nằm trong Carousel -> trượt ngang; bỏ "fade" để dùng slide mặc định */}
            <Carousel interval={2500} className="hero-banner" indicators controls>
                {slideImages.map((src, i) => (
                    <Carousel.Item key={i}>
                        {/* gradient tối ghép cùng ảnh -> chữ luôn đọc được */}
                        <div
                            className="hero-slide"
                            style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.25)), url(${src})` }}
                        />
                    </Carousel.Item>
                ))}
            </Carousel>

            {/* CHỮ nằm NGOÀI Carousel -> không trượt theo ảnh; pointer-events none để vẫn bấm được dots/mũi tên */}
            <div className="hero-overlay">
                <h1 className="hero-title">🌸 Orchid Gallery</h1>
                <p className="hero-subtitle">
                    Discover {ListOfOrchids.length} beautiful orchids from around the world
                </p>
            </div>
        </div>
    )
}

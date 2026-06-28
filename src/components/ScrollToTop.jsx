import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Mỗi lần URL (pathname) đổi -> cuộn trang về đầu.
// Router mặc định KHÔNG tự cuộn, nên bấm Details lúc đang cuộn giữa trang
// sẽ mở trang Detail ở vị trí cũ -> component này khắc phục.
export default function ScrollToTop() {
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    return null // không render gì, chỉ làm side-effect
}

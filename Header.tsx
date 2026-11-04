import { useEffect, useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { selectTotalQuantity } from '../features/cart/cartSlice'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { CartIcon, MoonIcon, SearchIcon, SunIcon, UserIcon } from './Icons'

export default function Header() {
  const count = useAppSelector(selectTotalQuantity)
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [params] = useSearchParams()
  const [keyword, setKeyword] = useState(params.get('q') ?? '')

  // Đồng bộ ô tìm kiếm với URL (vd: bấm logo để về trang chủ thì xoá từ khoá)
  useEffect(() => {
    setKeyword(params.get('q') ?? '')
  }, [params])

  const goSearch = (value: string, replace: boolean) =>
    navigate(value.trim() ? `/?q=${encodeURIComponent(value)}` : '/', { replace })

  const handleChange = (value: string) => {
    setKeyword(value)
    if (pathname === '/') goSearch(value, true) // đang ở trang chủ: lọc ngay khi gõ
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    goSearch(keyword, false)
  }

  return (
    <header className="header">
      <div className="topbar">
        <div className="wrap topbar-inner">
          <span className="hide-sm">Chào mừng bạn đến với ShopMini</span>
          <nav className="topbar-nav">
            <Link to="/cart">Giỏ hàng</Link>
            <span className="sep" />
            <Link to="/checkout">Thanh toán</Link>
            <span className="sep" />
            <button className="link-btn" onClick={toggleTheme} aria-label="Đổi theme sáng/tối">
              {theme === 'light' ? <MoonIcon /> : <SunIcon />}
              <span className="hide-sm">{theme === 'light' ? 'Giao diện tối' : 'Giao diện sáng'}</span>
            </button>
            <span className="sep" />
            {user ? (
              <>
                <span className="user">
                  <UserIcon /> {user.username}
                </span>
                <span className="sep" />
                <button className="link-btn" onClick={logout}>
                  Đăng xuất
                </button>
              </>
            ) : (
              <Link to="/login">Đăng nhập</Link>
            )}
          </nav>
        </div>
      </div>

      <div className="wrap mainbar">
        <Link to="/" className="logo" aria-label="Trang chủ ShopMini">
          <span className="logo-mark">S</span>
          <span className="logo-text">ShopMini</span>
        </Link>
        <form className="searchbar" role="search" onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="Tìm sản phẩm theo tên..."
            value={keyword}
            onChange={(e) => handleChange(e.target.value)}
          />
          <button type="submit" aria-label="Tìm kiếm">
            <SearchIcon />
          </button>
        </form>
        <Link to="/cart" className="cart-link" data-cart-target aria-label={`Giỏ hàng, ${count} sản phẩm`}>
          <CartIcon size={30} />
          {count > 0 && <span className="badge">{count}</span>}
        </Link>
      </div>
    </header>
  )
}

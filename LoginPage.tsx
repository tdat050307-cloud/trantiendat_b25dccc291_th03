import { useState, type FormEvent } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

interface LocationState {
  from?: { pathname: string }
}

export default function LoginPage() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const fromPath = (location.state as LocationState | null)?.from?.pathname
  const from = fromPath ?? '/'

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (user) return <Navigate to={from} replace />

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (login(username, password)) navigate(from, { replace: true })
    else setError('Sai tên đăng nhập hoặc mật khẩu.')
  }

  return (
    <div className="auth-wrap">
      <form className="auth-card" onSubmit={handleSubmit}>
        <span className="logo-mark big">S</span>
        <h1>Chào mừng trở lại</h1>
        <p className="muted">Đăng nhập để tiếp tục mua sắm tại ShopMini</p>

        {fromPath && <div className="alert alert-info">Bạn cần đăng nhập để vào trang thanh toán.</div>}

        <div className="field">
          <label htmlFor="username">Tên đăng nhập</label>
          <input
            id="username"
            autoFocus
            autoComplete="username"
            placeholder="Nhập tên đăng nhập"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="password">Mật khẩu</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <button className="btn btn-primary btn-block btn-lg" type="submit">
          Đăng nhập
        </button>
        <p className="muted hint">· mật khẩu 123456</p>
      </form>
    </div>
  )
}

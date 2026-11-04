import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  clearCart,
  selectCartItems,
  selectTotalPrice,
  selectTotalQuantity,
} from '../features/cart/cartSlice'
import { useAuth } from '../contexts/AuthContext'
import { CheckIcon } from '../components/Icons'

export default function CheckoutPage() {
  const dispatch = useAppDispatch()
  const { user } = useAuth()
  const items = useAppSelector(selectCartItems)
  const total = useAppSelector(selectTotalPrice)
  const count = useAppSelector(selectTotalQuantity)
  const [ordered, setOrdered] = useState(false)

  if (ordered) {
    return (
      <div className="empty success">
        <span className="success-icon"><CheckIcon size={36} /></span>
        <h2>Đặt hàng thành công!</h2>
        <p className="muted">Cảm ơn {user?.username} đã mua hàng tại ShopMini.</p>
        <Link to="/" className="btn btn-primary">Về trang chủ</Link>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="empty">
        <h2>Không có sản phẩm để thanh toán</h2>
        <Link to="/" className="btn btn-primary">Mua sắm ngay</Link>
      </div>
    )
  }

  const handleOrder = () => {
    dispatch(clearCart())
    setOrdered(true)
  }

  return (
    <>
      <h1 className="page-title">Thanh toán</h1>
      <div className="cart-layout">
        <section className="cart-list">
          <div className="section-head">
            Người đặt hàng: <strong>{user?.username}</strong>
          </div>
          {items.map(({ product, quantity }) => (
            <div className="cart-item" key={product.id}>
              <div className="thumb">
                <img src={product.image} alt={product.title} />
              </div>
              <div className="cart-info">
                <span className="card-title clamp">{product.title}</span>
                <span className="muted">
                  ${product.price.toFixed(2)} × {quantity}
                </span>
              </div>
              <strong className="price">${(product.price * quantity).toFixed(2)}</strong>
            </div>
          ))}
        </section>
        <aside className="summary">
          <h2>Xác nhận đơn hàng</h2>
          <div className="row"><span>Số lượng</span><span>{count}</span></div>
          <div className="row total"><span>Tổng tiền</span><span>${total.toFixed(2)}</span></div>
          <button className="btn btn-primary btn-block btn-lg" onClick={handleOrder}>
            Đặt hàng
          </button>
          <Link to="/cart" className="btn btn-ghost btn-block">Quay lại giỏ hàng</Link>
        </aside>
      </div>
    </>
  )
}

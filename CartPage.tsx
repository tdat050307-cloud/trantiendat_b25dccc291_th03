import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  clearCart,
  removeFromCart,
  selectCartItems,
  selectTotalPrice,
  selectTotalQuantity,
  updateQuantity,
} from '../features/cart/cartSlice'
import { CartIcon, TrashIcon } from '../components/Icons'

export default function CartPage() {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectCartItems)
  const total = useAppSelector(selectTotalPrice)
  const count = useAppSelector(selectTotalQuantity)

  if (items.length === 0) {
    return (
      <div className="empty">
        <CartIcon size={48} />
        <h2>Giỏ hàng của bạn đang trống</h2>
        <p className="muted">Hãy chọn vài sản phẩm bạn thích nhé.</p>
        <Link to="/" className="btn btn-primary">Mua sắm ngay</Link>
      </div>
    )
  }

  return (
    <>
      <h1 className="page-title">
        Giỏ hàng <span className="muted sub">({count} sản phẩm)</span>
      </h1>
      <div className="cart-layout">
        <section className="cart-list">
          {items.map(({ product, quantity }) => (
            <div className="cart-item" key={product.id}>
              <Link to={`/products/${product.id}`} className="thumb">
                <img src={product.image} alt={product.title} />
              </Link>
              <div className="cart-info">
                <Link to={`/products/${product.id}`} className="card-title clamp">
                  {product.title}
                </Link>
                <span className="muted">${product.price.toFixed(2)} / sản phẩm</span>
                <div className="qty">
                  <button
                    aria-label="Giảm số lượng"
                    onClick={() => dispatch(updateQuantity({ id: product.id, quantity: quantity - 1 }))}
                  >
                    −
                  </button>
                  <span>{quantity}</span>
                  <button
                    aria-label="Tăng số lượng"
                    onClick={() => dispatch(updateQuantity({ id: product.id, quantity: quantity + 1 }))}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="cart-right">
                <strong className="price">${(product.price * quantity).toFixed(2)}</strong>
                <button
                  className="icon-btn danger"
                  aria-label="Xoá sản phẩm"
                  onClick={() => dispatch(removeFromCart(product.id))}
                >
                  <TrashIcon />
                </button>
              </div>
            </div>
          ))}
        </section>

        <aside className="summary">
          <h2>Tóm tắt đơn hàng</h2>
          <div className="row"><span>Số lượng</span><span>{count}</span></div>
          <div className="row"><span>Tạm tính</span><span>${total.toFixed(2)}</span></div>
          <div className="row total"><span>Tổng tiền</span><span>${total.toFixed(2)}</span></div>
          <Link to="/checkout" className="btn btn-primary btn-block btn-lg">Thanh toán</Link>
          <button className="btn btn-ghost btn-block" onClick={() => dispatch(clearCart())}>
            Xoá toàn bộ giỏ hàng
          </button>
        </aside>
      </div>
    </>
  )
}

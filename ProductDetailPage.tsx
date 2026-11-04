import { useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { fetchProducts, selectProductById } from '../features/products/productsSlice'
import AddToCartButton from '../components/AddToCartButton'

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const status = useAppSelector((s) => s.products.status)
  const product = useAppSelector(selectProductById(Number(id)))
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts())
  }, [status, dispatch])

  if (status === 'idle' || status === 'loading') return <div className="detail skeleton" style={{ minHeight: 360 }} />
  if (status === 'failed') return <div className="alert alert-error">Không tải được dữ liệu sản phẩm.</div>
  if (!product) {
    return (
      <div className="empty">
        <p>Không tìm thấy sản phẩm.</p>
        <Link to="/" className="btn btn-primary">Về trang chủ</Link>
      </div>
    )
  }

  return (
    <>
      <Link to="/" className="back-link">← Tiếp tục mua sắm</Link>
      <div className="detail">
        <div className="detail-img">
          <img ref={imgRef} src={product.image} alt={product.title} />
        </div>
        <div className="detail-info">
          <span className="tag">{product.category}</span>
          <h1>{product.title}</h1>
          <p className="price price-lg">${product.price.toFixed(2)}</p>
          <p className="muted">{product.description}</p>
          <AddToCartButton product={product} imageRef={imgRef} className="btn-lg" />
        </div>
      </div>
    </>
  )
}

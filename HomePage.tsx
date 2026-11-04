import { useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { fetchProducts, selectProducts } from '../features/products/productsSlice'
import ProductCard from '../components/ProductCard'
import Pagination from '../components/Pagination'

const PAGE_SIZE = 8

export default function HomePage() {
  const dispatch = useAppDispatch()
  const products = useAppSelector(selectProducts)
  const { status, error } = useAppSelector((s) => s.products)
  const [params, setParams] = useSearchParams()
  const keyword = params.get('q') ?? ''

  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts())
  }, [status, dispatch])

  const filtered = useMemo(() => {
    const k = keyword.trim().toLowerCase()
    return products.filter((p) => p.title.toLowerCase().includes(k))
  }, [products, keyword])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const requested = Number(params.get('page')) || 1
  const page = Math.min(Math.max(1, requested), totalPages)
  const start = (page - 1) * PAGE_SIZE
  const visible = filtered.slice(start, start + PAGE_SIZE)

  const goToPage = (p: number) => {
    const next = new URLSearchParams(params)
    if (p <= 1) next.delete('page')
    else next.set('page', String(p))
    setParams(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <div className="toolbar">
        <h1 className="page-title">
          {keyword.trim() ? `Kết quả cho "${keyword.trim()}"` : 'Sản phẩm'}
          {status === 'succeeded' && <span className="muted sub"> ({filtered.length})</span>}
        </h1>
        {status === 'succeeded' && filtered.length > 0 && (
          <span className="muted">
            Hiển thị {start + 1}–{start + visible.length} / {filtered.length}
          </span>
        )}
      </div>

      {status === 'failed' && (
        <div className="alert alert-error">
          {error}
          <button className="btn btn-ghost" onClick={() => dispatch(fetchProducts())}>
            Thử lại
          </button>
        </div>
      )}
      {status === 'succeeded' && filtered.length === 0 && (
        <div className="empty">
          <p>Không tìm thấy sản phẩm phù hợp.</p>
        </div>
      )}

      <div className="grid">
        {(status === 'idle' || status === 'loading') &&
          Array.from({ length: PAGE_SIZE }, (_, i) => <div className="card skeleton" key={i} />)}
        {visible.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} onChange={goToPage} />
    </>
  )
}

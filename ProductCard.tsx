import { useRef } from 'react'
import { Link } from 'react-router-dom'
import AddToCartButton from './AddToCartButton'
import type { Product } from '../types'

export default function ProductCard({ product }: { product: Product }) {
  const imgRef = useRef<HTMLImageElement>(null)
  return (
    <article className="card">
      <Link to={`/products/${product.id}`} className="card-img">
        <img ref={imgRef} src={product.image} alt={product.title} loading="lazy" />
      </Link>
      <div className="card-body">
        <span className="tag">{product.category}</span>
        <Link to={`/products/${product.id}`} className="card-title clamp">
          {product.title}
        </Link>
        <div className="card-footer">
          <span className="price">${product.price.toFixed(2)}</span>
          <AddToCartButton product={product} imageRef={imgRef} />
        </div>
      </div>
    </article>
  )
}

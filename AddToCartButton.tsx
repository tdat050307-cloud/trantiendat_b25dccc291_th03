import type { RefObject } from 'react'
import { useAppDispatch } from '../app/hooks'
import { addToCart } from '../features/cart/cartSlice'
import { flyToCart, showToast } from '../utils/cartFx'
import { CartIcon } from './Icons'
import type { Product } from '../types'

interface Props {
  product: Product
  imageRef: RefObject<HTMLImageElement>
  className?: string
}

export default function AddToCartButton({ product, imageRef, className = '' }: Props) {
  const dispatch = useAppDispatch()

  const handleClick = () => {
    dispatch(addToCart(product))
    flyToCart(imageRef.current)
    showToast('Đã thêm vào giỏ hàng', product.title)
  }

  return (
    <button className={`btn btn-primary ${className}`} onClick={handleClick}>
      <CartIcon size={18} /> Thêm vào giỏ
    </button>
  )
}

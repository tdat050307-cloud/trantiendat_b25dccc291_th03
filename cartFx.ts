const CART_SELECTOR = '[data-cart-target]'

function bump(target: HTMLElement): void {
  target.classList.remove('bump')
  void target.offsetWidth // reflow để chạy lại animation
  target.classList.add('bump')
  window.setTimeout(() => target.classList.remove('bump'), 450)
}

/** Ảnh sản phẩm bay từ vị trí `source` vào biểu tượng giỏ hàng trên Header. */
export function flyToCart(source: HTMLImageElement | null): void {
  const target = document.querySelector<HTMLElement>(CART_SELECTOR)
  if (!source || !target) return

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    bump(target)
    return
  }

  const from = source.getBoundingClientRect()
  const to = target.getBoundingClientRect()
  const size = 84
  const startX = from.left + from.width / 2
  const startY = from.top + from.height / 2
  const dx = to.left + to.width / 2 - startX
  const dy = to.top + to.height / 2 - startY

  const clone = document.createElement('img')
  clone.src = source.currentSrc || source.src
  clone.alt = ''
  Object.assign(clone.style, {
    position: 'fixed',
    left: `${startX - size / 2}px`,
    top: `${startY - size / 2}px`,
    width: `${size}px`,
    height: `${size}px`,
    objectFit: 'contain',
    background: '#fff',
    borderRadius: '14px',
    boxShadow: '0 10px 30px rgba(0,0,0,.25)',
    zIndex: '1000',
    pointerEvents: 'none',
  })
  document.body.appendChild(clone)

  const animation = clone.animate(
    [
      { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      { transform: `translate(${dx * 0.5}px, ${dy * 0.5 - 90}px) scale(.7)`, opacity: 0.95, offset: 0.5 },
      { transform: `translate(${dx}px, ${dy}px) scale(.12)`, opacity: 0.25 },
    ],
    { duration: 850, easing: 'cubic-bezier(.4, 0, .2, 1)' },
  )
  animation.onfinish = () => {
    clone.remove()
    bump(target)
  }
}

/** Hiện thông báo nhỏ góc màn hình, tự biến mất sau ~2.4 giây. */
export function showToast(message: string, detail?: string): void {
  let host = document.getElementById('toast-host')
  if (!host) {
    host = document.createElement('div')
    host.id = 'toast-host'
    host.className = 'toast-host'
    host.setAttribute('aria-live', 'polite')
    document.body.appendChild(host)
  }
  while (host.children.length >= 3) host.firstElementChild?.remove()

  const toast = document.createElement('div')
  toast.className = 'toast'
  toast.setAttribute('role', 'status')

  const icon = document.createElement('span')
  icon.className = 'toast-icon'
  icon.textContent = '✓'
  const body = document.createElement('div')
  const title = document.createElement('strong')
  title.textContent = message
  body.appendChild(title)
  if (detail) {
    const sub = document.createElement('div')
    sub.className = 'toast-detail'
    sub.textContent = detail
    body.appendChild(sub)
  }
  toast.append(icon, body)
  host.appendChild(toast)

  window.setTimeout(() => {
    toast.classList.add('leaving')
    window.setTimeout(() => toast.remove(), 250)
  }, 2400)
}

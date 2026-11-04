interface Props {
  page: number
  totalPages: number
  onChange: (page: number) => void
}

function buildPages(page: number, total: number): (number | 'gap')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const shown = [...new Set([1, total, page - 1, page, page + 1])]
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b)
  const result: (number | 'gap')[] = []
  shown.forEach((p, i) => {
    if (i > 0 && p - shown[i - 1] > 1) result.push('gap')
    result.push(p)
  })
  return result
}

export default function Pagination({ page, totalPages, onChange }: Props) {
  if (totalPages <= 1) return null

  return (
    <nav className="pagination" aria-label="Phân trang">
      <button disabled={page === 1} onClick={() => onChange(page - 1)} aria-label="Trang trước">
        ‹
      </button>
      {buildPages(page, totalPages).map((p, i) =>
        p === 'gap' ? (
          <span className="gap" key={`gap-${i}`}>
            …
          </span>
        ) : (
          <button
            key={p}
            className={p === page ? 'active' : ''}
            aria-current={p === page ? 'page' : undefined}
            onClick={() => onChange(p)}
          >
            {p}
          </button>
        ),
      )}
      <button disabled={page === totalPages} onClick={() => onChange(page + 1)} aria-label="Trang sau">
        ›
      </button>
    </nav>
  )
}

import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="d-flex vh-100 flex-column align-items-center justify-content-center gap-2">
      <h1 className="display-4 fw-bold">Página não encontrada</h1>
      <p className="text-accent-foreground">
        Voltar para o{' '}
        <Link to="/" className="text-danger">
          Dashboard
        </Link>
      </p>
    </div>
  )
}

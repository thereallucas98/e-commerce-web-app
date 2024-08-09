import { Link, useRouteError } from 'react-router-dom'

export function Error() {
  const error = useRouteError() as Error

  return (
    <div className="d-flex vh-100 flex-column align-items-center justify-content-center gap-2">
      <h1 className="display-4 fw-bold">Whoops, algo aconteceu...</h1>
      <p className="text-muted">
        Um erro aconteceu na aplicação, abaixo você encontra mais detalhes:
      </p>
      <pre className="bg-light p-2 border rounded">
        {error?.message || JSON.stringify(error)}
      </pre>
      <p className="text-muted">
        Voltar para o{' '}
        <Link to="/" className="text-danger">
          Dashboard
        </Link>
      </p>
    </div>
  )
}

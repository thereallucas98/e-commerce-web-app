function BarLoader() {
  return (
    <div className="d-flex gap-1">
      <div className="bar-loader bg-orange"></div>
      <div className="bar-loader bg-orange"></div>
      <div className="bar-loader bg-orange"></div>
      <div className="bar-loader bg-orange"></div>
      <div className="bar-loader bg-orange"></div>
    </div>
  )
}

export function Loading() {
  return (
    <div className="my-4 d-grid w-100 justify-content-center bg-transparent p-4 py-5">
      <BarLoader />
    </div>
  )
}

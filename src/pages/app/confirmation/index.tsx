import OrderConfirmedSvg from '~/assets/order-confirmed.svg'

export function Confirmation() {
  return (
    <main
      className="container-fluid flex text-center mt-5 align-items-center justify-content-center mx-auto"
      style={{ maxWidth: 1440 }}
    >
      <img src={OrderConfirmedSvg} alt="Order Confirmed" />
      <h1 className="h1 fw-medium text-dark">Order has been confirmed</h1>
      <span className="fs-6 fw-normal text-secondary">
        Now wait til your order be deliverd
      </span>
    </main>
  )
}

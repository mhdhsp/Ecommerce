import React from 'react'

function Checkout() {
  return (
    <div className="container my-5">
        <form className="p-4 border rounded shadow-sm bg-light w-100" style={{ maxWidth: '500px', margin: 'auto' }}>
  <select className="form-select mb-3">
    <option>cash on delivery</option>
    <option>Pre pay</option>
  </select>

  <legend className="mb-3 fs-5 fw-semibold text-dark">Delivery address</legend>

  <div className="mb-3">
    <input type="text" className="form-control mb-2" placeholder="Enter home name" />
    <input type="text" className="form-control mb-2" placeholder="Enter palce" />
    <input type="text" className="form-control" placeholder="Enter pin" />
  </div>

  <button className="btn btn-success w-100">conform oreder</button>
</form>

    </div>
  )
}

export default Checkout

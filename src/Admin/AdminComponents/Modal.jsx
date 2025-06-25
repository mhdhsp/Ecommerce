import React from 'react'

function Modal({show,onCancel,onConfirm,message}) {
    if(!show) return null
  return (
    <div>
        <div className="modal d-block " tabIndex="-1">
      <div className="modal-dialog bg-secondary rounded-3"  style={{backgroundColor:"#B0E0E6"}}>
        <div className="modal-content  "  style={{backgroundColor:"#B0E0E6"}}>
          <div className="modal-header "  style={{backgroundColor:"#B0E0E6"}}>
            <h5 className="modal-title text-dark">Confirm Action</h5>
          </div>
          <div className="modal-body  text-dark text-bold" style={{backgroundColor:"#B0E0E6"}}>
            <h5>{message}</h5>
          </div>
          <div className="modal-footer">
            <button onClick={onCancel} className="btn btn-secondary">Cancel</button>
            <button onClick={onConfirm} className="btn btn-danger">Yes, Confirm</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Modal
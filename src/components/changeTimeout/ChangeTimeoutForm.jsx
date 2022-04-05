import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Form from "react-bootstrap/Form";

const ChangeTimeoutForm = (props) => { 
     
    const handle=(e)=>{
        e.preventDefault();
        let min = e.target[0].value;
        let sec = e.target[1].value;
        props.submitHandler(min,sec)
      }
  return (
    <>
      <Modal className="device-pop-up" show={true} centered onHide={props.onModalClosed}>
        <Modal.Header closeButton>
          <Modal.Title class="modal-title title">
          Change Move Time Limit
            </Modal.Title> 
        </Modal.Header>
          <Form id="timeout-form" onSubmit={handle}>
          <Modal.Body>
        <Form.Group>
          <Form.Label  class="title">Time Limit Per Move:</Form.Label>
          <Form.Control
            type="number"
            id="timeOutMinutes"
            placeholder="Minutes"
            min={0}
            defaultValue={0}
            ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="number"
            id="timeOutSeconds"
            placeholder="Seconds"
            min={0}
            defaultValue={0}
            ></Form.Control>
        </Form.Group>
          </Modal.Body>
          <div className="modal-footer">
            <div className="form-group row tab-action">
              <div className="col-12 p-0">
                <Button variant="primary" type="submit" >Save</Button>
                </div>
            </div>
          </div>
        </Form>
    </Modal >
    </>
  )
}

export default ChangeTimeoutForm;

import React,{useState} from "react";
import { Modal, Button } from "react-bootstrap";
import './attendancetable.css';

function AttendanceTable(){
    const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
    return(
        <div>
        <Button variant="primary" onClick={handleShow}>
  click modal
</Button>

<Modal  show={show} onHide={handleClose} className="modal-dialog modal-dialog-centered">
    <div className="table AttendanceTable">
    <Modal.Header closeButton>
    <Modal.Title className="title">
        <h2>Attendance Record</h2>
        </Modal.Title>
  </Modal.Header>
  <Modal.Body>
  <table className="table AttendanceTable">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
  </Modal.Body>
    </div>
  
</Modal>
        </div>
    )
}

export default AttendanceTable;
import React,{useState} from "react";
import './userdashboard.css';
import { Modal, Button } from "react-bootstrap";
function UserDashboard(){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return(
        <div className="userdashboard">
            {/* <div className="userlogo"> */}
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGu8dYom1k4hFKWnlHPKwB-ovs1HkA2XCAvg&usqp=CAU"/>
            {/* </div> */}
            <br></br>
            <h2>Hi! I am Puja</h2>
            <br></br>
            <div className="user-btn">
            {/* <button type="button" className="btn" >PUNCH ATTENDANCE</button>
            <button type="button" className="btn">APPLY FOR LEAVE</button> */}
            <button type="button" className="btn-information" onClick={handleShow}>VIEW OTHER INFORMATION</button>
            </div>


            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>User Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="card">
  <ul className="list-group list-group-flush">
    <li className="list-group-item"> <span>Name :</span> Puja Das</li>
    <li className="list-group-item"><span>Position :</span>MTS</li>
    <li className="list-group-item"><span>Emp ID :</span>MTS-3258</li>
    <li className="list-group-item"><span>Depertment :</span>Developer</li>
  </ul>
</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
    )
}

export default UserDashboard;
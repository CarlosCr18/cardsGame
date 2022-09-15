import {useEffect, useState,Dispatch,SetStateAction} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
interface gameModalInterface{value:boolean,showModal:boolean,setShowModal:Dispatch<SetStateAction<boolean>>};
const GameModal = ({value,showModal,setShowModal}:gameModalInterface)=>{
    const [show, setShow] = useState(false);
    const handleClose = () => {setShow(false);setShowModal(false)};
    const handleShow = () => setShow(true);
    
    useEffect(()=>{
        if(showModal)handleShow();
    },[showModal])

    return(
        <Modal 
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered show={show} onHide={handleClose}>
            {!value ? <>
          <Modal.Header closeButton>
            <Modal.Title>It's not a pair!</Modal.Title>
          </Modal.Header>
          <Modal.Body>sorry, but this is not a match”</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer></>:<>
          <Modal.Header closeButton>
            <Modal.Title>It's a pair!</Modal.Title>
          </Modal.Header>
          <Modal.Body>“nice! it’s a match”</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer></>}
        </Modal>)
}

export default GameModal;
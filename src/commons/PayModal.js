import Modal from 'react-bootstrap/Modal'

const PayModal = ({show, closeModal}) => {

  return (
    <>
      <Modal show={show} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {show}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4></h4>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={closeModal}>Close</button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PayModal;

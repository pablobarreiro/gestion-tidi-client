import Modal from "react-bootstrap/Modal";
import useInput from '../hooks/useInput'

const LoadModal = ({ show, closeModal }) => {
  const aInput = useInput("")
  const bInput = useInput("")
  const cInput = useInput("")
  const list = [{value:"a",input: aInput}, {value:"b",input: bInput}, {value:"c",input: cInput}];

  const handleSubmitLoad = () => {
    
  }


  return (
    <>
      <Modal show={show} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{show}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {list.map((item, i) => (
              <li key={i}>{item.value} : <input {...item.input} /> </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleSubmitLoad}>Cargar</button>
          <button onClick={closeModal}>Cancelar</button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LoadModal;

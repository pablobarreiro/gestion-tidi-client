import Modal from "react-bootstrap/Modal";
import useInput from "../hooks/useInput";
import axios from "axios";
import { ironWorkingUpdateTotals, ironWorkingNewInvoice, getProjectRoute, getAllProjectsRoute } from "../uris";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const IronWorkingLoadModal = ({ show, closeModal }) => {
  const navigate = useNavigate();
  const project = useSelector((state) => state.project);
  const amount = useInput(0);
  const adjust = useInput(project.iron_working_general.adjust ?? 0);
  const invoice_date = useInput('');
  const invoice_number = useInput('');

  const list = [
    { value: "Nro Factura", input: invoice_number, type: 'string' },
    { value: "Fecha Factura", input: invoice_date, type: 'date' },
    { value: "Monto", input: amount, break: true, type: 'number' },
    { value: "Ajuste", input: adjust, type: 'number' },
  ];

  const handleSubmitLoad = async () => {
    navigate("/loading");
    await axios.put(ironWorkingUpdateTotals(project.id), {
      adjust: Number(adjust.value),
    });
    if(invoice_number.value && invoice_date.value && amount.value) await axios.post(ironWorkingNewInvoice(project.id), {
      invoice_number: invoice_number.value,
      invoice_date: new Date(invoice_date.value),
      amount: Number(amount.value),
      projectId: project.id
    });
    await axios.get(getProjectRoute(project.id));
    await axios.get(getAllProjectsRoute());
    navigate(`/project/${project.id}`);
    closeModal();
  };

  return (
    <>
      <Modal show={show} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{show}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {list.map((item) => (
              <li key={item.value}>
                {item.value} : {item.type==='number' && '$'} {" "}
                <input className="basic-input" placeholder={item.type==='date' ? 'AAAA/MM/DD': ''} {...item.input} />{" "}
                {item.break && <hr/>}
              </li>
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

export default IronWorkingLoadModal;

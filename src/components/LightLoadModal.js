import Modal from "react-bootstrap/Modal";
import useInput from "../hooks/useInput";
import axios from "axios";
import { lightNewInvoice, lightUpdateTotals, getProjectRoute, getAllProjectsRoute } from "../uris";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LightLoadModal = ({ show, closeModal }) => {
  const navigate = useNavigate();
  const project = useSelector((state) => state.project);
  const amount = useInput(0);
  const adjust = useInput(project.light_general.adjust ?? 0);
  const placement = useInput(project.light_general.placement_total ?? 0);
  const [placement_paid, setPlacement_paid] = useState(
    project.light_general.placement_paid ?? false
  );

  const list = [
    { value: "Monto", input: amount, break: true },
    { value: "Ajuste", input: adjust },
    {
      value: "Instalacion",
      input: placement,
      paid: placement_paid,
      setPaid: setPlacement_paid,
    },
  ];

  const handleSubmitLoad = async () => {
    navigate("/loading");
    await axios.put(lightUpdateTotals(project.id), {
      adjust: Number(adjust.value),
      placement_total: Number(placement.value),
      placement_paid
    });
    if(amount.value) await axios.post(lightNewInvoice(project.id), {
      amount: Number(amount.value),
      projectId: project.id
    });
    navigate("/loading");
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
                {item.value} : ${" "}
                <input className="basic-input" {...item.input} />{" "}
                {item.setPaid && <><input type='checkbox' checked={item.paid} onChange={()=>item.setPaid(!item.paid)} /> {item.paid? 'Pagado': "Impago"} </>}
                {item.break && <hr/>}
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <button className='main-button' onClick={handleSubmitLoad}>Cargar</button>
          <button className='main-button' onClick={closeModal}>Cancelar</button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LightLoadModal;

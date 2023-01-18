import Modal from "react-bootstrap/Modal";
import useInput from "../hooks/useInput";
import axios from "axios";
import { marbleUpdateTotals, getProjectRoute, getAllProjectsRoute } from "../uris";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const MarbleLoadModal = ({ show, closeModal }) => {
  const navigate = useNavigate();
  const project = useSelector((state) => state.project);
  const total = useInput(project.marble_general.total ?? 0);
  const adjust = useInput(project.marble_general.adjust ?? 0);
  const placement = useInput(project.marble_general.placement_total ?? 0);
  const [placement_paid, setPlacement_paid] = useState(
    project.marble_general.placement_paid ?? false
  );

  const list = [
    { value: "Total", input: total },
    { value: "Ajuste", input: adjust },
    {
      value: "Colocacion",
      input: placement,
      paid: placement_paid,
      setPaid: setPlacement_paid,
    },
  ];

  const handleSubmitLoad = async () => {
    navigate("/loading");
    await axios.put(marbleUpdateTotals(project.id), {
      total: Number(total.value),
      adjust: Number(adjust.value),
      placement_total: Number(placement.value),
      placement_paid
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
                {item.value} : {item.value==='Colocacion' ? '$' : 'USD' }{" "}
                <input className="basic-input" {...item.input} />{" "}
                {item.setPaid && <><input type='checkbox' checked={item.paid} onChange={()=>item.setPaid(!item.paid)} /> {item.paid ? 'Pago': "Impago"} </>}
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

export default MarbleLoadModal;

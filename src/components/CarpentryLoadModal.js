import Modal from "react-bootstrap/Modal";
import useInput from "../hooks/useInput";
import axios from "axios";
import { carpentryUpdateTotals, getProjectRoute, getAllProjectsRoute } from "../uris";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from '../commons/Button'

const CarpentryLoadModal = ({ show, closeModal }) => {
  const navigate = useNavigate();
  const project = useSelector((state) => state.project);
  const total = useInput(project.carpentry_general.total ?? 0);
  const adjust = useInput(project.carpentry_general.adjust ?? 0);
  const shipping = useInput(project.carpentry_general.shipping_total ?? 0);
  const placement = useInput(project.carpentry_general.placement_total ?? 0);
  const [shipping_paid, setShipping_paid] = useState(
    project.carpentry_general.shipping_paid ?? false
  );
  const [placement_paid, setPlacement_paid] = useState(
    project.carpentry_general.placement_paid ?? false
  );

  const list = [
    { value: "Total", input: total },
    { value: "Ajuste", input: adjust },
    {
      value: "Envio",
      input: shipping,
      paid: shipping_paid,
      setPaid: setShipping_paid,
    },
    {
      value: "Instalacion",
      input: placement,
      paid: placement_paid,
      setPaid: setPlacement_paid,
    },
  ];

  const handleSubmitLoad = async () => {
    navigate("/loading");
    await axios.put(carpentryUpdateTotals(project.id), {
      total: Number(total.value),
      adjust: Number(adjust.value),
      shipping_total: Number(shipping.value),
      placement_total: Number(placement.value),
      shipping_paid,
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
                {item.value} : ${" "}
                <input className="basic-input" {...item.input} />{" "}
                {item.setPaid && <><input type='checkbox' checked={item.paid} onChange={()=>item.setPaid(!item.paid)} /> {item.paid ? 'Pago': "Impago"} </>}
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button text='Cargar' onClick={handleSubmitLoad}>Cargar</Button>
          <Button text='Cancelar' onClick={closeModal}>Cancelar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CarpentryLoadModal;

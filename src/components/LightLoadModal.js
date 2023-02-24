import Modal from "react-bootstrap/Modal";
import useInput from "../hooks/useInput";
import axios from "axios";
import { lightNewInvoice, lightUpdateTotals } from "../uris";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getAdminProject } from "../state/project";
import { getAllAdminProjects } from "../state/allProjects";
import { isValidDate } from "../utils/functions";
import swal from "sweetalert";

const LightLoadModal = ({ show, closeModal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project);
  const date = useInput(0);
  const amount = useInput(0);
  const adjust = useInput(project.light_general.adjust ?? 0);
  const placement = useInput(project.light_general.placement_total ?? 0);

  const list = [
    { value: "Fecha", input: date , type:'date' },
    { value: "Monto", input: amount, type:'number', break: true },
    { value: "Ajuste", input: adjust, type:'number' },
    { value: "Instalacion", input: placement, type: 'number' },
  ];

  const handleSubmitLoad = async () => {
    if(amount.value || date.value) {
      if(!isValidDate(date.value)) return swal('Revisar la fecha') 
      navigate("/loading");
      await axios.post(lightNewInvoice(project.id), {
        date: new Date(date.value),
        amount: Number(amount.value),
        projectId: project.id
      });
    } 
    if(adjust.value || placement.value) {
      navigate("/loading");
      await axios.put(lightUpdateTotals(project.id), {
      adjust: Number(adjust.value),
      placement_total: Number(placement.value)
    });
    }
    dispatch(getAdminProject(project.id));
    dispatch(getAllAdminProjects());
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
          <form id='light-load-form'  onSubmit={handleSubmitLoad}>
            <ul>
              {list.map((item) => (
                <li key={item.value}>
                  {item.value} : {item.type==='number' && '$'}{" "}
                  <input className="basic-input" type={item.type==='date' ? 'date' : 'number'} {...item.input} />{" "}
                  {item.break && <hr/>}
                </li>
              ))}
            </ul>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className='main-button' form='light-load-form' type='submit'>Cargar</button>
          <button className='main-button' onClick={closeModal}>Cancelar</button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LightLoadModal;

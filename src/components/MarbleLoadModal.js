import Modal from "react-bootstrap/Modal";
import useInput from "../hooks/useInput";
import axios from "axios";
import { marbleUpdateTotals } from "../uris";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getAdminProject } from "../state/project";
import { getAllAdminProjects } from "../state/allProjects";

const MarbleLoadModal = ({ show, closeModal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project);
  const total = useInput(project.marble_general.total ?? 0);
  const adjust = useInput(project.marble_general.adjust ?? 0);
  const placement = useInput(project.marble_general.placement_total ?? 0)

  const list = [
    { value: "Total", input: total },
    { value: "Ajuste", input: adjust },
    {
      value: "Colocacion",
      input: placement
    },
  ];

  const handleSubmitLoad = async () => {
    navigate("/loading");
    await axios.put(marbleUpdateTotals(project.id), {
      total: Number(total.value),
      adjust: Number(adjust.value),
      placement_total: Number(placement.value)
    });
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
          <ul>
            {list.map((item) => (
              <li key={item.value}>
                {item.value} : {item.value==='Colocacion' ? '$' : 'USD' }{" "}
                <input className="basic-input" {...item.input} />{" "}
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

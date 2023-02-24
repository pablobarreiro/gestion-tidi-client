import Modal from "react-bootstrap/Modal";
import useInput from "../hooks/useInput";
import axios from "axios";
import { editIncomeTotals } from "../uris";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from '../commons/Button'
import { getAllAdminProjects } from "../state/allProjects";
import { getAdminProject } from "../state/project";

const IncomeLoadModal = ({ show, closeModal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project);
  const total = useInput(project.income_total.total ?? 0);
  const adjust = useInput(project.income_total.adjust ?? 0);
  

  const list = [
    { value: "Total", input: total },
    { value: "Ajuste", input: adjust },
  ];

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      if(total.value || adjust.value) {
        navigate("/loading");
        await axios.put(editIncomeTotals(project.id), {
          total: Number(total.value),
          adjust: Number(adjust.value),
        });
        dispatch(getAdminProject(project.id));
        dispatch(getAllAdminProjects());
        navigate(`/project/${project.id}`);
      }
      closeModal();
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <>
      <Modal show={show} onHide={closeModal} centered>
        <form id='carpentry-load-form' onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{show}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul>
                {list.map((item) => (
                  <li key={item.value}>
                    {item.value} : ${" "}
                    <input className="basic-input" {...item.input} />{" "}
                    </li>
                ))}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button text='Aceptar' type='submit' form="carpentry-load-form" />
            <Button text='Cancelar' onClick={closeModal} />
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default IncomeLoadModal;

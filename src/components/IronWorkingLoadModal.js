import Modal from "react-bootstrap/Modal";
import useInput from "../hooks/useInput";
import axios from "axios";
import { ironWorkingUpdateTotals, ironWorkingNewInvoice } from "../uris";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isValidDate } from "../utils/functions";
import { getAdminProject } from "../state/project";
import { getAllAdminProjects } from "../state/allProjects";
import { useEffect } from "react";

const IronWorkingLoadModal = ({ show, closeModal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project);
  const amount = useInput(0);
  const adjust = useInput(project.iron_working_general.adjust ?? 0);
  const invoice_date = useInput('');
  const invoice_number = useInput('');

  const list = [
    { value: "Nro Factura", input: invoice_number, type: 'string' },
    { value: "Fecha Factura", input: invoice_date, type: 'date' },
    { value: "Monto", input: amount, type: 'number' },
  ];

  useEffect(()=> {
    if(amount.value < 0) amount.setvalue(0)
    if(adjust.value < 0) adjust.setvalue(0)
  }, [amount.value, adjust.value])

  const handleSubmitLoad = async (e) => {
    try {
      e.preventDefault()
      navigate("/loading");
      if(adjust.value !== project.iron_working_general.adjust) {
        await axios.put(ironWorkingUpdateTotals(project.id), {
          adjust: Number(adjust.value),
        });
      }
      if(invoice_number.value || amount.value) {
        if(!isValidDate(invoice_date.value)) {
          navigate(`/project/${project.id}`);
          return alert('Revisar la fecha de factura')
        }
        if(invoice_number.value && invoice_date.value && amount.value) await axios.post(ironWorkingNewInvoice(project.id), {
          invoice_number: invoice_number.value,
          invoice_date: new Date(invoice_date.value),
          amount: Number(amount.value),
          projectId: project.id
        })
        else {
          navigate(`/project/${project.id}`);
          return alert('Completar los 3 campos para cargar la factura')
        } 
      }
      dispatch(getAdminProject(project.id));
      dispatch(getAllAdminProjects());
      navigate(`/project/${project.id}`);
      closeModal();
    } catch(err) {
      console.log('HUBO UN ERROR:',err)
    }
  };

  return (
    <>
      <Modal show={show} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{show}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="load-iron-working" onSubmit={handleSubmitLoad}>
            <ul>
              {list.map((item) => (
                <li key={item.value}>
                  {item.value} : {item.type==='number' && '$'} {" "}
                  <input className="basic-input" type={item.type==='date' ? 'date' : item.type==='number' ? 'number' : 'text'} placeholder={item.type==='date' ? 'AAAA/MM/DD': ''} {...item.input} />{" "}
                </li>
              ))}
              <hr/>
              <p>
              Ajuste : $ <input className="basic-input" {...adjust} />{" "}
              </p>
            </ul>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className='main-button' type="submit" form="load-iron-working">Cargar</button>
          <button className='main-button' onClick={closeModal}>Cancelar</button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default IronWorkingLoadModal;

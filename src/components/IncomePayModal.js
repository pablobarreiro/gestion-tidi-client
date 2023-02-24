import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../hooks/useInput";
import axios from "axios";
import { formatNumber, isValidDate } from "../utils/functions";
import { useNavigate, useParams } from "react-router-dom";
import { getAllAdminProjects } from "../state/allProjects";
import { getAdminProject } from "../state/project";
import { newPayment } from "../uris";
import swal from "sweetalert";
import { useEffect } from "react";

const IncomePayModal = ({ show, closeModal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const project = useSelector((state) => state.project);
  const budget = useSelector((state) => state.budget);
  const { income_total, income_partials } = project;
  const payTotal = useInput("");
  const payDate = useInput("");
  const payMethod = useInput("");
  const payRef = useInput("");

  const remaining = income_total.total + income_total.adjust - income_partials.reduce((acum,income)=> acum + income.amount,0)


  useEffect(()=> {
    if(payTotal.value > remaining) payTotal.setvalue(remaining)
    if(payTotal.value < 0) payTotal.setvalue(0)
  },[payTotal.value])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (payTotal.value && payMethod.value) {
      if (!isValidDate(payDate.value)) return swal("la fecha esta mal");
      navigate("/loading");
      const objectToSend = {
        pay_date: new Date(payDate.value),
        amount: payTotal.value,
        projectId: Number(projectId),
        payment_method: payMethod.value,
        payment_info: payRef.value,
      };
      await axios.post(newPayment(), objectToSend);
    } else {
      return swal("Completar todos los campos requeridos");
    }
    dispatch(getAllAdminProjects());
    dispatch(getAdminProject(projectId));
    navigate(`/project/${projectId}`);
    closeModal();
  };

  return (
    <>
      <Modal
        show={show}
        onHide={closeModal}
        fullscreen="lg-down"
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{show}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>TM-{projectId}</h5>
          <form id="income-payment" onSubmit={handleSubmit}>
            <p>Total: $ {income_total.total}</p>
            <p>
              Faltante: ${" "}
              {income_total.total +
                income_total.adjust -
                income_partials.reduce(
                  (acum, outcome) => acum + outcome.amount,
                  0
                )}
            </p>
            <p>
              * Total a cobrar: ${" "}
              <input className="basic-input" {...payTotal} />
            </p>
            <p>
              * Fecha de cobro :{" "}
              <input
                className="basic-input"
                type="date"
                placeholder="AAAA/MM/DD"
                {...payDate}
              />
            </p>
            <p>
              * Forma de pago :{" "}
              <select {...payMethod}>
                <option></option>
                <option>Efectivo</option>
                <option>Banco</option>
              </select>
            </p>
            <p>
              Referencia : <input className="basic-input" {...payRef} />
            </p>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="main-button" type="submit" form="income-payment">
            Aceptar
          </button>
          <button className="main-button" onClick={closeModal}>
            Cancelar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default IncomePayModal;

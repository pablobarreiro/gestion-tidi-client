import axios from "axios";
import { useState } from "react";
import Table from "react-bootstrap/esm/Table";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import Button from "../commons/Button";
import useInput from "../hooks/useInput";
import { getProject } from "../state/project";
import { lightDeleteOutcome, lightPayInvoices, lightUpdateTotals } from "../uris";
import CustomInput from "../commons/CustomInput";
import { isValidDate } from "../utils/functions";
import { useNavigate } from "react-router-dom";

const LightPayModal = ({ show, closeModal }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { light_outcomes, light_general } = useSelector(
    (state) => state.project
  );
  const payDate = useInput("");
  const { projectId } = light_general;
  const [invoiceToPay, setInvoiceToPay] = useState([]);
  const [adjustPaid, setAdjustPaid] = useState(light_general.adjust_paid);

  const adjustPayingSubtotal = !light_general.adjust_paid ? adjustPaid ? light_general.adjust:0:0;
  const invoicePayingSubtotal = invoiceToPay.reduce(
    (acum, invoice) => (invoice.paid ? Number(invoice.amount) + acum : acum),
    0
  )
  const totalToPay = invoicePayingSubtotal+adjustPayingSubtotal

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidDate(payDate.value)) return alert("Colocar una fecha valida");
    navigate('/loading')
    const finalInvoicesToPay = invoiceToPay.map((invoice) =>
      invoice.paid
        ? invoice.pay_date
          ? {}
          : { ...invoice, pay_date: new Date(payDate.value) }
        : invoice.pay_date
        ? { ...invoice, pay_date: null }
        : {}
    );
    await axios.put(lightPayInvoices(), finalInvoicesToPay);
    if (adjustPaid !== light_general.adjust_paid)
      await axios.put(lightUpdateTotals(projectId), {
        adjust_paid: adjustPaid,
      });
    dispatch(getProject(projectId));
    navigate(`/project/${projectId}`)
    closeModal();
  };

  const handleDelete = async (outcome) => {
    await axios.delete(lightDeleteOutcome(outcome.id));
    dispatch(getProject(outcome.projectId));
  };

  return (
    <>
      <Modal
        show={show}
        onHide={closeModal}
        fullscreen="lg-down"
        size={light_outcomes.length ? "lg" : "md"}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{show}</Modal.Title>
        </Modal.Header>
        {light_outcomes.length ? (
          <>
            <Modal.Body>
              <form id="carpentry-payment">
                <h5>TM-{projectId}</h5>
                <p>
                  Fecha Pago :{" "}
                  <input
                    className="basic-input"
                    placeholder="AAAA/MM/DD"
                    {...payDate}
                  />
                </p>
                <Table>
                  <thead>
                    <tr>
                      <th>Monto</th>
                      <th>Pagar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {light_outcomes.map((outcome) => (
                      <CustomInput
                        key={outcome.id}
                        outcome={outcome}
                        invoiceToPay={invoiceToPay}
                        setInvoiceToPay={setInvoiceToPay}
                        handleDelete={handleDelete}
                      />
                    ))}
                  </tbody>
                </Table>
                {light_general.adjust > 0 && (
                  <p>
                    Pagar Ajuste:{" "}
                    <input
                      type="checkbox"
                      checked={adjustPaid}
                      onChange={() => setAdjustPaid(!adjustPaid)}
                    />{" "}
                    {!light_general.adjust_paid &&
                      `$ ${light_general.adjust}`}
                  </p>
                )}
              </form>
              <p>Total a pagar: $ {totalToPay}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button
                text="Aceptar"
                type="submit"
                form="carpentry-payment"
                onClick={handleSubmit}
              />
              <Button text="Cancelar" onClick={closeModal} />
            </Modal.Footer>
          </>
        ) : (
          <>
            <Modal.Body>
              <p>No hay facturas para pagar</p>
            </Modal.Body>
            <Modal.Footer>
              <Button text="Cerrar" onClick={closeModal} />
            </Modal.Footer>
          </>
        )}
      </Modal>
    </>
  );
};

export default LightPayModal;

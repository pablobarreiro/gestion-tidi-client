import axios from "axios";
import { useState } from "react";
import Table from "react-bootstrap/esm/Table";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import Button from "../commons/Button";
import useInput from "../hooks/useInput";
import { getProject } from "../state/project";
import { ironWorkingPayInvoices } from "../uris";
import IronWorkingInput from "./IronWorkingInput";

const IronWorkingPayModal = ({ show, closeModal }) => {
  const dispatch = useDispatch();
  const { iron_working_outcomes, iron_working_general } = useSelector(
    (state) => state.project
  );
  const payDate = useInput("");
  const { projectId } = iron_working_general;
  const [invoiceToPay, setInvoiceToPay] = useState([]);

  const totalToPay = invoiceToPay.reduce(
    (acum, invoice) => (invoice.paid ? Number(invoice.amount) + acum : acum),
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (payDate.value.length === 0) return alert('Colocar una fecha valida')
    if (payDate.value.length < 8) return alert("El formato de la fecha esta mal");
    const finalInvoicesToPay = invoiceToPay.map((invoice) => {
      return invoice.paid ? 
      invoice.pay_date ? 
      {} :
      { ...invoice, pay_date: new Date(payDate.value) } 
      : invoice.pay_date ? { ...invoice, pay_date: null } : {};
    });
    await axios.put(ironWorkingPayInvoices(), finalInvoicesToPay);
    dispatch(getProject(projectId));
    closeModal();
  };

  console.log('INVOICE TO PAY', invoiceToPay)
  return (
    <>
      <Modal show={show} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{show}</Modal.Title>
        </Modal.Header>
        {iron_working_outcomes.length ? (
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
                      <th>Nro Factura</th>
                      <th>Fecha Factura</th>
                      <th>Monto</th>
                      <th>Pagar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {iron_working_outcomes.map((outcome) => (
                      <IronWorkingInput
                        key={outcome.id}
                        outcome={outcome}
                        invoiceToPay={invoiceToPay}
                        setInvoiceToPay={setInvoiceToPay}
                      />
                    ))}
                  </tbody>
                </Table>
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
              <Button text="Volver" onClick={closeModal} />
            </Modal.Footer>
          </>
        )}
      </Modal>
    </>
  );
};

export default IronWorkingPayModal;

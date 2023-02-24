import axios from "axios";
import { useState } from "react";
import Table from "react-bootstrap/esm/Table";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import Button from "../commons/Button";
import useInput from "../hooks/useInput";
import { getAdminProject } from "../state/project";
import { ironWorkingPayInvoices, ironWorkingUpdateTotals } from "../uris";
import CustomInput from "../commons/CustomInput";
import { formatNumber, isValidDate } from "../utils/functions";
import { useNavigate } from "react-router-dom";

const IronWorkingPayModal = ({ show, closeModal }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { iron_working_outcomes, iron_working_general } = useSelector(
    (state) => state.project
  );
  const payDate = useInput("");
  const { projectId } = iron_working_general;
  const [invoiceToPay, setInvoiceToPay] = useState([]);
  const [adjustPaid, setAdjustPaid] = useState(iron_working_general.adjust_paid);

  const adjustPayingSubtotal = !iron_working_general.adjust_paid ? adjustPaid ? iron_working_general.adjust:0:0;
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
    await axios.put(ironWorkingPayInvoices(), finalInvoicesToPay);
    if (adjustPaid !== iron_working_general.adjust_paid)
      await axios.put(ironWorkingUpdateTotals(projectId), {
        adjust_paid: adjustPaid,
      });
    dispatch(getAdminProject(projectId));
    navigate(`/project/${projectId}`)
    closeModal();
  };

  return (
    <>
      <Modal
        show={show}
        onHide={closeModal}
        fullscreen="lg-down"
        size={iron_working_outcomes.length ? "lg" : "md"}
        centered
      >
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
                    type="date"
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
                      <th>Estado</th>
                      <th>Pagar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {iron_working_outcomes.map((outcome) => (
                      <CustomInput
                        key={outcome.id}
                        outcome={outcome}
                        invoiceToPay={invoiceToPay}
                        setInvoiceToPay={setInvoiceToPay}
                        totalOutcomes={iron_working_outcomes}
                      />
                    ))}
                  </tbody>
                </Table>
                {iron_working_general.adjust > 0 && (
                  <p>
                    Pagar Ajuste:{" "}
                    <input
                      type="checkbox"
                      checked={adjustPaid}
                      onChange={() => setAdjustPaid(!adjustPaid)}
                    />{" "}
                    {!iron_working_general.adjust_paid &&
                      `$ ${iron_working_general.adjust}`}
                  </p>
                )}
              </form>
              <p>Total a pagar: $ {formatNumber(totalToPay)}</p>
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

export default IronWorkingPayModal;

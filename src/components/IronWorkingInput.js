import axios from "axios";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { ironWorkingDeleteOutcome } from "../uris";
import { getProject } from "../state/project";

const IronWorkingInput = ({ outcome, invoiceToPay, setInvoiceToPay }) => {
  const dispatch = useDispatch();
  const [invoicePaid, setInvoicePaid] = useState(outcome.paid);

  const handleDelete = async () => {
    await axios.delete(ironWorkingDeleteOutcome(outcome.id));
    dispatch(getProject(outcome.projectId));
  };
console.log("OUTCOME", outcome)
  useEffect(() => {
    const index = invoiceToPay.findIndex(
      (invoice) => invoice.id === outcome.id
    );
    let invoiceList = [...invoiceToPay];
      if(index <0) invoiceList.push({
        id: outcome.id,
        projectId: outcome.projectId,
        amount: outcome.amount,
        invoice_number: outcome.invoice_number,
        pay_date: outcome.pay_date,
        paid: invoicePaid,
      })
    else if (outcome.paid)
      invoiceList[index] = {
        id: outcome.id,
        projectId: outcome.projectId,
        amount: outcome.amount,
        invoice_number: outcome.invoice_number,
        pay_date: outcome.pay_date,
        paid: false,
      };
    else if (invoicePaid) {
      invoiceList[index] = {
        id: outcome.id,
        projectId: outcome.projectId,
        amount: outcome.amount,
        invoice_number: outcome.invoice_number,
        pay_date: outcome.pay_date,
        paid: true,
      };
    } else {
      invoiceList[index] = {
        id: outcome.id,
        projectId: outcome.projectId,
        amount: outcome.amount,
        invoice_number: outcome.invoice_number,
        pay_date: outcome.pay_date,
        paid: false,
      };
    }
    setInvoiceToPay(invoiceList);
  }, [invoicePaid]);

  return (
    <tr>
      <td>{outcome.invoice_number}</td>
      <td>{outcome.invoice_date.slice(0, 10)}</td>
      <td>{outcome.amount}</td>
      <td>
        <input
          type="checkbox"
          checked={invoicePaid}
          onChange={() => setInvoicePaid(!invoicePaid)}
        />
      </td>
      <td>
        <FaTrash onClick={handleDelete} />
      </td>
    </tr>
  );
};

export default IronWorkingInput;

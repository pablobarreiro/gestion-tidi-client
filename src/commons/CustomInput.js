import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

const CustomInput = ({ outcome, invoiceToPay, setInvoiceToPay, handleDelete }) => {
  const [invoicePaid, setInvoicePaid] = useState(outcome.paid);

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
      {outcome.invoice_number && <td>{outcome.invoice_number}</td>}
      {outcome.invoice_date && <td>{outcome.invoice_date.slice(0, 10)}</td>}
      <td>$ {outcome.amount}</td>
      <td>
        <input
          type="checkbox"
          checked={invoicePaid}
          onChange={() => setInvoicePaid(!invoicePaid)}
        />
      </td>
      <td>
        <FaTrash onClick={()=>handleDelete(outcome)} />
      </td>
    </tr>
  );
};

export default CustomInput;

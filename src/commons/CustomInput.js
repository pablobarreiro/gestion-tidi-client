import { useEffect, useState } from "react";
import { formatNumber } from "../utils/functions";

const CustomInput = ({ outcome, invoiceToPay, setInvoiceToPay }) => {
  const [invoicePaid, setInvoicePaid] = useState(outcome.paid);

  console.log('invoiceToPay', invoiceToPay)
  useEffect(() => {
    const index = invoiceToPay.findIndex(
      (invoice) => invoice.id === outcome.id
      );
      let invoiceList = [...invoiceToPay];
      if(invoiceToPay.length===0) {
        invoiceList.push({})
      } else if(index <0) {
        console.log('se ejecuta')
        invoiceList.push({
          ...outcome,
          paid: invoicePaid,
        })
      } else if (outcome.paid){
      invoiceList[index] = {
        ...outcome,
        paid: false,
      }
    } else {
      invoiceList[index] = {
        ...outcome,
        paid: invoicePaid,
      };
    }
    setInvoiceToPay(invoiceList);
  }, [invoicePaid]);

  return (
    <tr>
      {outcome.date && <td>{outcome.date.split('T')[0].replace(/-/g, "/")}</td>}
      {outcome.invoice_number && <td>{outcome.invoice_number}</td>}
      {outcome.invoice_date && <td>{outcome.invoice_date.split('T')[0].replace(/-/g, "/")}</td>}
      <td>$ {formatNumber(outcome.amount)}</td>
      <td>{outcome.paid ? 'Pago': 'Impago'}</td>
      <td>
        <input
          type="checkbox"
          checked={invoicePaid}
          onChange={() => setInvoicePaid(!invoicePaid)}
        />
      </td>
    </tr>
  );
};

export default CustomInput;

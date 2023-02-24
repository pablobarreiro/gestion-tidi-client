import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import { formatDate, formatNumber } from "../utils/functions";

const MonthlyInvoice = ({ JSONMonth }) => {
  const month = JSONMonth ? JSON.parse(JSONMonth) : {};
  const allProjects = useSelector((state) => state.allProjects);
  const [filteredInvoices, setFilteredInvoices] = useState([]);

  useEffect(() => {
    const finalArray = [];
    const mappedProjects =
      allProjects &&
      allProjects.map((project) =>
        project.iron_working_outcomes.filter(
          (outcome) =>
            new Date(formatDate(outcome.invoice_date)).getMonth() ===
            month.index
        )
      );
    mappedProjects.forEach((outputsArray) =>
      outputsArray.forEach((output) => output.id && finalArray.push(output))
    );
    setFilteredInvoices(finalArray);
  }, [month.value]);

  if (!month.value) return <></>;
  if (!filteredInvoices.length) return <p>No hay facturas cargadas este mes</p>;
  return (
    <>
      <Table striped bordered className="report-table">
        <thead>
          <tr>
            <th>Proyecto</th>
            <th>Factura nro</th>
            <th>Fecha Factura</th>
            <th>Estado</th>
            <th>Fecha Pago</th>
            <th>Monto</th>
          </tr>
        </thead>
        <tbody>
          {filteredInvoices &&
            filteredInvoices.map((invoice, i) => (
              <tr>
                <td>{invoice.projectId}</td>
                <td>{invoice.invoice_number}</td>
                <td>{formatDate(invoice.invoice_date)}</td>
                <td>{invoice.paid ? "Pago" : "Impago"}</td>
                <td>{invoice.paid ? formatDate(invoice.pay_date) : "-"}</td>
                <td>$ {formatNumber(invoice.amount)}</td>
              </tr>
            ))}
          <tr>
            <td />
            <td />
            <td />
            <td />
            <td>Total</td>
            <td>
              ${" "}
              {formatNumber(
                filteredInvoices.reduce((ac, invoice) => ac + invoice.amount, 0)
              )}
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default MonthlyInvoice;

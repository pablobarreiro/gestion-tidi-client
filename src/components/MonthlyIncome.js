import { useEffect, useState } from "react";
import Table from "react-bootstrap/esm/Table";
import { useSelector } from "react-redux";
import useInput from "../hooks/useInput";
import { formatDate, formatNumber } from "../utils/functions";

const MonthlyIncome = ({ JSONMonth }) => {
  const month = JSONMonth ? JSON.parse(JSONMonth) : {};
  const allProjects = useSelector((state) => state.allProjects);
  const [filteredIncomes, setFilteredIncomes] = useState([]);
  const payMethodInput = useInput("Total");

  useEffect(() => {
    const finalArray = [];
    const mappedProjects =
      allProjects &&
      allProjects.map((project) =>
        project.income_partials.filter(
          (income) =>
            new Date(formatDate(income.pay_date)).getMonth() === month.index
        )
      );
    mappedProjects.forEach((outputsArray) =>
      outputsArray.forEach((output) => output.id && finalArray.push(output))
    );
    const paymentFiltered = finalArray.filter((income) =>
      payMethodInput.value === "Total"
        ? true
        : income.payment_method === payMethodInput.value
    );
    setFilteredIncomes(paymentFiltered);
  }, [month.value, payMethodInput.value]);

  if (!month.value) return <></>;

  return (
    <>
      {filteredIncomes.length ? <select {...payMethodInput} className='report-selector'>
        <option>Total</option>
        <option>Efectivo</option>
        <option>Banco</option>
      </select> : <></>}
      {filteredIncomes.length ? 
      <Table striped bordered className="report-table">
        <thead>
          <tr>
            <th>Proyecto</th>
            <th>Fecha Cobro</th>
            <th>Metodo de Pago</th>
            <th>Referencia</th>
            <th>Monto</th>
          </tr>
        </thead>
        <tbody>
          {filteredIncomes &&
            filteredIncomes.map((income, i) => (
              <tr key={i}>
                <td>{income.projectId}</td>
                <td>{formatDate(income.pay_date)}</td>
                <td>{income.payment_method}</td>
                <td>{income.payment_info ? income.payment_info : "-"}</td>
                <td>$ {formatNumber(income.amount)}</td>
              </tr>
            ))}
          <tr>
            <td />
            <td />
            <td />
            <td>Total</td>
            <td>
              ${" "}
              {formatNumber(
                filteredIncomes.reduce((ac, invoice) => ac + invoice.amount, 0)
              )}
            </td>
          </tr>
        </tbody>
      </Table>
      :
      <p>No hay cobros para mostrar este mes</p>
      }
    </>
  );
};

export default MonthlyIncome;

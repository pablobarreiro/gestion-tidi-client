import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
import useInput from "../hooks/useInput";
import { formatDate, formatNumber } from "../utils/functions";

const MonthlyPayments = ({ JSONMonth }) => {
  const month = JSONMonth ? JSON.parse(JSONMonth) : "";
  const allProjects = useSelector((state) => state.allProjects);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const selectedCategoryInput = useInput("Total");
  const categoryOptions = ['Todos los rubros','Carpinteria','Herrajes','Iluminacion','Marmol']
  const categorySelector = useInput(categoryOptions[0])

  const carpentryMap =
    allProjects &&
    allProjects.map((project) =>
      project.carpentry_outcomes.map((outcome) =>
        new Date(formatDate(outcome.pay_date)).getMonth() === month.index
          ? outcome
          : null
      )
    );
  const ironWorkingMap =
    allProjects &&
    allProjects.map((project) =>
      project.iron_working_outcomes.map(
        (outcome) =>
          outcome.paid &&
          (new Date(formatDate(outcome.pay_date)).getMonth() === month.index
            ? outcome
            : null)
      )
    );
  const lightMap =
    allProjects &&
    allProjects.map((project) =>
      project.light_outcomes.map(
        (outcome) =>
          outcome.paid &&
          (new Date(formatDate(outcome.pay_date)).getMonth() === month.index
            ? outcome
            : null)
      )
    );
  const marbleMap =
    allProjects &&
    allProjects.map((project) =>
      project.marble_outcomes.map((outcome) =>
        new Date(formatDate(outcome.pay_date)).getMonth() === month.index
          ? outcome
          : null
      )
    );

  useEffect(()=> {
    if(carpentryMap && ironWorkingMap && lightMap && marbleMap) {
      const finalArray = []
      carpentryMap.forEach(array => array.forEach(output => output && finalArray.push({...output,category:'Carpinteria'})))
      ironWorkingMap.forEach(array => array.forEach(output => output && finalArray.push({...output,category:'Herrajes'})))
      lightMap.forEach(array => array.forEach(output => output && finalArray.push({...output,category:'Iluminacion'})))
      marbleMap.forEach(array => array.forEach(output => output && finalArray.push({...output,category:'Marmol'})))
      const filterByCategory = categorySelector.value !== categoryOptions[0] ? finalArray.filter(output => output.category === categorySelector.value) : finalArray.filter(output => true)
      setFilteredPayments(filterByCategory)
    }
  },[month.value,selectedCategoryInput.value, categorySelector.value])

  if (!month.value) return <></>;
  if (!filteredPayments.length) return <p>No hay gastos cargados este mes</p>;
  return <>
  <select {...categorySelector} className='report-selector'>
    {categoryOptions.map(option => <option key={option}>{option}</option>)}
  </select>
  <Table striped bordered className="report-table">
        <thead>
          <tr>
            <th>Proyecto</th>
            <th>Categoria</th>
            <th>Fecha Pago</th>
            <th>Monto</th>
          </tr>
        </thead>
        <tbody>
          {filteredPayments &&
            filteredPayments.map((output, i) => (
              <tr key={i}>
                <td>{output.projectId}</td>
                <td>{output.category}</td>
                <td>{formatDate(output.pay_date)}</td>
                <td>$ {formatNumber(output.amount)}</td>
              </tr>
            ))}
          <tr>
            <td />
            <td />
            <td>Total</td>
            <td>
              ${" "}
              {formatNumber(
                filteredPayments.reduce((ac, output) => ac + output.amount, 0)
              )}
            </td>
          </tr>
        </tbody>
      </Table>
  </>;
};

export default MonthlyPayments;

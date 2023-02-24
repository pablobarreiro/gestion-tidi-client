import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import { formatDate, formatNumber } from "../utils/functions";
import useInput from "../hooks/useInput";
import axios from "axios";
import { salesmanList } from "../uris";

const MonthlyCommissions = ({ JSONMonth }) => {
  const month = JSONMonth ? JSON.parse(JSONMonth) : "";
  const allProjects = useSelector((state) => state.allProjects);
  const [filteredCommisions, setFilteredCommisions] = useState([]);
  const [salesmen, setSalesmen] = useState([]);

  const initialOption = 'Elegir vendedor'
  const salesmanInput = useInput(initialOption);

  useEffect(() => {
    const fetchData = async () => {
      const firstSalesmenList = await axios.get(salesmanList());
      setSalesmen(firstSalesmenList.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const finalArray = [];
    const filteredProjects =
      allProjects &&
      allProjects.filter(
        (project) =>
          new Date(formatDate(project.initial_date)).getMonth() === month.index
      );
    const finalFilter = filteredProjects.filter(
      (project) =>
        (project.salesman === salesmanInput.value) ||
        (project.sale_assistant === salesmanInput.value)
    );
    finalFilter.forEach((project) => {
      finalArray.push({
        projectId: project.id,
        salesman: project.salesman,
        sale_assistant: project.sale_assistant,
        budget_total: project.budget.total,
        income_total: project.income_total.total,
      });
    });

    setFilteredCommisions(finalArray);
  }, [month.value, salesmanInput.value]);

  console.log("Comisiones", filteredCommisions);

  if (!month.value) return <></>;
  return (
    <>
      <select {...salesmanInput} className='report-selector'>
        <option disabled>{initialOption}</option>
        {salesmen.map((salesman, i) => (
          <option key={i}>{salesman.name}</option>
        ))}
      </select>
    </>
  );
};

export default MonthlyCommissions;

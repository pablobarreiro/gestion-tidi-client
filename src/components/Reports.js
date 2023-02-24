import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import MonthlyCommissions from "./MonthlyCommissions";
import MonthlyIncome from "./MonthlyIncome";
import MonthlyInvoice from "./MonthlyInvoice";
import MonthlyPayments from "./MonthlyPayments";

const Reports = () => {
  const navigate = useNavigate();
  const selectedReport = useInput("");
  const options = [
    { title: "Facturas" },
    { title: "Comisiones" },
    { title: "Cobros" },
    { title: "Gastos" },
  ];

  const selectedMonth = useInput("");

  const months = [
    { index: 0, value: "Enero" },
    { index: 1, value: "Febrero" },
    { index: 2, value: "Marzo" },
    { index: 3, value: "Abril" },
    { index: 4, value: "Mayo" },
    { index: 5, value: "Junio" },
    { index: 6, value: "Julio" },
    { index: 7, value: "Agosto" },
    { index: 8, value: "Septiembre" },
    { index: 9, value: "Octubre" },
    { index: 11, value: "Noviembre" },
    { index: 12, value: "Diciembre" },
  ];

  useEffect(() => {
    let path = "/reports";
    switch (selectedReport.value) {
      case options[0].title:
        path += "/invoices";
        break;
      case options[1].title:
        path += "/commissions";
        break;
      case options[2].title:
        path += "/income";
        break;
      case options[3].title:
        path += "/payments";
        break;
    }
    navigate(path);
  }, [selectedReport.value]);

  return (
    <div className="report-container">
      <h1>Reportes</h1>
      <div className="report-subcontainer break">
        <div>
          <p className="report-label">Tipo de reporte: </p>
          <select {...selectedReport} className="report-selector">
            <option> </option>
            {options.map((option) => (
              <option key={option.title}>{option.title}</option>
            ))}
          </select>
        </div>
        <div style={{marginLeft:'10px'}}>
          <p className="report-label">Mes:</p>
          <select {...selectedMonth} className="report-selector">
            <option> </option>
            {months.map((month) => (
              <option value={JSON.stringify(month)} key={month.index}>
                {month.value}
              </option>
            ))}
          </select>
        </div>
      </div>
      {selectedMonth.value && selectedReport.value && (
        <h1>
          {selectedReport.value} de {JSON.parse(selectedMonth.value).value}
        </h1>
      )}

      <Routes>
        <Route
          path="/invoices"
          element={<MonthlyInvoice JSONMonth={selectedMonth.value} />}
        />
        <Route
          path="/commissions"
          element={<MonthlyCommissions JSONMonth={selectedMonth.value} />}
        />
        <Route
          path="/income"
          element={<MonthlyIncome JSONMonth={selectedMonth.value} />}
        />
        <Route
          path="/payments"
          element={<MonthlyPayments JSONMonth={selectedMonth.value} />}
        />
      </Routes>
    </div>
  );
};

export default Reports;

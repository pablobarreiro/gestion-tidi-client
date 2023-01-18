import Grid from "../commons/Grid";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProject } from "../state/project";
import DetailsModal from "../commons/DetailsModal";
import CarpentryLoadModal from "./CarpentryLoadModal";
import IronWorkingLoadModal from "./IronWorkingLoadModal";
import LightLoadModal from "./LightLoadModal";
import MarbleLoadModal from "./MarbleLoadModal";
import CarpentryPayModal from "./CarpentryPayModal";
import IronWorkingPayModal from "./IronWorkingPayModal";
import LightPayModal from "./LightPayModal";
import MarblePayModal from "./MarblePayModal";
import IncomeLoadModal from "./IncomeLoadModal";
import IncomePayModal from "./IncomePayModal";

const SingleProject = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showLoad, setShowLoad] = useState("");
  const [showPay, setShowPay] = useState("");
  const [showDetails, setShowDetails] = useState("");
  const { projectId } = useParams();
  const project = useSelector((state) => state.project);
  const user = useSelector((state) => state.user);

  const showStates = {
    payCarp: "Carpinteria - Pagar parciales",
    loadCarp: "Carpinteria - Cargar Total/Ajustes",
    detailsCarp: "Carpinteria - Detalles",
    payIron: "Herrajes - Pagar parciales",
    loadIron: "Herrajes - Cargar Factura/Modificar Ajustes",
    detailsIron: "Herrajes - Detalles",
    payLights: "Iluminacion - Pagar parciales",
    loadLights: "Iluminacion - Cargar Pedido/Modificar Ajustes",
    detailsLights: "Iluminacion - Detalles",
    payMarble: "Marmol - Pagar parciales",
    loadMarble: "Marmol - Cargar Total/Ajustes",
    detailsMarble: "Marmol - Detalles",
    payIncome: "Ingresos - Cobros parciales",
    loadIncome: "Ingresos - Cargar Total/Ajustes",
    detailsIncome: "Ingresos - Detalles",
  };
  
  useEffect(() => {
    if (!user) navigate("/login");
  }, [projectId]);

  useEffect(() => {
    dispatch(getProject(projectId));
  }, [projectId]);

  const [detailsInfo, setDetailsInfo] = useState([]);
  const [detailsHeadlines, setDetailsHeadlines] = useState([]);
  const headlines = {
    carpentry: ["Fecha Pago", "Monto", "nro Seguimiento","Eliminar"],
    ironWorking: ["Fecha Pago", "nro Factura", "Fecha Factura", "Monto", "Estado","Eliminar"],
    light: ["Fecha Pago", "Monto", "Estado","Eliminar"],
    marble: ["Fecha Pago", "Monto","Eliminar"],
    income: ["Fecha Cobro", "Monto", "Metodo Pago","Referencia","Eliminar"],
  };

  useEffect(() => {
    const cat = showDetails.slice(0, 3);
    switch (cat) {
      case "Car":
        setDetailsInfo(project.carpentry_outcomes);
        setDetailsHeadlines(headlines.carpentry);
        break;
      case "Her":
        setDetailsInfo(project.iron_working_outcomes);
        setDetailsHeadlines(headlines.ironWorking);
        break;
      case "Ilu":
        setDetailsInfo(project.light_outcomes);
        setDetailsHeadlines(headlines.light);
        break;
      case "Mar":
        setDetailsInfo(project.marble_outcomes);
        setDetailsHeadlines(headlines.marble);
        break;
      case "Ing":
        setDetailsInfo(project.income_partials);
        setDetailsHeadlines(headlines.income);
        break;
      default:
        setDetailsInfo([]);
        setDetailsHeadlines([]);
        break;
    }
  }, [showDetails]);

  const categories = !project
    ? []
    : [
        {
          title: "Carpinteria",
          ...project.carpentry_general,
          outcomes: project.carpentry_outcomes,
          remaining:
            project.carpentry_general.total +
            project.carpentry_general.adjust -
            project.carpentry_outcomes.reduce((ac, cv) => ac + cv.amount, 0),
          payOnClick: () => setShowPay(showStates.payCarp),
          loadOnClick: () => setShowLoad(showStates.loadCarp),
          detailsOnClick: () => setShowDetails(showStates.detailsCarp),
        },
        {
          title: "Herrajes",
          ...project.iron_working_general,
          outcomes: project.iron_working_outcomes,
          total: project.iron_working_outcomes.reduce(
            (ac, cv) => (cv.amount ? ac + cv.amount : ac + 0),
            0
          ),
          remaining:
            project.iron_working_outcomes.reduce(
              (ac, cv) => (cv.amount ? ac + cv.amount : ac + 0),
              0
            ) +
            (!project.iron_working_general.adjust_paid
              ? project.iron_working_general.adjust
              : 0) -
            project.iron_working_outcomes.reduce(
              (ac, cv) => (cv.paid ? ac + cv.amount : ac + 0),
              0
            ),
          payOnClick: () => setShowPay(showStates.payIron),
          loadOnClick: () => setShowLoad(showStates.loadIron),
          detailsOnClick: () => setShowDetails(showStates.detailsIron),
        },
        {
          title: "Iluminacion",
          ...project.light_general,
          outcomes: project.light_outcomes,
          total: project.light_outcomes.reduce(
            (ac, cv) => (cv.amount ? ac + cv.amount : ac + 0),
            0
          ),
          remaining:
            project.light_outcomes.reduce(
              (ac, cv) => (cv.amount ? ac + cv.amount : ac + 0),
              0
            ) +
            project.light_general.adjust -
            project.light_outcomes.reduce(
              (ac, cv) => (cv.paid ? ac + cv.amount : ac + 0),
              0
            ),
          payOnClick: () => setShowPay(showStates.payLights),
          loadOnClick: () => setShowLoad(showStates.loadLights),
          detailsOnClick: () => setShowDetails(showStates.detailsLights),
        },
        {
          title: "Marmol",
          ...project.marble_general,
          outcomes: project.marble_outcomes,
          remaining:
            project.marble_general.total +
            project.marble_general.adjust -
            project.marble_outcomes.reduce((ac, cv) => ac + cv.amount, 0),
          payOnClick: () => setShowPay(showStates.payMarble),
          loadOnClick: () => setShowLoad(showStates.loadMarble),
          detailsOnClick: () => setShowDetails(showStates.detailsMarble),
        },
  ];
  
  const budgetData = !project 
  ? {} 
  : {
      ...project.budget,
      total: project.budget.carpentry+ project.budget.iron_working+ project.budget.light+ project.budget.marble
  }

  const incomeData = !project
    ? {}
    : {
      ...project.income_total,
      payments: project.income_partials,
      remaining:
        project.income_total.total +
        project.income_total.adjust -
        project.income_partials.reduce((ac, cv) => ac + cv.amount, 0),

      loadOnClick: () => setShowLoad("Ingresos - Cargar Total/Ajustes"),
      payOnClick: () => setShowPay("Ingresos - Cobros parciales"),
      detailsOnClick: () => setShowDetails("Ingresos - Detalles"),
  };

  const closeModal = () => {
    setShowPay("");
    setShowLoad("");
    setShowDetails("");
  };
  if (!localStorage.getItem('user_values')) return <></>

  return (
    <>
      <Grid categories={categories} incomeData={incomeData} budgetData={budgetData} />
      {showLoad === showStates.loadCarp && (
        <CarpentryLoadModal show={showLoad} closeModal={closeModal} />
      )}
      {showLoad === showStates.loadIron && (
        <IronWorkingLoadModal show={showLoad} closeModal={closeModal} />
      )}
      {showLoad === showStates.loadLights && (
        <LightLoadModal show={showLoad} closeModal={closeModal} />
      )}
      {showLoad === showStates.loadMarble && (
        <MarbleLoadModal show={showLoad} closeModal={closeModal} />
      )}
      {showLoad === showStates.loadIncome && (
        <IncomeLoadModal show={showLoad} closeModal={closeModal} />
      )}
      {showPay === showStates.payCarp && (
        <CarpentryPayModal show={showPay} closeModal={closeModal} />
      )}
      {showPay === showStates.payIron && (
        <IronWorkingPayModal show={showPay} closeModal={closeModal} />
      )}
      {showPay === showStates.payLights && (
        <LightPayModal show={showPay} closeModal={closeModal} />
      )}
      {showPay === showStates.payMarble && (
        <MarblePayModal show={showPay} closeModal={closeModal} />
      )}
      {showPay === showStates.payIncome && (
        <IncomePayModal show={showPay} closeModal={closeModal} />
      )}
      <DetailsModal
        show={showDetails}
        closeModal={closeModal}
        headlines={detailsHeadlines}
        detailsInfo={detailsInfo}
      />
    </>
  );
};

export default SingleProject;

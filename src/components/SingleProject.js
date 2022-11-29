import Grid from "../commons/Grid";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProject } from "../state/project";
import PayModal from "../commons/LoadModal";
import LoadModal from "../commons/LoadModal";
import DetailsModal from "../commons/DetailsModal";

const SingleProject = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showLoad, setShowLoad] = useState(false);
  const [showPay, setShowPay] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const { projectId } = useParams();
  const project = useSelector((state) => state.project);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) navigate("/login");
  }, []);

  useEffect(() => {
    dispatch(getProject(projectId)).then(() => {});
  }, [projectId]);

  const categories = !project ? []  : [
    {
      title: "Carpinteria",
      ...project.carpentry_general,
      outcomes: project.carpentry_outcomes,
      remaining: project.carpentry_general.total + project.carpentry_general.adjust - project.carpentry_outcomes.reduce((ac, cv) => ac + cv.amount, 0),
      payOnClick: () => setShowPay("Carpinteria - Pagar parciales"),
      loadOnClick: () => setShowLoad("Carpinteria - Cargar Total/Ajustes"),
      detailsOnClick: () => setShowDetails("Carpinteria - Detalles"),
    },
    {
      title: "Herrajes",
      ...project.iron_working_general,
      outcomes: project.iron_working_outcomes,
      remaining: project.iron_working_general.total + project.iron_working_general.adjust - project.iron_working_outcomes.reduce((ac, cv) => (cv.paid ? ac + cv.amount : ac + 0), 0),
      payOnClick: () => setShowPay("Herrajes - Pagar Facturas"),
      loadOnClick: () => setShowLoad("Herrajes - Cargar Facturas"),
      detailsOnClick: () => setShowDetails("Herrajes - Detalles"),
    },
    {
      title: "Iluminacion",
      ...project.light_general,
      outcomes: project.light_outcomes,
      remaining: project.light_general.total + project.light_general.adjust - project.light_outcomes.reduce((ac, cv) => (cv.paid ? ac + cv.amount : ac + 0), 0),
      payOnClick: () => setShowPay("Iluminacion - Pagar Pedidos"),
      loadOnClick: () => setShowLoad("Iluminacion - Cargar Pedidos"),
      detailsOnClick: () => setShowDetails("Iluminacion - Detalles"),
    },
    {
      title: "Marmol",
      ...project.marble_general,
      outcomes: project.marble_outcomes,
      remaining: project.marble_general.total + project.marble_general.adjust - project.marble_outcomes.reduce((ac, cv) => ac + cv.amount, 0),
      payOnClick: () => setShowPay("Marmol - Pagar parciales"),
      loadOnClick: () => setShowLoad("Marmol - Cargar Total / Ajuste"),
      detailsOnClick: () => setShowDetails("Marmol - Detalles"),
    },
  ];

  const incomeData = !project ? {} : {
    ...project.income_total,
    payments: project.income_partials,
    remaining: project.income_total.total + project.income_total.adjust - project.income_partials.reduce((ac, cv) => ac + cv.amount, 0),
      
    loadOnClick: () => setShowLoad("Ingresos - Cargar Total/Ajustes"),
    payOnClick: () => setShowPay("Ingresos - Cobros parciales"),
    detailsOnClick: () => setShowDetails("Ingresos - Detalles"),
  };

  const closeModal = () => {
    setShowPay(false);
    setShowLoad(false);
    setShowDetails(false);
  };

  return (
    <>
      <Grid categories={categories} incomeData={incomeData} />
      <LoadModal show={showLoad} closeModal={closeModal} />
      <PayModal show={showPay} closeModal={closeModal} />
      <DetailsModal show={showDetails} closeModal={closeModal} />
    </>
  );
};

export default SingleProject;

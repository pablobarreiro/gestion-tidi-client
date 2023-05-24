import Grid from "../commons/Grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects, getAllAdminProjects } from "../state/allProjects";
import AllDetailsModal from "./AllDetailsModal";
import Sidebar from "./Sidebar";

const Home = () => {
  const [showDetails, setShowDetails] = useState("");
  const dispatch = useDispatch();
  const allProjects = useSelector(state => state.allProjects)
  console.log('ALL PROJECTS',allProjects)

  useEffect(()=> {
    if(localStorage.getItem('user_values')) {
      dispatch(JSON.parse(localStorage.getItem('user_values')).is_admin ? getAllAdminProjects() : getAllProjects())
    }
  },[])

  const [detailsInfo, setDetailsInfo] = useState([]);
  const [detailsHeadlines, setDetailsHeadlines] = useState([]);
  const headlines = {
    carpentry: ["Proyecto", "Total", "Faltante", "Envio", "Instalacion"],
    ironWorking: ["Proyecto", "Total", "Faltante"],
    light: ["Proyecto", "Total", "Faltante", "Instalacion"],
    marble: ["Proyecto", "Total", "Faltante", "Instalacion"],
    income: ["Proyecto", "Total", "Por Cobrar"],
  };
  const carpentryFilteredProjects = (JSON.parse(localStorage.getItem('user_values')) && !JSON.parse(localStorage.getItem('user_values')).is_admin) || !allProjects ? [] : allProjects.filter(project => 
    project.carpentry_general.total + project.carpentry_general.adjust - project.carpentry_outcomes.reduce((acum, outcome) => acum + outcome.amount,0) || 
    !project.carpentry_general.shipping_paid ||
    !project.carpentry_general.placement_paid
  )
  const ironWorkingFilteredProjects = (JSON.parse(localStorage.getItem('user_values')) && !JSON.parse(localStorage.getItem('user_values')).is_admin) || !allProjects ? [] :  allProjects.filter(project => 
    project.iron_working_outcomes.find(outcome => !outcome.paid) ||
    (project.iron_working_general.adjust ? !project.iron_working_general.adjust_paid : false)
  )
  const lightFilteredProjects = (JSON.parse(localStorage.getItem('user_values')) && !JSON.parse(localStorage.getItem('user_values')).is_admin) || !allProjects ? [] :  allProjects.filter(project => 
    project.light_outcomes.find(outcome => !outcome.paid) ||
    (project.light_general.adjust ? !project.light_general.adjust_paid : false) ||
    !project.light_general.placement_paid
  )
  const marbleFilteredProjects = (JSON.parse(localStorage.getItem('user_values')) && !JSON.parse(localStorage.getItem('user_values')).is_admin) || !allProjects ? [] :  allProjects.filter(project => 
    project.marble_general.total + project.marble_general.adjust - project.marble_outcomes.reduce((acum, outcome) => acum + outcome.amount,0) ||
    !project.marble_general.placement_paid
  )
  const incomeFilteredProjects = (JSON.parse(localStorage.getItem('user_values')) && !JSON.parse(localStorage.getItem('user_values')).is_admin) || !allProjects ? [] :  allProjects.filter(project => 
    project.income_total.total + project.income_total.adjust - project.income_partials.reduce((acum, outcome) => acum + outcome.amount,0)
  )

  const allCarpentry = (JSON.parse(localStorage.getItem('user_values')) && !JSON.parse(localStorage.getItem('user_values')).is_admin) || !allProjects ? {} : {
    total: carpentryFilteredProjects.reduce((acum, project) =>  acum + project.carpentry_general.total, 0),
    adjust: carpentryFilteredProjects.reduce((acum, project) =>  acum + project.carpentry_general.adjust, 0),
    remaining: carpentryFilteredProjects.reduce((acum, project) =>  acum + project.carpentry_general.total + project.carpentry_general.adjust - project.carpentry_outcomes.reduce((acum2,outcome) => acum2 + outcome.amount, 0), 0),
    shipping_total: carpentryFilteredProjects.reduce((acum, project) =>  project.carpentry_general.shipping_paid ? acum : acum + project.carpentry_general.shipping_total, 0),
    placement_total: carpentryFilteredProjects.reduce((acum, project) => project.carpentry_general.placement_paid ? acum : acum + project.carpentry_general.placement_total, 0),
    shipping_paid: carpentryFilteredProjects.every(project =>  project.carpentry_general.shipping_paid),
    placement_paid: carpentryFilteredProjects.every(project =>  project.carpentry_general.placement_paid),
  }
  const allIronWorking = (JSON.parse(localStorage.getItem('user_values')) && !JSON.parse(localStorage.getItem('user_values')).is_admin) || !allProjects ? {} : {
    total: ironWorkingFilteredProjects.reduce((acum, project) =>  acum + project.iron_working_outcomes.reduce((acum,outcome) => acum + outcome.amount,0), 0),
    adjust: ironWorkingFilteredProjects.reduce((acum, project) =>  acum + (project.iron_working_general.adjust_paid ? project.iron_working_general.adjust : 0), 0),
    remaining: ironWorkingFilteredProjects.reduce((acum, project) =>  acum + project.iron_working_outcomes.reduce((acum2,outcome) => acum2 + outcome.amount,0) + (project.iron_working_general.adjust_paid ? project.iron_working_general.adjust : 0) - (project.iron_working_outcomes.reduce((acum3,outcome) => (acum3 + (outcome.paid ? outcome.amount : 0)), 0)), 0),
  }
  const allLight = (JSON.parse(localStorage.getItem('user_values')) && !JSON.parse(localStorage.getItem('user_values')).is_admin) || !allProjects ? {} : {
    total: lightFilteredProjects.reduce((acum, project) =>  acum + project.light_outcomes.reduce((acum,outcome) => acum + outcome.amount,0), 0),
    adjust: lightFilteredProjects.reduce((acum, project) =>  acum + project.light_general.adjust, 0),
    remaining: lightFilteredProjects.reduce((acum, project) =>  acum + project.light_outcomes.reduce((acum2,outcome) => (acum2 + outcome.amount),0) + (project.light_general.adjust_paid ? project.light_general.adjust : 0) - project.light_outcomes.reduce((acum3,outcome) => (acum3 + (outcome.paid ? outcome.amount : 0)), 0), 0),
    placement_total: lightFilteredProjects.reduce((acum, project) => project.light_general.placement_paid ? acum : acum + project.light_general.placement_total, 0),
    placement_paid: lightFilteredProjects.every(project =>  project.light_general.placement_paid),
  }
  const allMarble = (JSON.parse(localStorage.getItem('user_values')) && !JSON.parse(localStorage.getItem('user_values')).is_admin) || !allProjects ? {} : {
    total: marbleFilteredProjects.reduce((acum, project) =>  acum + project.marble_general.total, 0),
    adjust: marbleFilteredProjects.reduce((acum, project) =>  acum + project.marble_general.adjust, 0),
    remaining: marbleFilteredProjects.reduce((acum, project) =>  acum + project.marble_general.total + project.marble_general.adjust - project.marble_outcomes.reduce((acum2,outcome) => acum2 + outcome.amount, 0), 0),
    placement_total: marbleFilteredProjects.reduce((acum, project) => project.marble_general.placement_paid ? acum : acum + project.marble_general.placement_total, 0),
    placement_paid: marbleFilteredProjects.every(project =>  project.marble_general.placement_paid),
  }
  const allIncome = (JSON.parse(localStorage.getItem('user_values')) && !JSON.parse(localStorage.getItem('user_values')).is_admin) || !allProjects ? {} : {
    total: incomeFilteredProjects.reduce((acum, project) =>  acum + project.income_total.total, 0),
    adjust: incomeFilteredProjects.reduce((acum, project) =>  acum + project.income_total.adjust, 0),
    remaining: incomeFilteredProjects.reduce((acum, project) =>  acum + project.income_total.total + project.income_total.adjust - project.income_partials.reduce((acum2,outcome) => acum2 + outcome.amount, 0), 0),
  }

  useEffect(() => {
    const cat = showDetails.slice(0, 3);
    switch (cat) {
      case "Car":
        setDetailsInfo(carpentryFilteredProjects);
        setDetailsHeadlines({type:'carpentry',info:headlines.carpentry});
        break;
      case "Her":
        setDetailsInfo(ironWorkingFilteredProjects);
        setDetailsHeadlines({type:'ironWorking',info:headlines.ironWorking});
        break;
      case "Ilu":
        setDetailsInfo(lightFilteredProjects);
        setDetailsHeadlines({type:'light',info:headlines.light});
        break;
      case "Mar":
        setDetailsInfo(marbleFilteredProjects);
        setDetailsHeadlines({type:'marble',info:headlines.marble});
        break;
      case "Ing":
        setDetailsInfo(incomeFilteredProjects);
        setDetailsHeadlines({type:'income',info:headlines.income});
        break;
      default:
        setDetailsInfo([]);
        setDetailsHeadlines([]);
        break;
    }
  }, [showDetails]);



  const categories = [
    {
      title: "Carpinteria",
      ...allCarpentry,
      detailsOnClick: () => setShowDetails("Carpinteria - Detalles"),
    },
    {
      title: "Herrajes",
      ...allIronWorking,
      detailsOnClick: () => setShowDetails("Herrajes - Detalles"),
    },
    {
      title: "Iluminacion",
      ...allLight,
      detailsOnClick: () => setShowDetails("Iluminacion - Detalles"),
    },
    {
      title: "Marmol",
      ...allMarble,
      detailsOnClick: () => setShowDetails("Marmol - Detalles"),
    },
    {
      title: "Ingresos",
      ...allIncome,
      detailsOnClick: () => setShowDetails("Ingresos - Detalles"),
    }
  ];

  const closeModal = () => {
    setShowDetails("");
  };

  if (!localStorage.getItem('user_values')) return <></>

  if (!JSON.parse(localStorage.getItem('user_values')).is_admin) return (
    <>
      <div style={{display:'flex'}}>
        <Sidebar />
        
      </div>
    </>
  )

  return (
    <>
      <Grid categories={categories} />
      <AllDetailsModal 
        show={showDetails}
        closeModal={closeModal}
        headlines={detailsHeadlines}
        detailsInfo={detailsInfo} 
      />
    </>
  );
};

export default Home;

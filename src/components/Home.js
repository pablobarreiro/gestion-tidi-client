import Grid from "../commons/Grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects } from "../state/allProjects";
import AllDetailsModal from "./AllDetailsModal";

const Home = () => {
  const [showDetails, setShowDetails] = useState("");
  const dispatch = useDispatch();
  const allProjects = useSelector(state => state.allProjects)

  console.log("ALL PROJECTS",allProjects)
  useEffect(()=> {
    if(localStorage.getItem('user_values')) dispatch(getAllProjects())
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
  const carpentryFilteredProjects = !allProjects ? [] : allProjects.filter(project => 
    project.carpentry_general.total + project.carpentry_general.adjust - project.carpentry_outcomes.reduce((acum, outcome) => acum + outcome.amount,0) || 
    !project.carpentry_general.shipping_paid || !project.carpentry_general.placement_paid
  )
  const ironWorkingFilteredProjects = !allProjects ? [] :  allProjects.filter(project => 
    project.iron_working_outcomes.reduce((acum, outcome) => acum + outcome.amount,0) + project.iron_working_general.adjust - project.iron_working_outcomes.reduce((acum, outcome) => acum + outcome.paid?outcome.amount:0,0)
  )
  const lightFilteredProjects = !allProjects ? [] :  allProjects.filter(project => 
    project.light_general.total + project.light_general.adjust - project.light_outcomes.reduce((acum, outcome) => acum + outcome.amount,0) ||
    !project.light_general.placement_paid
  )
  const marbleFilteredProjects = !allProjects ? [] :  allProjects.filter(project => 
    project.marble_general.total + project.marble_general.adjust - project.marble_outcomes.reduce((acum, outcome) => acum + outcome.amount,0) ||
    !project.marble_general.placement_paid
  )

  const allCarpentry = !allProjects ? {} : {
    total: carpentryFilteredProjects.reduce((acum, project) =>  acum + project.carpentry_general.total, 0),
    adjust: carpentryFilteredProjects.reduce((acum, project) =>  acum + project.carpentry_general.adjust, 0),
    remaining: carpentryFilteredProjects.reduce((acum, project) =>  acum + project.carpentry_general.total + project.carpentry_general.adjust - project.carpentry_outcomes.reduce((acum2,outcome) => acum2 + outcome.amount, 0), 0),
    shipping_total: carpentryFilteredProjects.reduce((acum, project) =>  project.carpentry_general.shipping_paid ? acum : acum + project.carpentry_general.shipping_total, 0),
    placement_total: carpentryFilteredProjects.reduce((acum, project) => project.carpentry_general.placement_paid ? acum : acum + project.carpentry_general.placement_total, 0),
    shipping_paid: carpentryFilteredProjects.every(project =>  project.carpentry_general.shipping_paid),
    placement_paid: carpentryFilteredProjects.every(project =>  project.carpentry_general.placement_paid),
  }
  const allIronWorking = !allProjects ? {} : {
    total: ironWorkingFilteredProjects.reduce((acum, project) =>  acum + project.iron_working_outcomes.reduce((acum,outcome) => acum + outcome.amount,0), 0),
    adjust: ironWorkingFilteredProjects.reduce((acum, project) =>  acum + project.iron_working_general.adjust, 0),
    remaining: ironWorkingFilteredProjects.reduce((acum, project) =>  acum + project.iron_working_outcomes.reduce((acum2,outcome) => acum2 + outcome.amount,0) + project.iron_working_general.adjust - project.iron_working_outcomes.reduce((acum3,outcome) => acum3 + outcome.paid?outcome.amount:0, 0), 0),
  }
  const allLight = !allProjects ? {} : {
    total: lightFilteredProjects.reduce((acum, project) =>  acum + project.light_outcomes.reduce((acum,outcome) => acum + outcome.amount,0), 0),
    adjust: lightFilteredProjects.reduce((acum, project) =>  acum + project.light_general.adjust, 0),
    remaining: lightFilteredProjects.reduce((acum, project) =>  acum + project.light_outcomes.reduce((acum2,outcome) => acum2 + outcome.amount,0) + project.light_general.adjust - project.light_outcomes.reduce((acum3,outcome) => acum3 + outcome.paid?outcome.amount:0, 0), 0),
    placement_total: lightFilteredProjects.reduce((acum, project) => project.light_general.placement_paid ? acum : acum + project.light_general.placement_total, 0),
    placement_paid: lightFilteredProjects.every(project =>  project.light_general.placement_paid),
  }
  const allMarble = !allProjects ? {} : {
    total: marbleFilteredProjects.reduce((acum, project) =>  acum + project.marble_general.total, 0),
    adjust: marbleFilteredProjects.reduce((acum, project) =>  acum + project.marble_general.adjust, 0),
    remaining: marbleFilteredProjects.reduce((acum, project) =>  acum + project.marble_general.total + project.marble_general.adjust - project.marble_outcomes.reduce((acum2,outcome) => acum2 + outcome.amount, 0), 0),
    placement_total: marbleFilteredProjects.reduce((acum, project) => project.marble_general.placement_paid ? acum : acum + project.marble_general.placement_total, 0),
    placement_paid: marbleFilteredProjects.every(project =>  project.marble_general.placement_paid),
  }
  const allIncome = !allProjects ? {} : {
    total: 0,
    adjust: 0,
    remaining: 0,
    placement_total: 0,
    placement_paid: 0,
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
        setDetailsInfo(allIncome);
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
  ];

  const incomeData = {
    total: 40000,
    adjust: 2000,
    payments: [
      {
        projectId: "334",
        amount: 40000 * 0.6,
        pay_date: "4/5/2022",
        payment_method: "Efectivo",
      },
      {
        projectId: "334",
        amount: 40000 * 0.3,
        pay_date: "4/8/2022",
        payment_method: "Transferencia",
      },
    ],
    detailsOnClick: () => setShowDetails("Ingresos - Detalles"),
  };

  const closeModal = () => {
    setShowDetails("");
  };

  if (!localStorage.getItem('user_values')) return <></>
  return (
    <>
      <Grid categories={categories} incomeData={incomeData} />
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

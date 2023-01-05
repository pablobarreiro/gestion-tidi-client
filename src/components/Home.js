import Grid from "../commons/Grid";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects } from "../state/allProjects";
import { clearProject } from "../state/project";

const Home = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const allProjects = useSelector(state => state.allProjects)

  // console.log("ALL PROJECTS",allProjects)
  useEffect(()=> {
    dispatch(getAllProjects())
  },[])

  const allCarpentry = !allProjects ? {} : {
    total: allProjects.reduce((acum, project) =>  acum + project.carpentry_general.total, 0),
    adjust: allProjects.reduce((acum, project) =>  acum + project.carpentry_general.adjust, 0),
    shipping_total: allProjects.reduce((acum, project) =>  project.carpentry_general.shipping_paid ? acum : acum + project.carpentry_general.shipping_total, 0),
    placement_total: allProjects.reduce((acum, project) => project.carpentry_general.placement_paid ? acum : acum + project.carpentry_general.placement_total, 0),
    shipping_paid: allProjects.every(project =>  project.carpentry_general.shipping_paid),
    placement_paid: allProjects.every(project =>  project.carpentry_general.placement_paid),
  }

  const categories = [
    {
      title: "Carpinteria",
      ...allCarpentry,
      remaining: !allProjects ? 0 :
            allCarpentry.total +
            allCarpentry.adjust -
            allProjects.reduce((acum,project) => project.carpentry_outcomes.reduce((acum2,outcome) => acum2+outcome.amount, 0)+acum,0 ),
      // payOnClick: () => setShow("carpentryPay"),
      // loadOnClick: () => setShow("carpentryLoad"),
      detailsOnClick: () => setShow("carpentryDetails"),
    },
    {
      title: "Herrajes",
      // payOnClick: () => setShow("ironWorkingPay"),
      // loadOnClick: () => setShow("ironWorkingLoad"),
      detailsOnClick: () => setShow("ironWorkingDetails"),
    },
    {
      title: "Iluminacion",
      // payOnClick: () => setShow("lightsPay"),
      // loadOnClick: () => setShow("lightsLoad"),
      detailsOnClick: () => setShow("lightsDetails"),
    },
    {
      title: "Marmol",
      // payOnClick: () => setShow("marblePay"),
      // loadOnClick: () => setShow("marbleLoad"),
      detailsOnClick: () => setShow("marbleDetails"),
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
    // loadOnClick: () => setShow("incomeLoad"),
    // payOnClick: () => setShow("incomeCollect"),
    detailsOnClick: () => setShow("incomeDetails"),
  };

  const closeModal = () => {
    setShow(false);
  };

  return (
    <>
      <Grid categories={categories} incomeData={incomeData} />
     
    </>
  );
};

export default Home;

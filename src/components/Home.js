import Grid from "../commons/Grid";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

const Home = () => {
  const [show, setShow] = useState(false);
  const categories = [
    {
      title: "Carpinteria",
      total: 1000,
      adjust: 200,
      shipping_total: 35,
      placement_total: 30,
      shipping_paid: true,
      placement_paid: false,
      payOnClick: () => setShow("carpentryPay"),
      loadOnClick: () => setShow("carpentryLoad"),
      detailsOnClick: () => setShow("carpentryDetails"),
    },
    {
      title: "Herrajes",
      payOnClick: () => setShow("ironWorkingPay"),
      loadOnClick: () => setShow("ironWorkingLoad"),
      detailsOnClick: () => setShow("ironWorkingDetails"),
    },
    {
      title: "Iluminacion",
      payOnClick: () => setShow("lightsPay"),
      loadOnClick: () => setShow("lightsLoad"),
      detailsOnClick: () => setShow("lightsDetails"),
    },
    {
      title: "Marmol",
      payOnClick: () => setShow("marblePay"),
      loadOnClick: () => setShow("marbleLoad"),
      detailsOnClick: () => setShow("marbleDetails"),
    },
  ];

  const incomeData = {
    total: 40000,
    adjust: 2000,
    payments: [
      {
        project_number: "334",
        amount: 40000 * 0.6,
        pay_date: '4/5/2022',
        payment_method: "Efectivo",
      },{
        project_number: "334",
        amount: 40000 * 0.3,
        pay_date: '4/8/2022',
        payment_method: "Transferencia",
      },
    ],
    loadOnClick: () => setShow("incomeLoad"),
    payOnClick: () => setShow("incomeCollect"),
    detailsOnClick: () => setShow("incomeDetails"),
  };

  const closeModal = () => {
    setShow(false);
  };

  return (
    <>
      <Grid categories={categories} incomeData={incomeData} />
      <Modal show={show === "carpentryPay"} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Modal Body</h4>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={closeModal}>Close</button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Home;

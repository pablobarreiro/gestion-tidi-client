import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";

const AllDetailsModal = ({ show, closeModal, headlines, detailsInfo }) => {
  const title =
    headlines.type === "carpentry"
      ? "Carpinteria"
      : headlines.type === "ironWorking"
      ? "Herrajes"
      : headlines.type === "light"
      ? "Iluminacion"
      : headlines.type === "marble"
      ? "Marmol"
      : "Ingresos";
  const totalSelector =
    headlines.type === "carpentry"
      ? "carpentry_general"
      : headlines.type === "ironWorking"
      ? "iron_working_general"
      : headlines.type === "light"
      ? "light_general"
      : headlines.type === "marble"
      ? "marble_general"
      : "income_total";
  const outcomeSelector =
    headlines.type === "carpentry"
      ? "carpentry_outcomes"
      : headlines.type === "ironWorking"
      ? "iron_working_outcomes"
      : headlines.type === "light"
      ? "light_outcomes"
      : headlines.type === "marble"
      ? "marble_outcomes"
      : "income_partials";

  const table = [];

  detailsInfo.forEach((project) => {
    const id = project.id;
    const total =
      headlines.type === "carpentry" || headlines.type === "marble"
        ? project[totalSelector].total + project[totalSelector].adjust
        : headlines.type === "ironWorking" || headlines.type === "light"
        ? project[totalSelector].adjust +
          project[outcomeSelector].reduce(
            (acum, outcome) => acum + outcome.amount,
            0
          )
        : null; //income
    const remaining =
      headlines.type === "carpentry" || headlines.type === "marble"
        ? total -
          project[outcomeSelector].reduce(
            (acum, outcome) => acum + outcome.amount,
            0
          )
        : headlines.type === "ironWorking" || headlines.type === "light"
        ? total -
          project[outcomeSelector].reduce(
            (acum, outcome) => (acum + outcome.paid ? outcome.amount : 0),
            0
          )
        : null; //income
    const shippingPaid =
      !headlines.type === "carpentry"
        ? null
        : project[totalSelector].shipping_paid;
    const placementPaid =
      !headlines.type === "carpentry" ||
      !headlines.type === "light" ||
      !headlines.type === "marble"
        ? null
        : project[totalSelector].placement_paid;

        console.log({
            projectId: id,
            total: total,
            remaining: remaining,
            shippingPaid: shippingPaid,
            placementPaid: placementPaid,
          })
    table.push({
      projectId: id,
      total: total,
      remaining: remaining,
      shippingPaid: shippingPaid,
      placementPaid: placementPaid,
    });
  });

  return (
    <Modal
      show={show}
      onHide={closeModal}
      fullscreen="lg-down"
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{title} - Detalles</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              {headlines.info &&
                headlines.info.map((hl, i) => <th key={i}>{hl}</th>)}
            </tr>
          </thead>
          <tbody>
            {table.length &&
              table.map((project) => (
                <tr key={project.projectId}>
                  <td>TM-{project.projectId}</td>
                  <td>{project.total}</td>
                  <td>{project.remaining}</td>
                  {headlines.type === 'carpentry' && <td>{project.shippingPaid?'Pago':'Impago'}</td>}
                  {headlines.type !== 'ironWorking' && <td>{project.placementPaid?'Pago':'Impago'}</td>}
                </tr>
              ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <button className="main-button" onClick={closeModal}>
          Cerrar
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default AllDetailsModal;

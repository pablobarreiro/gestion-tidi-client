import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import { getAdminProject } from "../state/project";
import { carpentryDeleteOutcome, deletePayment, ironWorkingDeleteOutcome, lightDeleteOutcome, marbleDeleteOutcome } from "../uris";
import { formatNumber } from "../utils/functions";
import { editProjectRoute } from "../uris";

const DetailsModal = ({ show, closeModal, headlines, detailsInfo }) => {
  const dispatch = useDispatch()
  const handleDelete = async ({ show, data }) => {
    const cat = show.slice(0, 3);

    const value = await swal(
      `Estas Seguro que queres eliminar esta entrada?`,
      {
        buttons: {
          cancel: "Cancelar",
          confirm: true,
        },
      }
    );
    if (value) {
      const projectId = data.projectId
      switch (cat) {
        case "Car":
          await axios.delete(carpentryDeleteOutcome(data.id))
          break
        case "Her":
          await axios.delete(ironWorkingDeleteOutcome(data.id))
          break
        case "Ilu":
          await axios.delete(lightDeleteOutcome(data.id))
          break
        case "Mar":
          await axios.delete(marbleDeleteOutcome(data.id))
          break
        case "Ing":
          await axios.delete(deletePayment(data.id))
          break
        }
      await axios.put(editProjectRoute(projectId),{payment_fulfilled:false})
      dispatch(getAdminProject(projectId))
      closeModal()
    }
  };

  if (!detailsInfo) return <></>;

  return (
    <>
      <Modal
        show={show}
        onHide={closeModal}
        fullscreen="lg-down"
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{show}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                {headlines.map((hl, i) => (
                  <th key={i}>{hl}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {detailsInfo &&
                detailsInfo.map((data) => (
                  <tr key={data.id}>
                    <td>{data.pay_date && data.pay_date.split('T')[0].replace(/-/g, "/")}</td>
                    {detailsInfo[0].invoice_number && (
                      <td>{data.invoice_number}</td>
                    )}
                    {detailsInfo[0].invoice_date && (
                      <td>{data.invoice_date.split('T')[0].replace(/-/g, "/")}</td>
                    )}
                    <td>
                      {show === "Marmol - Detalles" ? "USD" : "$"} {formatNumber(data.amount)}
                    </td>
                    {detailsInfo[0].tracking_number && (
                      <td>{data.tracking_number}</td>
                    )}
                    {headlines[headlines.length - 2] === "Estado" && (
                      <td>{data.paid ? "Pago" : "Impago"}</td>
                    )}
                    {data.payment_method && <td>{data.payment_method}</td>}
                    {data.payment_info && <td>{data.payment_info}</td>}
                    <td>
                      <FaTrash onClick={() => handleDelete({ show, data })} />
                    </td>
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
    </>
  );
};

export default DetailsModal;

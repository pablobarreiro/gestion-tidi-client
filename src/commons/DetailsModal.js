import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table'

const DetailsModal = ({show, closeModal, headlines, detailsInfo}) => {

  if(!detailsInfo) return <></>

  return (
    <>
      <Modal show={show} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {show}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
      <thead>
        <tr>
          {headlines.map((hl,i) => 
            <th key={i}>{hl}</th>
          )}
        </tr>
      </thead>
      <tbody>
        {detailsInfo && detailsInfo.map(data => 
        <tr>
          <td>{data.pay_date && data.pay_date.slice(0,10)}</td>
          <td>{show==='Marmol - Detalles'? "USD": "$"} {data.amount}</td>
          {detailsInfo[0].tracking_number && <td>{data.tracking_number}</td>}
          {detailsInfo[0].invoice_number && <td>{data.invoice_number}</td>}
          {detailsInfo[0].invoice_date && <td>{data.invoice_date.slice(0,10)}</td>}
          {headlines[headlines.length-1] === 'Estado' && <td>{data.paid ? "Pagado": 'Impago'}</td>}
        </tr>)}
      </tbody>
    </Table>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={closeModal}>Close</button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DetailsModal;

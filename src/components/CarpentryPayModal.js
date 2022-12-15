import { useState } from 'react';
import Table from 'react-bootstrap/esm/Table';
import Modal from 'react-bootstrap/Modal'
import { useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { carpentryUpdateTotals } from '../uris';
import CarpentryInput from './CarpentryInput';
import axios from 'axios'


const CarpentryPayModal = ({show, closeModal}) => {
  const allProjects = useSelector(state => state.allProjects)
  // console.log('todos',allProjects)

  const payDate = useInput('')

  const filteredProjects = allProjects.filter(project => project.carpentry_general.total+project.carpentry_general.adjust-project.carpentry_outcomes.reduce((acum, outcome) => outcome.amount+acum,0) || !project.carpentry_general.shipping_total || !project.carpentry_general.placement_total)
  
  console.log('filtrados',filteredProjects)
  
  const [projectsToSend,setProjectsToSend] = useState([])
  const [shippingToPay,setShippingToPay] = useState([])
  const [placementToPay,setPlacementToPay] = useState([])
  const projectAmount = projectsToSend.reduce((acum,project) => Number(project.amount) + acum, 0)
  const shippingAmount = shippingToPay.reduce((acum,project) => project.shipping_paid ? Number(project.shipping_total)+acum : acum,0)
  const placementAmount = placementToPay.reduce((acum,project) => project.placement_paid ? Number(project.placement_total)+acum : acum,0)
  const totalPayingAmount = projectAmount + shippingAmount + placementAmount


  const handleSubmit = (e) => {
    e.preventDefault()
    const shippingAndPlacementArray = shippingToPay.concat(placementToPay)
    const date = new Date()
    console.log(date)
    if(payDate.value.length < 8) alert('la fecha esta mal')
    else if(!projectsToSend.length || !shippingAndPlacementArray.length ) alert('no pusiste nada, perro')
    else {
      const objectToSend = {pay_date: new Date(payDate.value),projects: projectsToSend}
      console.log('enviar a db:', objectToSend)
      // axios.post(carpentryNewOutcome(),objectToSend)
      console.log('pagar envio e instalacion',shippingAndPlacementArray)
      // shippingAndPlacementArray.forEach(project => axios.put(carpentryUpdateTotals(project.projectId),project))
    }
  }

  return (
    <>
      <Modal show={show} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {show}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id='carpentry-payment'>
            <p>Fecha Pago : <input className='basic-input' placeholder='AAAA/MM/DD' {...payDate} /></p>
            <Table>
              <thead>
                <tr>
                  <th>Proyecto</th>
                  <th>Faltante</th>
                  <th>Pago</th>
                  <th>Envio</th>
                  <th>Instalacion</th>
                </tr>
              </thead>
            <tbody>
                {filteredProjects.map(project => <CarpentryInput key={project.id} projectsToSend={projectsToSend} setProjectsToSend={setProjectsToSend} shippingToPay={shippingToPay} setShippingToPay={setShippingToPay} placementToPay={placementToPay} setPlacementToPay={setPlacementToPay} {...project} remaining={project.carpentry_general.total+project.carpentry_general.adjust-project.carpentry_outcomes.reduce((acum, outcome) => outcome.amount+acum,0)} />)}
            </tbody>
            </Table>
          </form>
          <p>Total a pagar: $ {totalPayingAmount}</p>
        </Modal.Body>
        <Modal.Footer>
          <button type="submit" form='carpentry-payment' onClick={handleSubmit}>Aceptar</button>
          <button onClick={closeModal}>Close</button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CarpentryPayModal;
import { useState } from 'react';
import Table from 'react-bootstrap/esm/Table';
import Modal from 'react-bootstrap/Modal'
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { carpentryNewOutcome, carpentryUpdateTotals } from '../uris';
import CarpentryInput from './CarpentryInput';
import axios from 'axios'
import {isValidDate} from '../utils/functions'
import { useNavigate, useParams } from 'react-router-dom';
import { getAllProjects } from '../state/allProjects';
import { getProject } from '../state/project';


const CarpentryPayModal = ({show, closeModal}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {projectId} = useParams()
  const allProjects = useSelector(state => state.allProjects)
  const payDate = useInput('')
  const filteredProjects = allProjects.filter(project => project.carpentry_general.total+project.carpentry_general.adjust-project.carpentry_outcomes.reduce((acum, outcome) => outcome.amount+acum,0) || !project.carpentry_general.shipping_total || !project.carpentry_general.placement_total)
  
  const [projectsToSend,setProjectsToSend] = useState([])
  const [shippingToPay,setShippingToPay] = useState([])
  const [placementToPay,setPlacementToPay] = useState([])
  const projectAmount = projectsToSend.reduce((acum,project) => Number(project.amount) + acum, 0)
  const shippingAmount = shippingToPay.reduce((acum,project) => project.shipping_paid ? Number(project.shipping_total)+acum : acum,0)
  const placementAmount = placementToPay.reduce((acum,project) => project.placement_paid ? Number(project.placement_total)+acum : acum,0)
  const totalPayingAmount = projectAmount + shippingAmount + placementAmount

  const handleSubmit = async (e) => {
    e.preventDefault()
    const shippingAndPlacementArray = shippingToPay.concat(placementToPay)
    const date = new Date()
    if(!isValidDate(payDate.value)) return alert('la fecha esta mal')
    navigate('/loading')
    const objectToSend = {pay_date: new Date(payDate.value),projects: projectsToSend}
    await axios.post(carpentryNewOutcome(),objectToSend)
    shippingAndPlacementArray.forEach(async project => await axios.put(carpentryUpdateTotals(project.projectId),project))
    dispatch(getAllProjects())
    dispatch(getProject(projectId))
    navigate(`/project/${projectId}`)
    closeModal()
  }

  return (
    <>
      <Modal show={show} onHide={closeModal} fullscreen='lg-down' size="lg" centered>
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
                {filteredProjects.map(project => 
                  <CarpentryInput key={project.id} 
                  projectsToSend={projectsToSend} 
                  setProjectsToSend={setProjectsToSend} 
                  shippingToPay={shippingToPay} 
                  setShippingToPay={setShippingToPay} 
                  placementToPay={placementToPay} 
                  setPlacementToPay={setPlacementToPay} 
                  {...project} 
                  remaining={
                    project.carpentry_general.total +
                    project.carpentry_general.adjust -
                    project.carpentry_outcomes.reduce((acum, outcome) => outcome.amount+acum,0)
                  } 
                  />
                )}
            </tbody>
            </Table>
          </form>
          <p>Total a pagar: $ {totalPayingAmount}</p>
        </Modal.Body>
        <Modal.Footer>
          <button className='main-button' type="submit" form='carpentry-payment' onClick={handleSubmit}>Aceptar</button>
          <button className='main-button' onClick={closeModal}>Cancelar</button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CarpentryPayModal;

import { useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import axios from 'axios'
import {isValidDate} from '../utils/functions'
import { useNavigate, useParams } from 'react-router-dom';
import { getAllProjects } from '../state/allProjects';
import { getProject } from '../state/project';
import { marbleNewOutcome, marbleUpdateTotals } from '../uris';


const MarblePayModal = ({show, closeModal}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {projectId} = useParams()
  const project = useSelector(state => state.project)
  const { marble_general,marble_outcomes } = project
  const payTotal = useInput('')
  const payDate = useInput('')
  const [placementPaid,setPlacementPaid] = useState(marble_general.placement_paid || false)



  const handleSubmit = async (e) => {
    e.preventDefault()
    if(payTotal.value) {
      if(!isValidDate(payDate.value)) return alert('la fecha esta mal')
      navigate('/loading')
      const objectToSend = {pay_date: new Date(payDate.value),amount: payTotal.value, projectId:Number(projectId),id:null}
      await axios.post(marbleNewOutcome(), objectToSend)

    }
    if(marble_general.placement_paid !== placementPaid) {
      navigate('/loading')
      await axios.put(marbleUpdateTotals(projectId),{placement_paid:placementPaid})
    } 
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
          <h5>TM-{projectId}</h5>
          <form id='marble-payment' onSubmit={handleSubmit}>
            <p>Total: USD {marble_general.total}</p>
            <p>Faltante: USD {marble_general.total + marble_general.adjust - marble_outcomes.reduce((acum,outcome)=> acum + outcome.amount,0)}</p>
            <p>Total a pagar: USD <input className='basic-input' {...payTotal}/></p>
            <p>Fecha de Pago : <input className='basic-input' placeholder='AAAA/MM/DD' {...payDate} /></p>
            <p>Pagar Colocacion: <input checked={placementPaid} onClick={()=> setPlacementPaid(!placementPaid)} type='checkbox' /> {!marble_general.placement_paid && `$ ${marble_general.placement_total}`}</p>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className='main-button' type="submit" form='marble-payment'>Aceptar</button>
          <button className='main-button' onClick={closeModal}>Cancelar</button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MarblePayModal;

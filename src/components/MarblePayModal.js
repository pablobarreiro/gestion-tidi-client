import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import axios from 'axios'
import {formatNumber, isValidDate} from '../utils/functions'
import { useNavigate, useParams } from 'react-router-dom';
import { getAllAdminProjects } from '../state/allProjects';
import { getAdminProject } from '../state/project';
import { marbleNewOutcome, marbleUpdateTotals } from '../uris';
import swal from 'sweetalert';


const MarblePayModal = ({show, closeModal}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {projectId} = useParams()
  const project = useSelector(state => state.project)
  const { marble_general,marble_outcomes } = project
  const payTotal = useInput('')
  const payDate = useInput('')
  const [placementPaid,setPlacementPaid] = useState(marble_general.placement_paid || false)

  const remaining = marble_general.total + marble_general.adjust - marble_outcomes.reduce((acum,outcome)=> acum + outcome.amount,0)

  useEffect(()=> {
    if(payTotal.value > remaining) payTotal.setvalue(remaining)
    if(payTotal.value<0) payTotal.setvalue(0)
  },[payTotal.value])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(payTotal.value) {
      if(!isValidDate(payDate.value)) return swal('Colocar una fecha valida')
      navigate('/loading')
      const objectToSend = {pay_date: new Date(payDate.value),amount: payTotal.value, projectId:Number(projectId),id:null}
      await axios.post(marbleNewOutcome(), objectToSend)
    }
    if(marble_general.placement_paid !== placementPaid) {
      navigate('/loading')
      await axios.put(marbleUpdateTotals(projectId),{placement_paid:placementPaid})
    } 
    dispatch(getAllAdminProjects())
    dispatch(getAdminProject(projectId))
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
            <p>Total: USD {formatNumber(marble_general.total)}</p>
            <p>Restante: USD {formatNumber(remaining)}</p>
            <p>Fecha de Pago : <input className='basic-input' type='date' {...payDate} /></p>
            <p>Total a pagar: USD <input className='basic-input' {...payTotal}/></p>
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

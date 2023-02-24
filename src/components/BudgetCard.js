import axios from "axios";
import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import { getAdminProject, getProject } from "../state/project";
import { budgetUpdateTotals } from "../uris";
import { formatNumber } from "../utils/functions";

const BudgetCard = ({
  projectId,
  total,
  date,
  carpentryFirst,
  carpentrySecond,
  carpentryThird,
  iron_working,
  marble,
  dolar
}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [show,setShow] = useState(false)
  const user = useSelector(state=> state.user)

  const dateInput = useInput(date ? date.split('T')[0] : '')
  const carpentryFirstInput = useInput(Number(carpentryFirst))
  const carpentrySecondInput = useInput(Number(carpentrySecond))
  const carpentryThirdInput = useInput(Number(carpentryThird))
  const ironWorkingInput = useInput(Number(iron_working))
  const marbleInput = useInput(Number(marble))
  const dolarInput = useInput(Number(dolar))

  useEffect(()=> {
    dateInput.setvalue(date ? date.split('T')[0] : '')
    carpentryFirstInput.setvalue(carpentryFirst)
    carpentrySecondInput.setvalue(carpentrySecond)
    carpentryThirdInput.setvalue(carpentryThird)
    ironWorkingInput.setvalue(iron_working)
    marbleInput.setvalue(marble)
    dolarInput.setvalue(dolar)
  },[show])
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    navigate('/loading')
    await axios.put(budgetUpdateTotals(projectId),{
      date:new Date(dateInput.value),
      carpentryFirst:Number(carpentryFirstInput.value),
      carpentrySecond:Number(carpentrySecondInput.value),
      carpentryThird:Number(carpentryThirdInput.value),
      iron_working:Number(ironWorkingInput.value),
      marble:Number(marbleInput.value),
      dolar:Number(dolarInput.value),
    })
    dispatch(user.is_admin ? getAdminProject(projectId) : getProject(projectId))
    navigate(`/project/${projectId}`)
    setShow(false)
  }
  
  return (
    <>
      <div className="card-container">
        <div className='card-content'>
          <div style={{display:'flex',justifyContent:'space-between', alignItems:'center'}}>
            <h3>Presupuesto</h3> {date && <>{date.split('T')[0].replace(/-/g, "/")}</>}
          </div>
          <p>Carpinteria - 60%: $ { formatNumber(carpentryFirst) }</p>
          <p>Carpinteria - 30%: USD { formatNumber(carpentrySecond) }</p>
          <p>Carpinteria - 10%: USD { formatNumber(carpentryThird) }</p>
          <p>Herrajes y opcionales: $ {formatNumber(iron_working)}</p>
          <p>Marmol: USD {formatNumber(marble)}</p>
          <p>Dolar Oficial: $ {formatNumber(dolar)}</p>
          <h5>Total: $ {formatNumber(total)}</h5>
        </div>
        <div className="card-buttons">
          <button className="main-button" onClick={()=>setShow(true)}>cargar</button>
        </div>
      </div>
      <Modal show={show} size='lg' onHide={() => setShow(false)} centered>
        <Modal.Header>
          <Modal.Title>Presupuesto - Cargar Totales</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id='budget-form' onSubmit={handleSubmit}>
            <ul>
              <li>Fecha: <input className="basic-input" type='date' placeholder="dd-mm-yyyy" {...dateInput} /></li>
              <li>Carpinteria - 60%: $ <input className="basic-input" type='number' {...carpentryFirstInput} /></li>
              <li>Carpinteria - 30%: USD <input className="basic-input" type='number' {...carpentrySecondInput} /></li>
              <li>Carpinteria - 10%: USD <input className="basic-input" type='number' {...carpentryThirdInput} /></li>
              <li>Herrajes y Opcionales: $ <input className="basic-input" type='number' {...ironWorkingInput} /></li>
              <li>Marmol: USD <input className="basic-input" type='number' {...marbleInput} /></li>
              <li>Dolar oficial: $ <input className="basic-input" type='number' {...dolarInput} /></li>
            </ul>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="main-button" type='submit' form='budget-form'>Aceptar</button>
          <button className="main-button" onClick={()=>setShow(false)}>Cancelar</button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BudgetCard;

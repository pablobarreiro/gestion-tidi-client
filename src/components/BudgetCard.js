import axios from "axios";
import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal'
import { useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import { budgetUpdateTotals, getProjectRoute } from "../uris";

const BudgetCard = ({
  projectId,
  total,
  carpentry,
  iron_working,
  light,
  marble
}) => {
  const navigate = useNavigate()
  const [show,setShow] = useState(false)

  const carpentryInput = useInput(Number(carpentry))
  const ironWorkingInput = useInput(Number(iron_working))
  const lightInput = useInput(Number(light))
  const marbleInput = useInput(Number(marble))

  useEffect(()=> {
    carpentryInput.setvalue(carpentry)
    ironWorkingInput.setvalue(iron_working)
    lightInput.setvalue(light)
    marbleInput.setvalue(marble)
  },[show])

  
  const handleSubmit = async (e) => {
    e.preventDefault()
    navigate('/loading')
    await axios.put(budgetUpdateTotals(projectId),{
      carpentry:Number(carpentryInput.value),
      iron_working:Number(ironWorkingInput.value),
      light:Number(lightInput.value),
      marble:Number(marbleInput.value),
    })
    await axios.get(getProjectRoute(projectId))
    navigate(`/project/${projectId}`)
    setShow(false)
  }
  
  return (
    <>
      <div className="card-container">
        <h2>Presupuesto</h2>
        <div className="income-columns">
          <div className="income-rows">
            <p>Carpinteria: ${carpentry}</p>
            <p>Herrajes: ${iron_working}</p>
            <p>Iluminacion: ${light}</p>
            <p>Marmol: ${marble}</p>
            <h5>Total: ${total}</h5>
          </div>
        </div>
        <div className="card-buttons">
          <button className="main-button" onClick={()=>setShow(true)}>cargar</button>
        </div>
      </div>
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header>
          <Modal.Title>Presupuesto - Cargar Totales</Modal.Title>  
        </Modal.Header>  
        <Modal.Body>
          <form id='budget-form' onSubmit={handleSubmit}>
            <ul>
              <li>Carpinteria: <input type='number' {...carpentryInput} /></li>
              <li>Herrajes: <input type='number' {...ironWorkingInput} /></li>
              <li>Iluminacion: <input type='number' {...lightInput} /></li>
              <li>Marmol: <input type='number' {...marbleInput} /></li>
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

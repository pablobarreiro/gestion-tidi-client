import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import { getAllProjects } from "../state/allProjects";
import { getProject } from "../state/project";
import { editProjectRoute, createProjectRoute } from "../uris";
import { isValidDate } from '../utils/functions'

// Estos array tienen que venir desde la db en modelos separados
const salesmenList = ["Juancito", "Pepito", "Carlitos", "Fernandito"];
const branchOfficeList = ["Martinez", "Canning", "Puerto Madero"];
const stateList = ["iniciado", "medido", "presupuestado", "etc"];


const ProjectInfoModal = ({ show, setShow, projectInfo, action }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation().pathname
  const id = useInput(projectInfo.id ?? "");
  const initial_date = useInput(
    projectInfo.initial_date ??
      new Date().toISOString().slice(0, 10).replace(/-/g, "/")
  );
  const name = useInput(projectInfo.name ?? "");
  const phone = useInput(projectInfo.phone ?? "");
  const direction = useInput(projectInfo.direction ?? "");
  const email = useInput(projectInfo.email ?? "");
  const salesman = useInput(projectInfo.salesman ?? "");
  const sale_assistant = useInput(projectInfo.sale_assistant ?? "");
  const branch_office = useInput(projectInfo.branch_office ?? "");
  const internal_state = useInput(projectInfo.initial_state ?? "");

  const projectToSend = {
    id: id.value,
    initial_date: new Date(initial_date.value),
    name: name.value,
    phone: phone.value,
    direction: direction.value,
    email: email.value,
    salesman: salesman.value,
    sale_assistant: sale_assistant.value,
    branch_office: branch_office.value,
    internal_state: internal_state.value
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    if (!id.value) return alert("Debe colocar por lo menos un numero de proyecto");
    if (!isValidDate(initial_date.value)) return alert('La fecha no es valida')
    const actualLocation = location
    navigate('/loading')
    // enviar a la db projectToSend
    if(action==='edit') {
      axios.put(editProjectRoute(),projectToSend)
    } if(action ==='create') {
      axios.post(createProjectRoute(),projectToSend)
    }
    dispatch(getAllProjects(projectToSend.id))
    dispatch(getProject())
    navigate(actualLocation)
    setShow(false)
    
  };

  return (
    <Modal show={show} onHide={() => setShow(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>{action==='edit'? `Editar Proyecto` : `Nuevo Proyecto`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <ul>
            <p>
              Nro de Proyecto: {action==='edit'? `${projectInfo.id}` : <input {...id} />}
            </p>
            <p>
              Inicio del proyecto: <input {...initial_date} />
            </p>
            <p>
              Cliente: <input {...name} />
            </p>
            <p>
              Telefono: <input {...phone} />
            </p>
            <p>
              Direccion: <input {...direction} />
            </p>
            <p>
              Email: <input {...email} />
            </p>
            <p>
              Vendedor:{" "}
              <select {...salesman}>
                <option disabled>{""}</option>
                {salesmenList.map((salesman, i) => (
                  <option key={`${i} ${salesman}`}>{salesman}</option>
                ))}
              </select>
            </p>
            <p>
              Asistencia:{" "}
              <select {...sale_assistant}>
                <option>{""}</option>
                {salesmenList.map((salesman, i) => (
                  <option key={`${i} ${salesman}`}>{salesman}</option>
                ))}
              </select>
            </p>
            <p>
              Oficina:{" "}
              <select {...branch_office}>
                <option disabled>{""}</option>
                {branchOfficeList.map((salesman, i) => (
                  <option key={`${i} ${salesman}`}>{salesman}</option>
                ))}
              </select>
            </p>
            <p>
              Estado:{" "}
              <select {...internal_state}>
                <option disabled>{""}</option>
                {stateList.map((salesman, i) => (
                  <option key={`${i} ${salesman}`}>{salesman}</option>
                ))}
              </select>
            </p>
          </ul>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button className="main-button" onClick={() => setShow(false)}>
          Cancelar
        </button>
        <button className="main-button" onClick={handleConfirm}>
          Confirmar
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProjectInfoModal;

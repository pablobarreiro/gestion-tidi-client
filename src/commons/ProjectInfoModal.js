import axios from "axios";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import { getAllProjects } from "../state/allProjects";
import { getProject } from "../state/project";
import { editProjectRoute, createProjectRoute, salesmanList, branchList, stateList } from "../uris";
import { isValidDate } from '../utils/functions'

const ProjectInfoModal = ({ show, setShow, projectInfo, action }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation().pathname
  const id = useInput(projectInfo.id ?? "");
  const initial_date = useInput(
    projectInfo.initial_date ? projectInfo.initial_date.slice(0, 10).replace(/-/g, "/") :
      new Date().toISOString().slice(0, 10).replace(/-/g, "/")
  );
  const name = useInput(projectInfo.name ?? "");
  const phone = useInput(projectInfo.phone ?? "");
  const direction = useInput(projectInfo.direction ?? "");
  const email = useInput(projectInfo.email ?? "");
  const salesman = useInput(projectInfo.salesman ?? "");
  const sale_assistant = useInput(projectInfo.sale_assistant ?? "");
  const branch_office = useInput(projectInfo.branch_office ?? "");
  const internal_state = useInput(projectInfo.internal_state ?? "");

  const [salesmenList, setSalesmenList] = useState([])
  const [branchOfficeList, setBranchOfficeList] = useState([])
  const [statesList, setStatesList] = useState([])

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

  const handleConfirm = async (e) => {
    e.preventDefault();
    if (!id.value || isNaN(Number(id.value))) return alert("Debe colocar un numero de proyecto valido");
    if (!isValidDate(initial_date.value)) return alert('Debe colocar una fecha valida (revisa el formato pedido)')
    if (!name.value) return alert("Coloque nombre de cliente");
    if (!/^\S+@\S+\.\S+$/.test(email.value)) return alert("Coloque un mail valido");
    const actualLocation = location
    navigate('/loading')
    console.log('enviar a la db',projectToSend)
    if(action==='edit') {
      await axios.put(editProjectRoute(projectToSend.id),projectToSend)
    }else if(action ==='create') {
      await axios.post(createProjectRoute(),projectToSend)
    }
    dispatch(getAllProjects(projectToSend.id))
    dispatch(getProject(projectToSend.id))
    navigate(actualLocation)
    setShow(false)
    
  };

  useState(()=> {
    const fetchData = async () => {
      const firstSalesmenList = await axios.get(salesmanList())
      setSalesmenList(firstSalesmenList.data)
      const firstBranchList = await axios.get(branchList())
      setBranchOfficeList(firstBranchList.data)
      const firstStateList = await axios.get(stateList())
      setStatesList(firstStateList.data)
    }
    fetchData()
  },[show])

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
              Inicio del proyecto: <input {...initial_date} placeholder='AAAA/MM/DD' />
            </p>
            <p>
              Cliente: <input {...name} />
            </p>
            <p>
              Email: <input {...email} />
            </p>
            <p>
              Telefono: <input {...phone} />
            </p>
            <p>
              Direccion: <input {...direction} />
            </p>
            <p>
              Vendedor:{" "}
              <select {...salesman}>
                <option disabled>{""}</option>
                {salesmenList.map((salesman, i) => (
                  <option key={`${i} ${salesman.name}`}>{salesman.name}</option>
                ))}
              </select>
            </p>
            <p>
              Asistencia:{" "}
              <select {...sale_assistant}>
                <option>{""}</option>
                {salesmenList.map((salesman, i) => (
                  <option key={`${i} ${salesman.name}`}>{salesman.name}</option>
                ))}
              </select>
            </p>
            <p>
              Oficina:{" "}
              <select {...branch_office}>
                <option disabled>{""}</option>
                {branchOfficeList.map((office, i) => (
                  <option key={`${i} ${office.name}`}>{office.name}</option>
                ))}
              </select>
            </p>
            <p>
              Estado:{" "}
              <select {...internal_state}>
                <option disabled>{""}</option>
                {statesList.map((state, i) => (
                  <option key={`${i} ${state.name}`}>{state.name}</option>
                ))}
              </select>
            </p>
          </ul>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button className="main-button" onClick={handleConfirm}>
          Confirmar
        </button>
        <button className="main-button" onClick={() => setShow(false)}>
          Cancelar
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProjectInfoModal;

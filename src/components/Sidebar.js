import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaMinus, FaPencilAlt, FaPlus } from 'react-icons/fa'
import ProjectInfoModal from '../commons/ProjectInfoModal';
import { useEffect, useState } from 'react';
import { clearProject } from '../state/project';

const Sidebar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const URL = useLocation().pathname
  const selectedProject = useSelector(state => state.project)
  const user = JSON.parse(localStorage.getItem('user_values'))

  const [showEnded,setShowEnded] = useState(false)

  useEffect(()=> {
    if(URL ==='/general') dispatch(clearProject(null))
  },[URL])

  
  const allProjects = useSelector(state => state.allProjects)
  
  const incompletedProjects = allProjects && allProjects.filter(project=> !project.payment_fulfilled)
  const completedProjects = (allProjects && showEnded) ? allProjects.filter(project=> project.payment_fulfilled) : []
  
  const [show,setShow] = useState(false)

  if(URL === '/general') return (
    <div className="sidebar-container">
      <div className='sidebar-body'>
        <h5>Proyectos en ejecucion</h5>
        {allProjects && incompletedProjects.map((project, i) => {
          return <p key={i}>TM-{project.id} - {project.name} <button className='main-button' onClick={()=>{navigate(`/project/${project.id}`)}}>Ver</button></p>
        })}
        <h5>Proyectos finalizados {showEnded ? <FaMinus className='icon-button' onClick={()=>setShowEnded(false)} /> : <FaPlus className='icon-button' onClick={()=>setShowEnded(true)} />}</h5>
        {allProjects && completedProjects.map((project, i) => {
          return <p key={i}>TM-{project.id} - {project.name} <button className='main-button' onClick={()=>{navigate(`/project/${project.id}`)}}>Ver</button></p>
        })}
      </div>
    </div>
  )
  if(selectedProject) return (
    <div className="sidebar-container">
      <div className='sidebar-body'>
        {URL!=='/general' && <ProjectInfoModal show={show} setShow={setShow} projectInfo={selectedProject} action='edit' />}
        <h3>TM-{selectedProject.id} { user.is_admin && <FaPencilAlt style={{cursor:'pointer'}} onClick={()=>setShow(true)}/>} </h3>
        <p>Cliente: {selectedProject.name}</p>
        {selectedProject.initial_date && <p>Inicio Proyecto: {selectedProject.initial_date.slice(0,10).replace(/-/g, "/")}</p>}
        <p>E-mail: {selectedProject.email}</p>
        <p>Telefono: {selectedProject.phone}</p>
        <p>Direccion: {selectedProject.direction}</p>
        <p>Vendedor: {selectedProject.salesman}</p>
        <p>Asistencia: {selectedProject.sale_assistant}</p>
        <p>Sucursal: {selectedProject.branch_office}</p>
        <p>Estado: {selectedProject.internal_state}</p>
      </div>
    </div>
  );
};

export default Sidebar;

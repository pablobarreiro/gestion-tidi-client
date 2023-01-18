import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaPencilAlt } from 'react-icons/fa'
import ProjectInfoModal from '../commons/ProjectInfoModal';
import { useEffect, useState } from 'react';
import { clearProject } from '../state/project';

const Sidebar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const URL = useLocation().pathname
  const selectedProject = useSelector(state => state.project)

  useEffect(()=> {
    if(URL ==='/general') dispatch(clearProject(null))
  })

  const allProjects = useSelector(state => state.allProjects)

  const [show,setShow] = useState(false)

  if(URL === '/general') return (
    <div className="sidebar-container">
      <h3>Lista de proyectos</h3>
      {allProjects && allProjects.map((project, i) => {
        return <p key={i}>TM-{project.id} - {project.name} <button className='main-button' onClick={()=>{navigate(`/project/${project.id}`)}}>Ver</button></p>
      })}
    </div>
  )
  if(selectedProject) return (
    <div className="sidebar-container">
      {URL!=='/general' && <ProjectInfoModal show={show} setShow={setShow} projectInfo={selectedProject} action='edit' />}
      <h3>TM-{selectedProject.id} <FaPencilAlt style={{cursor:'pointer'}} onClick={()=>setShow(true)}/> </h3>
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
  );
};

export default Sidebar;

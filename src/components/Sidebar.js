import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const projectList = [
  { id: 368, name:'Susanita' },
  { id: 841, name:'Pepito' },
  { id: 245, name:'Juancito' }
]

const Sidebar = () => {
  const navigate = useNavigate()
  const URL = useLocation().pathname
  const selectedProject = useSelector(state => state.project)

  const allProjects = useSelector(state => state.allProjects)

  if(URL === '/general') return (
    <div>
      <h3>Lista de proyectos</h3>
      {allProjects && allProjects.map((project, i) => {
        return <p key={i}>TM-{project.id} - {project.name} <button className='main-button' onClick={()=>{navigate(`/project/${project.id}`)}}>Ver</button></p>
      })}
    </div>
  )
  if(selectedProject) return (
    <div className="sidebar-container">
      <h3>TM-{selectedProject.id}</h3>
      <p>Cliente: {selectedProject.name}</p>
      <p>Telefono: {selectedProject.phone}</p>
      <p>Direccion: {selectedProject.direction}</p>
      <p>email: {selectedProject.email}</p>
      <p>Vendedor: {selectedProject.salesman}</p>
      <p>Asistencia: {selectedProject.sale_assistant}</p>
      <p>Sucursal: {selectedProject.branch_office}</p>
      <p>Estado: {selectedProject.internal_state}</p>
    </div>
  );
};

export default Sidebar;

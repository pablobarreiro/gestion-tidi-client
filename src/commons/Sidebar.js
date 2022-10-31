
const projectData = {
  project_number: 334,
  initial_date: new Date(1/4/2022),
  name: 'Carlitos',
  phone: '44878824',
  direction: 'Calle falsa 123',
  email: 'carlitos@gmail.com',
  salesman: 'Juan',
  sale_assistant: "Pedro",
  branch_office: 'Martinez',
  payment_fulfilled: false,
  internal_state: 'Medicion'
}


const Sidebar = () => {
  return (
    <div className='sidebar-container'>
      <h3>TM-{projectData.project_number}</h3>
      <p>Cliente: {projectData.name}</p>
      <p>Telefono: {projectData.phone}</p>
      <p>Direccion: {projectData.direction}</p>
      <p>email: {projectData.email}</p>
      <p>Vendedor: {projectData.salesman}</p>
      <p>Asistencia: {projectData.sale_assistant}</p>
      <p>Sucursal: {projectData.branch_office}</p>
      <p>Estado: {projectData.internal_state}</p>
    </div>
  );
};

export default Sidebar;

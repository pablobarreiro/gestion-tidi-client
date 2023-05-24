import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { userLogout } from "../state/user";
import ProjectInfoModal from "../commons/ProjectInfoModal";
import { getUser } from "../state/user";
import { clearProject } from "../state/project";
import { clearAllProjects } from "../state/allProjects";
import Navbar from "react-bootstrap/Navbar"
import Nav from 'react-bootstrap/Nav';
import { BsList } from "react-icons/bs"
import { FaPencilAlt } from "react-icons/fa";

const NavigationBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const URL = useLocation().pathname
  const user = useSelector((state) => state.user);

  const [showNewProject, setShowNewProject] = useState(false);

  const handleLogout = () => {
    dispatch(userLogout());
    dispatch(clearProject(null))
    dispatch(clearAllProjects(null))
    localStorage.removeItem("user_values");
    navigate("/login");
  };

  useEffect(() => {
    dispatch(getUser()).then(() => {
      if (localStorage.getItem('user_values')) {
        navigate("/general");
      } else navigate("/login");
    });
  }, []);

  if (!user) return <></>;

  return (
    <Navbar expand="lg" className="navbar-container">
      {URL==='/general' && <ProjectInfoModal
        show={showNewProject}
        setShow={setShowNewProject}
        projectInfo={{}}
        action='create'
      />}
      <h5
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
          padding: "0px 5px",
        }}
      >
        <div style={{display:'flex', alignItems:'center'}}>
          <h4 style={{cursor:'pointer',margin:'0px'}} onClick={()=>navigate("/general")}>TIDI</h4>{" "}
          {URL!=='/general' && <button className="main-button" style={{marginLeft:'15px'}} onClick={() => navigate("/general")}>
            Volver
          </button>}{" "}
          {(URL==='/general' && user.is_admin) && <button
            className="main-button"
            style={{marginLeft:'15px'}}
            onClick={() => setShowNewProject(true)}
          >
            Nuevo Proyecto
          </button>}{" "}
        </div>
        <div style={{display:'flex',flexDirection:'column'}}>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <BsList size={24} />
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav" style={{textTransform:'capitalize'}}>
          <Nav>
            <Nav.Link onClick={()=>navigate('/profile')}>{user.username} <FaPencilAlt /></Nav.Link>
            {user.is_admin && <Nav.Link onClick={()=>navigate('/reports')}>Reportes</Nav.Link>}
            {user.is_admin && <Nav.Link onClick={()=>navigate('/editGenerals')}>Generales</Nav.Link>}
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </div>
      </h5>
    </Navbar>
  );
};

export default NavigationBar;

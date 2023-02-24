import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { userLogout } from "../state/user";
import ProjectInfoModal from "../commons/ProjectInfoModal";
import { getUser } from "../state/user";
import { clearProject } from "../state/project";
import { clearAllProjects } from "../state/allProjects";

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
    <div className="navbar-container">
      {URL==='/general' && <ProjectInfoModal
        show={showNewProject}
        setShow={setShowNewProject}
        projectInfo={{}}
        action='create'
      />}
      <h4
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "5px 5px 0px 5px",
        }}
      >
        <div style={{display:'flex', alignItems:'center'}}>
          <div style={{cursor:'pointer'}} onClick={()=>navigate("/general")}>TIDI</div>{" "}
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
        <div style={{textTransform:'capitalize'}}>
          {user.username } {" "}
          {user.is_admin && <button className="main-button" onClick={()=>navigate('/reports')}>Reportes</button>}{" "}
          {user.is_admin && <button className="main-button" onClick={()=>navigate('/editGenerals')}>Generales</button>}{" "}
          <button className="main-button" onClick={()=>navigate('/profile')}>Mi Perfil</button>{" "}
          <button onClick={handleLogout} className="main-button">
            Logout
          </button>{" "}
        </div>
      </h4>
    </div>
  );
};

export default NavigationBar;

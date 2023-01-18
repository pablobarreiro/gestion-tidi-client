import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { userLogout } from "../state/user";
import ProjectInfoModal from "../commons/ProjectInfoModal";
import { getUser } from "../state/user";

const NavigationBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const URL = useLocation().pathname
  const user = useSelector((state) => state.user);
  console.log("USER", user);

  const [showNewProject, setShowNewProject] = useState(false);

  const handleLogout = () => {
    dispatch(userLogout());
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
    <>
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
        <div>
          <q style={{cursor:'pointer'}} onClick={()=>navigate("/general")}>TIDI</q>{" "}
          {URL!=='/general' && <button className="main-button" onClick={() => navigate("/general")}>
            Volver
          </button>}{" "}
          {URL==='/general' && <button
            className="main-button"
            onClick={() => setShowNewProject(true)}
          >
            Nuevo Proyecto
          </button>}{" "}
        </div>
        <div>
          {user.username } {" "}
          <button className="main-button">Reportes</button>{" "}
          <button className="main-button" onClick={()=>navigate('/editGenerals')}>Generales</button>{" "}
          <button className="main-button">Mi Perfil</button>{" "}
          <button onClick={handleLogout} className="main-button">
            Logout
          </button>{" "}
        </div>
      </h4>
    </>
  );
};

export default NavigationBar;

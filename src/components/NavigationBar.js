import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { userLogout } from "../state/user";
import ProjectInfoModal from "./ProjectInfoModal";
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
    dispatch(getUser()).then((user) => {
      if (user.payload) {
        navigate("/general");
      } else navigate("/login");
    });
  }, []);

  useEffect(() => {
    if (!user) navigate("/login");
    else navigate("/general");
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
          Navbar{" "}
          {URL!=='/general' && <button className="main-button" onClick={() => navigate("/general")}>
            Volver a General
          </button>}{" "}
          {URL==='/general' && <button
            className="main-button"
            onClick={() => setShowNewProject(true)}
          >
            Nuevo Proyecto
          </button>}{" "}
        </div>
        <div>
          <button className="main-button">Reportes</button>{" "}
          <button className="main-button">Mi Perfil</button>
          <button onClick={handleLogout} className="main-button">
            Logout
          </button>{" "}
        </div>
      </h4>
    </>
  );
};

export default NavigationBar;

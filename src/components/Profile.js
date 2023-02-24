import { useDispatch, useSelector } from "react-redux";
import useInput from "../hooks/useInput";
import swal from "sweetalert";
import axios from "axios";
import { changePassword, changeUsername } from "../uris";
import { useState } from "react";
import { FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getUser } from "../state/user";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const oldPassword = useInput("");
  const newPassword = useInput("");
  const confirmNewPassword = useInput("");
  const [editUsername, setEditUsername] = useState(false);

  const usernameInput = useInput(user.username);
  const passwordInput = useInput("");

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const data = await axios.put(changePassword(), {
      user: user,
      oldPassword: oldPassword.value,
      newPassword: newPassword.value,
      confirmNewPassword: confirmNewPassword.value,
    });
    const response = data.data;
    await swal({
      title: response.correct ? "ok" : "error",
      text: response.message,
      icon: response.correct ? "success" : "error",
    });
    if (response.correct) navigate("/general");
  };

  const handleChangeUsername = async (e) => {
    e.preventDefault();
    const data = await axios.put(changeUsername(), {
      user: user,
      newUsername: usernameInput.value,
      password: passwordInput.value,
    });
    const response = data.data;
    await swal({
      title: response.correct ? "ok" : "error",
      text: response.message,
      icon: response.correct ? "success" : "error",
    });
    if (response.correct) {
      dispatch(getUser());
      navigate("/general");
    }
    setEditUsername(false);
  };

  if (!user) return <></>;
  return (
    <>
      <h1>Perfil</h1>
      <div>
        <form
          style={{
            display: !editUsername ? "flex" : "unset",
            alignContent: "center",
          }}
          onSubmit={handleChangeUsername}
        >
          <h5>{!editUsername ? 'Usuario: ' : 'Nuevo nombre de usuario'}</h5>{" "}
          <p>{!editUsername ? user.username : <input {...usernameInput} />}</p>{" "}
          {editUsername && (
            <h5>
              Contraseña:{" "}
              <p>
                <input {...passwordInput} />
              </p>
            </h5>
          )}{" "}
          {!editUsername && (
            <FaPen size={18} onClick={() => setEditUsername(true)} />
          )}
          {editUsername && (
            <div>
              <button className="main-button">Aceptar</button>
              <button
                className="main-button"
                onClick={() => setEditUsername(false)}
              >
                Cancelar
              </button>
            </div>
          )}
        </form>
      </div>
      <div>
        <h3>Cambiar Contraseña</h3>
        <form onSubmit={handleChangePassword}>
          <p>
            Contraseña anterior: <input type="password" {...oldPassword} />
          </p>
          <p>
            Nueva contraseña: <input type="password" {...newPassword} />
          </p>
          <p>
            Confirmar nueva contraseña:{" "}
            <input type="password" {...confirmNewPassword} />
          </p>
          <button className="main-button">Aceptar</button>
        </form>
      </div>
    </>
  );
};

export default Profile;

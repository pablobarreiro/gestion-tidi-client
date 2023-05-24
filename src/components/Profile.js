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
  const [editPassword,setEditPassword] = useState(false);

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
    setEditPassword(false)
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
          <p style={{textTransform:"capitalize"}}>{!editUsername ? user.username : <input {...usernameInput} />}</p>{" "}
          {editUsername && (
            <h5>
              Contraseña:{" "}
              <p>
                <input type="password" {...passwordInput} />
              </p>
            </h5>
          )}{" "}
          {!editUsername && (
            <FaPen 
            style={{cursor:'pointer'}} 
            size={18} 
            onClick={() => {
              setEditUsername(true);
              setEditPassword(false)
            }} />
          )}
          {editUsername && (
            <div>
              <button type="submit" className="main-button">Aceptar</button>
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
        <div style={{display:"flex"}}>
        <h5>Cambiar Contraseña</h5>
        {!editPassword && (
            <FaPen 
            style={{cursor:'pointer'}} 
            size={18} 
            onClick={() => {
              setEditPassword(true)
              setEditUsername(false);
            }} />
          )}
        </div>
        {editPassword && <form onSubmit={handleChangePassword}>
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
          <button type="submit" className="main-button">Aceptar</button>
          <button className="main-button" onClick={()=>setEditPassword(false)}>Cancelar</button>
        </form>}
      </div>
    </>
  );
};

export default Profile;

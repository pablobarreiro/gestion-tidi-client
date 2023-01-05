import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector} from 'react-redux'
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";

import { userLogin } from '../state/user';
import useInput from '../hooks/useInput';

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [showAlert,setShowAlert] = useState(false)
  const darkMode = useSelector(state => state.darkMode)

  const username = useInput();
  const password = useInput();

  const loggedUser = localStorage.getItem('user_values')

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin({
      username: username.value,
      password: password.value,
    }))
      .then(() => {
        if(localStorage.getItem('user_values')) navigate("/general")
        else setShowAlert(true)
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <Card.Body >
        <Card.Title align="center">Iniciar sesión</Card.Title>
      </Card.Body>
      <Alert variant="warning" show={showAlert} onClose={() => ( setShowAlert(false))} dismissible>
        <Alert.Heading>¡Atención!</Alert.Heading>
        <p>
          Nombre de usuario o contraseña incorrectos
        </p>
      </Alert>
      <Form  onSubmit={handleSubmit} align="center">
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Usuario</Form.Label>
          <input
          {...username} 
          type="username" 
          placeholder="Ingrese su nombre de usuario"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <input
          
          {...password} 
          type="password" 
          placeholder="Ingrese su contraseña" 
          />
        </Form.Group>

        {/* <Form.Group >
          <Form.Text >
            ¿No es un miembro? <Link to="/register">Crear una cuenta</Link>
          </Form.Text>
        </Form.Group> */}

        <button className="main-button" type="submit">
          Iniciar sesión
        </button> 
      </Form>
    </>
  );
};

export default Login;

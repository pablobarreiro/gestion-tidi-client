import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { userLogout } from '../state/user';

const NavigationBar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(userLogout())
    localStorage.removeItem("user_values")
    navigate('/login')
  }

  return (
    <>
      <h4 style={{display:'flex', justifyContent:'space-between',padding:'5px 5px 0px 5px'}}>
        <div>
          Navbar <button className='main-button' onClick={()=> navigate('/general')}>Inicio</button>{' '}
        </div>
        <div>
          <button className='main-button'>Reportes</button>{' '}
          <button onClick={handleLogout} className='main-button'>Logout</button>{' '}
          </div>
        </h4>
    </>
  );
};

export default NavigationBar;

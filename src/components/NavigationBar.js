const NavigationBar = () => {
  return (
    <>
      <h4 style={{display:'flex', justifyContent:'space-between',padding:'5px 5px 0px 5px'}}>
        <div>
          Navbar <button className='main-button'>Inicio</button>{' '}
        </div>
        <div>
          <button className='main-button'>Reportes</button>{' '}
          <button className='main-button'>Logout</button>{' '}
          </div>
        </h4>
    </>
  );
};

export default NavigationBar;

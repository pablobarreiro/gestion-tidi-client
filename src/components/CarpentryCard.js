const CarpentryCard = () => {
    return (
      <>
      <div className="card-container">
        <h2>Carpinteria</h2>
        <p>total: $XXXXXX</p>
        <p>ajuste: $XXXXXX</p>
        <p>saldo: $XXXXX</p>
        <p>envio: $XXXXXX</p>
        <p>instalacion: $XXXXXX</p>
        <div className='card-buttons'>
          <button>cargar total / ajuste</button>
          <button>pagar</button>
          <button>ver detalles</button>
        </div>

      </div>
      </>
    );
  };
  
  export default CarpentryCard
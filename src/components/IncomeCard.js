const IncomeCard = ({
  total,
  adjust,
  payments,
  remaining,
  loadOnClick,
  payOnClick,
  detailsOnClick,
}) => {
  return (
    <>
      <div className="card-container">
        <h2>Cobros</h2>
        <div>
          <p>Total: ${total}</p>
          <p>Ajuste: ${adjust}</p>
          {/* <p>60% (seña): ${Math.floor(total * 0.6)} </p>
          <p>30% (refuerzo): ${Math.floor(total * 0.3)} </p>
          <p>10% (final): ${Math.floor(total * 0.1)} </p> */}
          <p className={remaining ? "not-paid" : "paid"}>Por cobrar: ${remaining}</p>
        </div>
        <div className="card-buttons">
          {loadOnClick && (
            <button className="main-button" onClick={loadOnClick}>
              Totales
            </button>
          )}
          {payOnClick && (
            <button className="main-button" onClick={payOnClick}>
              Cobrar
            </button>
          )}
          {detailsOnClick && (
            <button className="main-button" onClick={detailsOnClick}>
              Ver detalles
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default IncomeCard;

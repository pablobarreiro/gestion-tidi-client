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
      <div className="card-income-container">
        <h2>Cobros</h2>
        <div className="income-columns">
          <div className="income-rows">
            <p>total: ${total}</p>
            <p>ajuste: ${adjust}</p>
            <p>60% (seña): ${Math.floor(total * 0.6)} </p>
            <p>30% (refuerzo): ${Math.floor(total * 0.3)} </p>
            <p>10% (final): ${Math.floor(total * 0.1)} </p>
            <p>saldo: ${remaining}</p>
          </div>
          <div className="income-rows">
            <p>Pagos cobrados</p>
            {payments &&
              payments.map((pay, i) => (
                <p key={i}>
                  {pay.pay_date} - ${pay.amount} {`(${pay.payment_method})`}
                </p>
              ))}
          </div>
        </div>
        <div className="card-buttons">
          <button className="main-button" onClick={loadOnClick}>
            cargar
          </button>
          <button className="main-button" onClick={payOnClick}>
            pagar
          </button>
          <button className="main-button" onClick={detailsOnClick}>
            ver detalles
          </button>
        </div>
      </div>
    </>
  );
};

export default IncomeCard;

const Card = ({
  title,
  total,
  adjust,
  adjust_paid,
  remaining,
  shipping_total,
  placement_total,
  shipping_paid,
  placement_paid,
  payOnClick,
  loadOnClick,
  detailsOnClick,
}) => {
  const showTransport = title === "Carpinteria";
  const showInstalation = title === "Carpinteria" || title === "Iluminacion";
  const showCollocation = title === "Marmol";

  return (
    <>
      <div className="card-container">
        <h2>{title}</h2>
        <p>Total: {showCollocation? 'USD': '$'} {total}</p>
        <p className={(title==="Herrajes" && adjust) ? adjust_paid ? "paid" : "not-paid":''}>Ajuste: {showCollocation? 'USD': '$'} {adjust}</p>
        <p className={!remaining ? "paid" : "not-paid"}>Saldo: {showCollocation? 'USD': '$'} {remaining}</p>
        {showTransport && <p className={shipping_paid ? "paid" : "not-paid"}>Envio: $ {shipping_total}</p>}
        {showInstalation && <p className={placement_paid ? "paid" : "not-paid"}>Instalacion: $ {placement_total}</p>}
        {showCollocation && <p className={placement_paid ? "paid" : "not-paid"}>Colocacion: $ {placement_total}</p>}
        <div className="card-buttons">
          {loadOnClick && <button className="main-button" onClick={loadOnClick}>Cargar</button>}
          {payOnClick && <button className="main-button" onClick={payOnClick}>Pagar</button>}
          {detailsOnClick && <button className="main-button" onClick={detailsOnClick}>Ver detalles</button>}
        </div>
      </div>
    </>
  );
};

export default Card;

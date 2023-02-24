import { formatNumber } from "../utils/functions";

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
    <div className="card-container button-separator">
      <div className="card-content">
        <h3>{title}</h3>
        <p>Total: {showCollocation? 'USD': '$'} {formatNumber(total)}</p>
        <p className={((title==="Herrajes" || title==="Iluminacion") && adjust !==0) ? adjust_paid ? "paid" : "not-paid":''}>Ajuste: {showCollocation? 'USD': '$'} {formatNumber(adjust)}</p>
        <p className={!remaining ? "paid" : "not-paid"}>Saldo: {showCollocation? 'USD': '$'} {formatNumber(remaining)}</p>
        {showTransport && <p className={shipping_paid ? "paid" : "not-paid"}>Envio: $ {formatNumber(shipping_total)}</p>}
        {showInstalation && <p className={placement_paid ? "paid" : "not-paid"}>Instalacion: $ {formatNumber(placement_total)}</p>}
        {showCollocation && <p className={placement_paid ? "paid" : "not-paid"}>Colocacion: $ {formatNumber(placement_total)}</p>}
      </div>
      <div className="card-buttons">
        {loadOnClick && <button className="main-button" onClick={loadOnClick}>Cargar</button>}
        {payOnClick && <button className="main-button" onClick={payOnClick}>{title==="Cobros"? 'Cobrar': 'Pagar'}</button>}
        {detailsOnClick && <button className="main-button" onClick={detailsOnClick}>Ver detalles</button>}
      </div>
    </div>
  );
};

export default Card;

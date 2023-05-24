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
        <p>Ajuste: <u className={((title==="Herrajes" || title==="Iluminacion") && adjust !==0) ? adjust_paid ? "paid-aux" : "not-paid":'text-common'}>{showCollocation? 'USD': '$'} {formatNumber(adjust)}</u> {(((title==="Herrajes" || title==="Iluminacion") && adjust !==0) && adjust_paid) && <a className="paid">✓</a>} </p>
        <p>Saldo: <u className={!remaining ? "paid-aux" : "not-paid"}> {showCollocation? 'USD': '$'} {formatNumber(remaining)}</u> {!remaining && <a className="paid">✓</a>} </p>
        {showTransport && <p>Envio: <u className={shipping_paid ? "paid-aux" : "not-paid"}>$ {formatNumber(shipping_total)}</u> {shipping_paid && <a className="paid">✓</a>} </p>}
        {showInstalation && <p>Instalacion: <u className={placement_paid ? "paid-aux" : "not-paid"}> $ {formatNumber(placement_total)}</u> {placement_paid && <a className="paid">✓</a>} </p>}
        {showCollocation && <p>Colocacion: <u className={placement_paid ? "paid-aux" : "not-paid"}> $ {formatNumber(placement_total)}</u>  {placement_paid && <a className="paid">✓</a>} </p>}
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

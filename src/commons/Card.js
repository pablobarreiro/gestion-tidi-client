const Card = ({
  title,
  total,
  adjust,
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
        <p>total: {showCollocation? 'USD': '$'} {total}</p>
        <p>ajuste: {showCollocation? 'USD': '$'} {adjust}</p>
        <p>saldo: {showCollocation? 'USD': '$'} {remaining}</p>
        {showTransport && <p className={shipping_paid ? "paid" : "not-paid"}>envio: $ {shipping_total}</p>}
        {showInstalation && <p className={placement_paid ? "paid" : "not-paid"}>instalacion: $ {placement_total}</p>}
        {showCollocation && <p className={placement_paid ? "paid" : "not-paid"}>colocacion: $ {placement_total}</p>}
        <div className="card-buttons">
          <button className="main-button" onClick={loadOnClick}>cargar</button>
          <button className="main-button" onClick={payOnClick}>pagar</button>
          <button className="main-button" onClick={detailsOnClick}>ver detalles</button>
        </div>
      </div>
    </>
  );
};

export default Card;

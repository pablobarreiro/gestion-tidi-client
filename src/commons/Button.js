const Button = ({text, onClick, type, form}) => {
    return <button className="main-button" type={type} form={form} onClick={onClick}>{text}</button>
}

export default Button
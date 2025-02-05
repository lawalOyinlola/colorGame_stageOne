/* eslint-disable react/prop-types */

const Modal = ({ title, message, message2, buttonText, onButtonClick }) => {
  return (
    <div className="modal" data-testid="gameInstructions">
      <h2>{title}</h2>
      <p>{message}</p>
      <p>{message2}</p>
      <button className="cta-btn" onClick={onButtonClick}>
        {buttonText}
      </button>
    </div>
  );
};

export default Modal;

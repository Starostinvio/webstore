import React from "react";
<<<<<<< HEAD
import PropTypes from "prop-types";
import "./style.css";

function Controls({ onAdd }) {
  return (
    <div className="Controls">
      <button onClick={() => onAdd()}>Добавить</button>
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

Controls.defaultProps = {
  onAdd: () => {},
};

export default Controls;
=======
import PropTypes from 'prop-types';
import './style.css';

function Controls({onAdd}) {
  return (
    <div className='Controls'>
      <button onClick={() => onAdd()}>Добавить</button>
    </div>
  )
}

Controls.propTypes = {
  onAdd: PropTypes.func
};

Controls.defaultProps = {
  onAdd: () => {}
}

export default React.memo(Controls);
>>>>>>> e76a78bcc0df616abef94f7e147e1b037be5aec9

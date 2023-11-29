import React from "react";
<<<<<<< HEAD
import "./style.css";

function Head({ title }) {
  return (
    <div className="Head">
      <h1>{title}</h1>
    </div>
  );
}

=======
import PropTypes from "prop-types";
import './style.css';

function Head({title}) {
  return (
    <div className='Head'>
      <h1>{title}</h1>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

>>>>>>> e76a78bcc0df616abef94f7e147e1b037be5aec9
export default React.memo(Head);

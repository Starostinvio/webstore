import "./style.css";
import { memo, useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ProfileLink({ userName }) {
  return (
    <Link className="ProfileLink" to="/profile">
      {userName}
    </Link>
  );
}

export default memo(ProfileLink);

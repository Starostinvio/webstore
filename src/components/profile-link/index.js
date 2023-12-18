import "./style.css";
import { memo, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function ProfileLink({ userName, location }) {
  return (
    <Link className="ProfileLink" to={"/profile"}>
      {userName}
    </Link>
  );
}

export default memo(ProfileLink);

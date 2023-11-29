import React from "react";
<<<<<<< HEAD
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import PropTypes from "prop-types";

function PageLayout({ children }) {
  const cn = bem("PageLayout");

  return (
    // <div className={cn()}>
    //   <div className={cn("head")}>

    //     {head}
    //   </div>
    //   <div className={cn("controls")}>

    //     {controls}
    //   </div>
    //   <div className={cn("center")}>

    //     {content}
    //   </div>
    // </div>
    <div className={cn()}>
      <div className={cn("center")}>{children}</div>
=======
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function PageLayout({children}) {

  const cn = bem('PageLayout');

  return (
    <div className={cn()}>
      <div className={cn('center')}>
        {children}
      </div>
>>>>>>> e76a78bcc0df616abef94f7e147e1b037be5aec9
    </div>
  );
}

PageLayout.propTypes = {
<<<<<<< HEAD
  children: PropTypes.node,
};
=======
  children: PropTypes.node
}
>>>>>>> e76a78bcc0df616abef94f7e147e1b037be5aec9

export default React.memo(PageLayout);

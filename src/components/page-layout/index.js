<<<<<<< HEAD
import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function PageLayout({ children }) {
  const cn = bem("PageLayout");

  return (
    <div className={cn()}>
      <div className={cn("center")}>{children}</div>
=======
import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function PageLayout({head, footer, children}) {

  const cn = bem('PageLayout');

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        {head}
      </div>
      <div className={cn('center')}>
        {children}
      </div>
      <div className={cn('footer')}>
        {footer}
      </div>
>>>>>>> 1fa7f72c2e0cdd0700e3c37cf21c4041cc0feb68
    </div>
  );
}

PageLayout.propTypes = {
<<<<<<< HEAD
  children: PropTypes.node,
};

export default React.memo(PageLayout);
=======
  children: PropTypes.node
}

export default memo(PageLayout);
>>>>>>> 1fa7f72c2e0cdd0700e3c37cf21c4041cc0feb68

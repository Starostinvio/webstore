import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat, plural } from "../../utils";
import "./style.css";
import { Link } from "react-router-dom";
import MainMenu from "../main-menu";

function BasketTool({ sum, amount, onOpen, pageWords }) {
  const cn = bem("BasketTool");
  return (
    <div className={cn()}>
      <MainMenu title={pageWords.MAIN} />
      <div>
        <span className={cn("label")}>{pageWords.IN_BASKET}</span>
        <span className={cn("total")}>
          {amount
            ? `${amount} ${plural(
                amount,
                pageWords.PLURAL_PRODUCT,
                pageWords.LANG
              )} / ${numberFormat(sum)} ₽`
            : pageWords.EMPTY}
        </span>
        <button onClick={onOpen}>{pageWords.GO}</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  pageWords: PropTypes.object,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
};

export default memo(BasketTool);

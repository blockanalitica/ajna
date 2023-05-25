"use client";

import classnames from "classnames";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const OrderSection = ({ currentOrder, orderField, onOrderChange, children }) => {
  let currentOrderField = currentOrder;
  let isAscOrder = true;
  if (currentOrder.startsWith("-")) {
    currentOrderField = currentOrder.substring(1);
    isAscOrder = false;
  }

  const isActive = currentOrderField === orderField;

  const onChange = () => {
    let field = null;
    if (isActive) {
      field = orderField;
      if (!currentOrder.startsWith("-")) {
        field = `-${orderField}`;
      }
    } else {
      field = `-${orderField}`;
    }

    onOrderChange ? onOrderChange(field) : null;
  };

  return (
    <>
      <button className="hover:text-ajna-lavender flex" onClick={() => onChange()}>
        {children}
        <div
          className={classnames("ml-3", {
            "text-white": !isActive,
            "text-ajna-lavender": isActive,
          })}
        >
          {isActive && isAscOrder ? (
            <FontAwesomeIcon icon={faArrowUp} />
          ) : (
            <FontAwesomeIcon icon={faArrowDown} />
          )}
        </div>
      </button>
    </>
  );
};

const HeaderCell = ({
  align,
  currentOrder,
  orderField,
  onOrderChange,
  allowOrder = true,
  children,
}) => {
  return (
    <div className={classnames("flex items-center", `justify-${align || "start"}`)}>
      {allowOrder && orderField ? (
        <OrderSection
          currentOrder={currentOrder}
          orderField={orderField}
          onOrderChange={onOrderChange}
        >
          {children}
        </OrderSection>
      ) : (
        children
      )}
    </div>
  );
};

export default HeaderCell;

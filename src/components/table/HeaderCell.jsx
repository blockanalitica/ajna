import classnames from "classnames";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const OrderSection = ({
  currentOrder,
  orderField,
  onOrderChange,
  onPageChange,
  children,
}) => {
  let currentOrderField = currentOrder;
  let isAscOrder = true;
  if (currentOrder.startsWith("-")) {
    currentOrderField = currentOrder.substring(1);
    isAscOrder = false;
  }

  const isActive = currentOrderField === orderField;

  const onChange = () => {
    if (!onOrderChange) {
      return;
    }

    let field = null;
    if (isActive) {
      field = orderField;
      if (!currentOrder.startsWith("-")) {
        field = `-${orderField}`;
      }
    } else {
      field = `-${orderField}`;
    }
    onOrderChange(field);
    if (onPageChange) {
      onPageChange(1);
    }
  };

  return (
    <>
      <button className="hover:text-ajna-lavender flex" onClick={() => onChange()}>
        {children}
        <div
          className={classnames("ml-3", {
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
  onPageChange,
  allowOrder = true,
  children,
  className,
}) => {
  // We're doing aerobatics with the alignment because tailwind can't figure out
  // composed strigs, so we need to map it out for it to be recognised and compiled
  const justifyMapping = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
  };
  const textMapping = {
    start: "text-start",
    center: "text-center",
    end: "text-end",
  };
  return (
    <div
      className={classnames(
        "flex items-center border-b border-gray-19",
        className,
        justifyMapping[align || "start"],
        textMapping[align || "start"],
      )}
    >
      {allowOrder && orderField ? (
        <OrderSection
          currentOrder={currentOrder}
          orderField={orderField}
          onOrderChange={onOrderChange}
          onPageChange={onPageChange}
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

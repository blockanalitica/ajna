import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Portal from "@/components/hoc/Portal";

function Offcanvas({ title, toggle, isOpen, children }) {
  const onToggle = (e) => {
    document.body.style.overflow = "";
    if (toggle) {
      toggle(e);
    }
  };

  if (!isOpen) {
    return null;
  }

  document.body.style.overflow = "hidden";
  return (
    <Portal>
      <div className="fixed w-full h-full inset-0 z-50">
        <div
          className="fixed bg-black bg-opacity-70 w-full h-full inset-x-0 top-0"
          onClick={(e) => (toggle ? onToggle(e) : null)}
        ></div>
        <div className="flex flex-col right-0 w-96 fixed top-0 py-4 bg-gray-23 h-full overflow-auto z-40">
          <div className="mb-8 px-5 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">{title}</h2>
            <FontAwesomeIcon
              icon={faXmark}
              className="cursor-pointer hover:text-ajna-aqua"
              size="lg"
              onClick={(e) => (toggle ? onToggle(e) : null)}
            />
          </div>
          <div className="px-5 font-light">{children}</div>
        </div>
      </div>
    </Portal>
  );
}

export default Offcanvas;

export default function Modal({ open, onClose, children }) {
    if (!open) return null;
    return (
      <div className="fixed inset-0 grid place-items-center bg-black/40 z-50">
        <div className="bg-white rounded-lg p-6 w-[90%] max-w-md">
          <button className="float-right" onClick={onClose}>
            ✕
          </button>
          {children}
        </div>
      </div>
    );
  }
  
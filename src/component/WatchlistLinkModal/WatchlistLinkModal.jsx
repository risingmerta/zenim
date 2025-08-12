// components/WatchlistLinkModal.jsx
"use client";
import { AiOutlineClose } from "react-icons/ai";
import { useSession } from "next-auth/react";
import "./watchModal.css"

export default function WatchlistLinkModal({ isOpen, setIsOpen }) {
  const { data: session } = useSession();

  if (!isOpen || !session) return null;

  const watchlistURL = `https://biolynk.shoko.fun/${session.user.username}`;

  return (
    <div
      className="modal"
      style={{
        zIndex: 110,
        opacity: isOpen ? 1 : 0,
      }}
      onClick={() => setIsOpen(false)}
    >
      <div
        className="modal-content"
        style={{
          transform: isOpen ? "translateX(0)" : "translateX(1000px)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="close-button"
          aria-label="Close"
        >
          <AiOutlineClose />
        </button>

        <p className="heddio">📌 Quick Watchlist Access</p>
        <p className="kinto">
          Add this link to your Instagram bio to access your watchlist easily:
        </p>
        <input
          type="text"
          value={watchlistURL}
          readOnly
          className="midOI"
          onClick={(e) => e.target.select()}
        />
        <div
          className="btiom"
          onClick={() => {
            navigator.clipboard.writeText(watchlistURL);
          }}
        >
          Copy Link
        </div>
      </div>
    </div>
  );
}

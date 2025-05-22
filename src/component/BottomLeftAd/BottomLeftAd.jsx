"use client";
import { useState, useEffect } from "react";

export default function BottomLeftAd() {
  const [visible, setVisible] = useState(true);
  const [timeoutId, setTimeoutId] = useState(null);

  const handleClose = () => {
    setVisible(false);

    const id = setTimeout(() => {
      setVisible(true);
    }, 10000); // 10 seconds

    setTimeoutId(id);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
        background: "#fff",
        boxShadow: "0 0 10px rgba(0,0,0,0.3)",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "relative" }}>
        {/* Close Button */}
        <button
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "5px",
            right: "5px",
            background: "rgba(0,0,0,0.5)",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: "20px",
            height: "20px",
            cursor: "pointer",
            lineHeight: "20px",
            textAlign: "center",
            fontSize: "14px",
          }}
        >
          ×
        </button>

        {/* Ad Iframe */}
        <iframe
          src="/ad2"
          style={{
            width: "300px",
            height: "100px",
            border: "none",
            overflow: "hidden",
          }}
          scrolling="no"
        ></iframe>
      </div>
    </div>
  );
}

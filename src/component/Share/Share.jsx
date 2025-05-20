"use client";
import React, { useState } from "react";
import "./Share.css";
import Image from "next/image";
import share from "../../../public/share.gif";
import { MdContentCopy, MdCheckCircle } from "react-icons/md";
import { FaShareAlt } from "react-icons/fa";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  RedditShareButton,
  LinkedinShareButton,
  EmailShareButton,
} from "react-share";
import {
  FaFacebookF,
  FaXTwitter,
  FaWhatsapp,
  FaTelegram,
  FaRedditAlien,
  FaLinkedinIn,
  FaEnvelope,
} from "react-icons/fa6";

export default function Share({ ShareUrl, arise, style }) {
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(ShareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="share-container" style={style}>
      <div className="share-header">
        <Image width={50} height={50} src={share} alt="share" />
        <div className="share-text">
          <p className="primary">Share {arise || process.env.NEXT_PUBLIC_SITE_NAME || "Animoon"}</p>
          <p className="secoi">to your friends</p>
        </div>
      </div>

      <div className="share-buttons">
        {/* Copy Button */}
        <button className="share-icon-button" onClick={handleCopy}>
          {copied ? (
            <MdCheckCircle size={22} className="copied-icon" />
          ) : (
            <MdContentCopy size={22} className="copy-icon" />
          )}
        </button>

        {/* Share Button */}
        <button className="share-icon-button" onClick={() => setShowModal(true)}>
          <FaShareAlt size={20} />
        </button>
      </div>

      {/* Share Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="share-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Share via</h3>
            <div className="share-grid">
              <FacebookShareButton url={ShareUrl}>
                <FaFacebookF size={20} />
                <span>Facebook</span>
              </FacebookShareButton>
              <TwitterShareButton url={ShareUrl}>
                <FaXTwitter size={20} />
                <span>Twitter</span>
              </TwitterShareButton>
              <WhatsappShareButton url={ShareUrl}>
                <FaWhatsapp size={20} />
                <span>WhatsApp</span>
              </WhatsappShareButton>
              <TelegramShareButton url={ShareUrl}>
                <FaTelegram size={20} />
                <span>Telegram</span>
              </TelegramShareButton>
              <RedditShareButton url={ShareUrl}>
                <FaRedditAlien size={20} />
                <span>Reddit</span>
              </RedditShareButton>
              <LinkedinShareButton url={ShareUrl}>
                <FaLinkedinIn size={20} />
                <span>LinkedIn</span>
              </LinkedinShareButton>
              <EmailShareButton url={ShareUrl}>
                <FaEnvelope size={20} />
                <span>Email</span>
              </EmailShareButton>
            </div>
            <button className="close-modal" onClick={() => setShowModal(false)}>
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";
import React, { useState } from "react";
import Image from "next/image";
import share from "../../../public/share.gif";
import "./Share.css";
import {
  MdContentCopy,
  MdCheckCircle,
  MdEmail,
  MdAlternateEmail,
} from "react-icons/md";
import {
  FaXTwitter,
  FaFacebookF,
  FaGetPocket,
  FaLine,
  FaLinkedinIn,
  FaPinterest,
  FaRedditAlien,
  FaTelegram,
  FaTumblr,
  FaViber,
  FaWhatsapp,
  FaShareAlt,
} from "react-icons/fa";
import { SlSocialVkontakte } from "react-icons/sl";
import {
  SiHatenabookmark,
  SiInstapaper,
  SiLivejournal,
  SiOdnoklassniki,
  SiWorkplace,
} from "react-icons/si";
import {
  EmailShareButton,
  FacebookShareButton,
  GabShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  VKShareButton,
  ViberShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
} from "react-share";

export default function Share({ ShareUrl, arise }) {
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(ShareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="share-app">
      <Image width={50} height={50} src={share} alt="share" />
      <div>
        <p className="primary">
          Share {arise || process.env.NEXT_PUBLIC_SITE_NAME || "Animoon"}
        </p>
        <p className="secoi">to your friends</p>
      </div>

      {/* Copy and Share Buttons */}
      <div className="share-buttons">
        <button className="share-icon-button" onClick={handleCopy}>
          {copied ? (
            <>
              <MdCheckCircle size={22} />
              <span className="button-text large-screen-only">Copied</span>
            </>
          ) : (
            <>
              <MdContentCopy size={22} />
              <span className="button-text large-screen-only">Copy</span>
            </>
          )}
        </button>

        <button
          className="share-icon-button"
          onClick={() => setShowModal(true)}
        >
          <FaShareAlt size={20} />
          <span className="button-text large-screen-only">Share</span>
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
        <div className="share-modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content">
            <button
              className="close-button"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
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
        </div>
      )}
    </div>
  );
}

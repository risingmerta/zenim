"use client";
import React, { useState } from "react";
import "./Share.css";
import share from "../../../public/share.gif";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaXTwitter } from "react-icons/fa6";
import {
  FaFacebookF,
  FaGetPocket,
  FaLine,
  FaLinkedinIn,
  FaPinterest,
  FaRedditAlien,
  FaShareAlt,
  FaTelegram,
  FaTumblr,
  FaViber,
  FaWhatsapp,
} from "react-icons/fa";
import {
  MdAlternateEmail,
  MdEmail,
  MdContentCopy,
  MdCheckCircle,
} from "react-icons/md";
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

export default function Share({ ShareUrl, style, arise }) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(ShareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper to render each share button with icon and label
  const ShareButton = ({ Component, icon: Icon, label }) => (
    <Component url={ShareUrl} className={`${label.replace(/\s+/g, "")}ShareButton`}>
      <div style={{ textAlign: "center", userSelect: "none" }}>
        <Icon size={24} />
        <div style={{ fontSize: 11, marginTop: 4 }}>{label}</div>
      </div>
    </Component>
  );

  return (
    <>
      <div className="share-app d-flex a-center f-poppins" style={style}>
        <Image width={50} height={50} src={share} alt="share" />
        <div>
          <p className="primary">
            Share {arise || process.env.NEXT_PUBLIC_SITE_NAME || "Animoon"}
          </p>
          <p className="secoi">to your friends</p>
        </div>
        <button onClick={handleCopy} className="copy-btn">
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
          )}{" "}
        </button>
        <button onClick={() => setOpen(true)} className="share-btn">
          <FaShareAlt size={20} />
          <span className="button-text large-screen-only">Share</span>
        </button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="share-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="share-modal"
              initial={{ scale: 0.8, y: "-50%", opacity: 0 }}
              animate={{ scale: 1, y: "-50%", opacity: 1 }}
              exit={{ scale: 0.8, y: "-50%", opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2>Share via</h2>
              <div className="share-grid">
                <ShareButton Component={WhatsappShareButton} icon={FaWhatsapp} label="WhatsApp" />
                <ShareButton Component={FacebookShareButton} icon={FaFacebookF} label="Facebook" />
                <ShareButton Component={TelegramShareButton} icon={FaTelegram} label="Telegram" />
                <ShareButton Component={RedditShareButton} icon={FaRedditAlien} label="Reddit" />
                <ShareButton Component={TwitterShareButton} icon={FaXTwitter} label="Twitter" />
                <ShareButton Component={EmailShareButton} icon={MdEmail} label="Email" />
                <ShareButton Component={HatenaShareButton} icon={SiHatenabookmark} label="Hatena" />
                <ShareButton Component={InstapaperShareButton} icon={SiInstapaper} label="Instapaper" />
                <ShareButton Component={LineShareButton} icon={FaLine} label="Line" />
                <ShareButton Component={LinkedinShareButton} icon={FaLinkedinIn} label="LinkedIn" />
                <ShareButton Component={LivejournalShareButton} icon={SiLivejournal} label="LiveJournal" />
                <ShareButton Component={MailruShareButton} icon={MdAlternateEmail} label="Mail.ru" />
                <ShareButton Component={OKShareButton} icon={SiOdnoklassniki} label="Odnoklassniki" />
                <ShareButton Component={PinterestShareButton} icon={FaPinterest} label="Pinterest" />
                <ShareButton Component={PocketShareButton} icon={FaGetPocket} label="Pocket" />
                <ShareButton Component={TumblrShareButton} icon={FaTumblr} label="Tumblr" />
                <ShareButton Component={ViberShareButton} icon={FaViber} label="Viber" />
                <ShareButton Component={VKShareButton} icon={SlSocialVkontakte} label="VK" />
                <ShareButton Component={WorkplaceShareButton} icon={SiWorkplace} label="Workplace" />
              </div>
              <button className="close-modal" onClick={() => setOpen(false)}>
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

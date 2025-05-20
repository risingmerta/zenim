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
  FaTelegram,
  FaTumblr,
  FaViber,
  FaWhatsapp,
} from "react-icons/fa";
import { MdAlternateEmail, MdEmail, MdContentCopy } from "react-icons/md";
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

  return (
    <>
      <div className="share-app d-flex a-center f-poppins" style={style}>
        <Image width={50} height={50} src={share} alt="share" />
        <div>
          <p className="primary">Share {arise || process.env.NEXT_PUBLIC_SITE_NAME || "Animoon"}</p>
          <p className="secoi">to your friends</p>
        </div>
        <button onClick={handleCopy} className="copy-btn"> 
          <MdContentCopy size={20} />
          {copied ? "Copied!" : "Copy Link"}
        </button>
        <button onClick={() => setOpen(true)} className="share-btn">
          Share
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
                <WhatsappShareButton url={ShareUrl}><FaWhatsapp /></WhatsappShareButton>
                <FacebookShareButton url={ShareUrl}><FaFacebookF /></FacebookShareButton>
                <TelegramShareButton url={ShareUrl}><FaTelegram /></TelegramShareButton>
                <RedditShareButton url={ShareUrl}><FaRedditAlien /></RedditShareButton>
                <TwitterShareButton url={ShareUrl}><FaXTwitter /></TwitterShareButton>
                <EmailShareButton url={ShareUrl}><MdEmail /></EmailShareButton>
                <HatenaShareButton url={ShareUrl}><SiHatenabookmark /></HatenaShareButton>
                <InstapaperShareButton url={ShareUrl}><SiInstapaper /></InstapaperShareButton>
                <LineShareButton url={ShareUrl}><FaLine /></LineShareButton>
                <LinkedinShareButton url={ShareUrl}><FaLinkedinIn /></LinkedinShareButton>
                <LivejournalShareButton url={ShareUrl}><SiLivejournal /></LivejournalShareButton>
                <MailruShareButton url={ShareUrl}><MdAlternateEmail /></MailruShareButton>
                <OKShareButton url={ShareUrl}><SiOdnoklassniki /></OKShareButton>
                <PinterestShareButton url={ShareUrl}><FaPinterest /></PinterestShareButton>
                <PocketShareButton url={ShareUrl}><FaGetPocket /></PocketShareButton>
                <TumblrShareButton url={ShareUrl}><FaTumblr /></TumblrShareButton>
                <ViberShareButton url={ShareUrl}><FaViber /></ViberShareButton>
                <VKShareButton url={ShareUrl}><SlSocialVkontakte /></VKShareButton>
                <WorkplaceShareButton url={ShareUrl}><SiWorkplace /></WorkplaceShareButton>
              </div>
              <button className="close-modal" onClick={() => setOpen(false)}>Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

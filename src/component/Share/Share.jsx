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
    navigator.clipboard.writeText(ShareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
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
        <div className="share-modal">
          <div className="modal-content">
            <button
              className="close-button"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>

            <div className="share-grid">
              <WhatsappShareButton url={ShareUrl}>
                <FaWhatsapp />
              </WhatsappShareButton>
              <FacebookShareButton url={ShareUrl}>
                <FaFacebookF />
              </FacebookShareButton>
              <TelegramShareButton url={ShareUrl}>
                <FaTelegram />
              </TelegramShareButton>
              <RedditShareButton url={ShareUrl}>
                <FaRedditAlien />
              </RedditShareButton>
              <TwitterShareButton url={ShareUrl}>
                <FaXTwitter />
              </TwitterShareButton>
              <EmailShareButton url={ShareUrl}>
                <MdEmail />
              </EmailShareButton>
              <HatenaShareButton url={ShareUrl}>
                <SiHatenabookmark />
              </HatenaShareButton>
              <InstapaperShareButton url={ShareUrl}>
                <SiInstapaper />
              </InstapaperShareButton>
              <LineShareButton url={ShareUrl}>
                <FaLine />
              </LineShareButton>
              <LinkedinShareButton url={ShareUrl}>
                <FaLinkedinIn />
              </LinkedinShareButton>
              <LivejournalShareButton url={ShareUrl}>
                <SiLivejournal />
              </LivejournalShareButton>
              <MailruShareButton url={ShareUrl}>
                <MdAlternateEmail />
              </MailruShareButton>
              <OKShareButton url={ShareUrl}>
                <SiOdnoklassniki />
              </OKShareButton>
              <PinterestShareButton url={ShareUrl}>
                <FaPinterest />
              </PinterestShareButton>
              <PocketShareButton url={ShareUrl}>
                <FaGetPocket />
              </PocketShareButton>
              <TumblrShareButton url={ShareUrl}>
                <FaTumblr />
              </TumblrShareButton>
              <ViberShareButton url={ShareUrl}>
                <FaViber />
              </ViberShareButton>
              <VKShareButton url={ShareUrl}>
                <SlSocialVkontakte />
              </VKShareButton>
              <WorkplaceShareButton url={ShareUrl}>
                <SiWorkplace />
              </WorkplaceShareButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

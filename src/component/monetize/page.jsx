"use client";
import "./monetize.css";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Profilo from "../Profilo/Profilo";
import SignInSignUpModal from "../SignSignup/SignInSignUpModal";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Toast from "../Toast/Toast";

export default function AffiliatePage(props) {
  const { data: session } = useSession();
  const [selectL, setSelectL] = useState("en");
  const [directLink, setDirectLink] = useState("");
  const [refLink, setRefLink] = useState("");
  const [status, setStatus] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [profiIsOpen, setProfiIsOpen] = useState(false);
  const [logIsOpen, setLogIsOpen] = useState(false);
  const [isAffiliate, setIsAffiliate] = useState(false);
  const [copied, setCopied] = useState(false);
  const referralLink = `https://approx.animoon.me/home?refer=${session?.user?.id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // reset after 2 seconds
    });
  };

  const sign = (sign) => setLogIsOpen(sign);
  const lang = (lang) => setSelectL(lang);

  useEffect(() => {
    const fetchLinks = async () => {
      if (!session) {
        setIsAffiliate(false);
        return;
      }
      try {
        const res = await fetch(`/api/get-links?userId=${session?.user?.id}`);
        const result = await res.json();

        if (result?.directLink) {
          setIsAffiliate(true);
          setDirectLink(result.directLink);
        }
        if (result?.refLink) {
          setRefLink(result.refLink);
        }
      } catch (err) {
        console.error("Error fetching user links:", err);
      }
    };
    fetchLinks();
  }, [session]);

  const handleSave = async () => {
    if (!directLink) {
      setStatus("Please enter your Direct Adsterra Link.");
      return;
    }
    if (!session) {
      setLogIsOpen(true);
      setStatus("Please sign in to save your links.");
      return;
    }
    try {
      const res = await fetch("/api/save-links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          directLink,
          refLink,
          userId: session?.user?.id,
        }),
      });
      const result = await res.json();
      if (result.success) {
        setStatus("");
        setShowToast(true);
        setDirectLink("");
        setRefLink("");
        setIsAffiliate(true);
      } else {
        setStatus("❌ Failed to save links.");
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Error saving links.");
    }
  };

  return (
    <>
      <Navbar
        lang={lang}
        sign={sign}
        setProfiIsOpen={setProfiIsOpen}
        profiIsOpen={profiIsOpen}
      />
      {profiIsOpen && (
        <Profilo setProfiIsOpen={setProfiIsOpen} profiIsOpen={profiIsOpen} />
      )}
      {logIsOpen && (
        <SignInSignUpModal
          logIsOpen={logIsOpen}
          setLogIsOpen={setLogIsOpen}
          sign={sign}
        />
      )}

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          margin: "10px 0",
        }}
      >
        <iframe
          src="/ad5"
          style={{
            width: "fit-content",
            height: "100px",
            border: "none",
            overflow: "hidden",
          }}
          scrolling="no"
        ></iframe>
      </div>

      <div className="container">
        {isAffiliate ? (
          <>
            <h1 className="heading">🎉 You're an Affiliate!</h1>
            <p className="text">
              Thanks for joining the Animoon Affiliate Program. Share your link
              and earn!
            </p>
            <div className="box">
              <div className="boxTitle">Start Earning now</div>
              <p className="text">
                Go ahead — copy and share this link now. Then after a few hours,
                check your Adsterra account to see the results!
              </p>

              <input
                type="text"
                readOnly
                value={referralLink}
                className="input"
                onFocus={(e) => e.target.select()}
              />
              <button className="saveButton" onClick={handleCopy}>
                {copied ? "Link Copied!" : "Copy Link"}
              </button>
            </div>
            <a
              className="button"
              href="https://beta.publishers.adsterra.com/websites"
              target="_blank"
              rel="noopener noreferrer"
            >
              🚀 Manage Your Adsterra Account
            </a>

            <div className="box" style={{ marginTop: "2rem" }}>
              <h2 className="boxTitle">✏️ Update Your Affiliate Links</h2>

              <label className="pext">Update Direct Link:</label>
              <input
                type="text"
                value={directLink}
                onChange={(e) => setDirectLink(e.target.value)}
                placeholder="Update your direct link"
                className="input"
              />

              <label className="pext">Update Referral Link:</label>
              <input
                type="text"
                value={refLink}
                onChange={(e) => setRefLink(e.target.value)}
                placeholder="Update your referral link"
                className="input"
              />

              <button className="saveButton" onClick={handleSave}>
                🔄 Update Links
              </button>

              {status && <p className="status">{status}</p>}
            </div>
          </>
        ) : (
          <>
            <h1 className="heading">💸 Share Animoon & Earn</h1>
            <p className="text">
              Become an affiliate by sharing your direct link and earn for every
              visit!
            </p>

            {/* Step 1 - Join Adsterra */}
            <div className="box">
              <h2 className="boxTitle">🚀 1. Join Adsterra</h2>
              <p className="text">
                Create your Adsterra publisher account to get your Direct Link.
              </p>
              <a
                className="button"
                href="https://beta.publishers.adsterra.com/referral/XbbeibecUR"
                target="_blank"
                rel="noopener noreferrer"
              >
                🚀 Join Adsterra & Get Your Link
              </a>
            </div>

            {/* Step 2 - Add Direct Link */}
            <div className="box">
              <h2 className="boxTitle">▶️ 2. Add Direct Link</h2>
              <a
                className="button"
                href="https://beta.publishers.adsterra.com/links"
                target="_blank"
                rel="noopener noreferrer"
              >
                🚀 Get Your Direct Link
              </a>
              <label className="pext">Your Adsterra Direct Link:</label>
              <input
                type="text"
                value={directLink}
                onChange={(e) => setDirectLink(e.target.value)}
                placeholder="Paste your direct ad link here"
                className="input"
              />
            </div>

            {/* Step 3 - Referral (Optional) */}
            <div className="box">
              <h2 className="boxTitle">🤝 3. Refer Friends (Optional)</h2>
              <a
                className="button"
                href="https://beta.publishers.adsterra.com/referrals"
                target="_blank"
                rel="noopener noreferrer"
              >
                🚀 Get Your Referral Link
              </a>
              <label className="pext">Your Adsterra Referral Link:</label>
              <input
                type="text"
                value={refLink}
                onChange={(e) => setRefLink(e.target.value)}
                placeholder="Paste your referral link here"
                className="input"
              />
              <p className="text">
                💸 When you refer someone using your link, you will earn 5% of
                what the person you refer earns as an affiliate of Animoon!
              </p>
            </div>

            <button className="saveButton" onClick={handleSave}>
              💾 Save My Affiliate Links
            </button>

            {status && <p className="status">{status}</p>}

            <p className="note">
              Once saved, share your affiliate links and start earning!
            </p>
          </>
        )}

        <div className="footer">
          Made with ❤️ by <strong style={{ color: "#c084fc" }}>Animoon</strong>
        </div>
      </div>

      {showToast && (
        <Toast
          message="✅ Your affiliate links have been saved!"
          onClose={() => setShowToast(false)}
        />
      )}

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          margin: "10px 0",
        }}
      >
        <iframe
          src="/ad6"
          style={{
            width: "fit-content",
            height: "100px",
            border: "none",
            overflow: "hidden",
          }}
          scrolling="no"
        ></iframe>
      </div>

      <div>
        <Footer refer={props.refer} />
      </div>
    </>
  );
}

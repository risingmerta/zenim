"use client";
import React, { useEffect, useState } from "react";
import "./settings.css";
import { FaCog } from "react-icons/fa";

const Settings = () => {
  const localStorageWrapper = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      return {
        getItem: (key) => localStorage.getItem(key),
        setItem: (key, value) => localStorage.setItem(key, value),
        removeItem: (key) => localStorage.removeItem(key),
        clear: () => localStorage.clear(),
      };
    } else {
      return {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
        clear: () => {},
      };
    }
  };

  const ls = localStorageWrapper();

  // ✅ Safe JSON parse with fallback
  const getInitialState = (key, defaultValue) => {
    const value = ls.getItem(key);
    if (value === null) return defaultValue;

    try {
      return JSON.parse(value);
    } catch {
      // If value is not JSON, fallback to raw value and re-save as JSON
      ls.setItem(key, JSON.stringify(value));
      return value;
    }
  };

  // State
  const [autoNext, setAutoNext] = useState(getInitialState("autoNext", false));
  const [autoPlay, setAutoPlay] = useState(getInitialState("autoPlay", false));
  const [autoSkipIntro, setAutoSkipIntro] = useState(
    getInitialState("autoSkipIntro", false)
  );
  const [enableDub, setEnableDub] = useState(getInitialState("enableDub", false));
  const [playOriginalAudio, setPlayOriginalAudio] = useState(
    getInitialState("playOriginalAudio", false)
  );
  const [language, setLanguage] = useState(getInitialState("language", "english"));
  const [showComments, setShowComments] = useState(
    getInitialState("showComments", false)
  );
  const [publicWatchList, setPublicWatchList] = useState(
    getInitialState("publicWatchList", false)
  );
  const [notificationFolders, setNotificationFolders] = useState(
    getInitialState("notificationFolders", {
      watching: false,
      onHold: false,
      planToWatch: false,
      dropped: false,
      completed: false,
    })
  );
  const [notificationLanguage, setNotificationLanguage] = useState(
    getInitialState("notificationLanguage", "none")
  );

  // Effects to persist settings
  useEffect(() => {
    ls.setItem("autoNext", JSON.stringify(autoNext));
  }, [autoNext]);

  useEffect(() => {
    ls.setItem("autoPlay", JSON.stringify(autoPlay));
  }, [autoPlay]);

  useEffect(() => {
    ls.setItem("autoSkipIntro", JSON.stringify(autoSkipIntro));
  }, [autoSkipIntro]);

  useEffect(() => {
    ls.setItem("enableDub", JSON.stringify(enableDub));
  }, [enableDub]);

  useEffect(() => {
    ls.setItem("playOriginalAudio", JSON.stringify(playOriginalAudio));
  }, [playOriginalAudio]);

  useEffect(() => {
    ls.setItem("language", JSON.stringify(language));
  }, [language]);

  useEffect(() => {
    ls.setItem("showComments", JSON.stringify(showComments));
  }, [showComments]);

  useEffect(() => {
    ls.setItem("publicWatchList", JSON.stringify(publicWatchList));
  }, [publicWatchList]);

  useEffect(() => {
    ls.setItem("notificationFolders", JSON.stringify(notificationFolders));
  }, [notificationFolders]);

  useEffect(() => {
    ls.setItem("notificationLanguage", JSON.stringify(notificationLanguage));
  }, [notificationLanguage]);

  const handleCheckboxChange = (folder) => {
    setNotificationFolders((prev) => ({
      ...prev,
      [folder]: !prev[folder],
    }));
  };

  return (
    <div>
      <div className="settFa">
        <div className="settMidd">
          <div className="settPro">
            <FaCog />
            Settings
          </div>
        </div>
      </div>
      <div className="settings-container">
        <div className="settings">
          {/* Auto Next */}
          <div className="setting-item">
            <div className="setting-label">Auto Next</div>
            <div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={autoNext}
                  onChange={() => setAutoNext(!autoNext)}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>

          {/* Auto Play */}
          <div className="setting-item">
            <div className="setting-label">Auto Play</div>
            <div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={autoPlay}
                  onChange={() => setAutoPlay(!autoPlay)}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>

          {/* Auto Skip Intro */}
          <div className="setting-item">
            <div className="setting-label">Auto Skip Intro</div>
            <div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={autoSkipIntro}
                  onChange={() => setAutoSkipIntro(!autoSkipIntro)}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>

          {/* Enable DUB */}
          <div className="setting-item">
            <div className="setting-label">Enable DUB</div>
            <div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={enableDub}
                  onChange={() => setEnableDub(!enableDub)}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>

          {/* Play Original Audio */}
          <div className="setting-item">
            <div className="setting-label">Play Original Audio</div>
            <div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={playOriginalAudio}
                  onChange={() => setPlayOriginalAudio(!playOriginalAudio)}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
          <div className="setting-description">
            If enabled, the player will play original audio by default.
          </div>

          {/* Language */}
          <div className="setting-item">
            <div className="setting-label">Language for anime name</div>
            <div>
              <select
                className="language-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="english">English</option>
                <option value="japanese">Japanese</option>
              </select>
            </div>
          </div>

          {/* Show Comments */}
          <div className="setting-item">
            <div className="setting-label">Show comments at home</div>
            <div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={showComments}
                  onChange={() => setShowComments(!showComments)}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>

          {/* Public Watch List */}
          <div className="setting-item">
            <div className="setting-label">Public Watch List</div>
            <div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={publicWatchList}
                  onChange={() => setPublicWatchList(!publicWatchList)}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>

          {/* Notification Folders */}
          <div className="setting-item">
            <div className="setting-label">Notification ignore folders</div>
            <div>
              {["watching", "onHold", "planToWatch", "dropped", "completed"].map(
                (folder) => (
                  <label key={folder} className="checkbox-container">
                    {folder.charAt(0).toUpperCase() + folder.slice(1)}
                    <input
                      type="checkbox"
                      checked={notificationFolders[folder]}
                      onChange={() => handleCheckboxChange(folder)}
                    />
                    <span className="checkmark"></span>
                  </label>
                )
              )}
            </div>
          </div>

          {/* Notification Language */}
          <div className="setting-item">
            <div className="setting-label">Notification ignore language</div>
            <div>
              {["none", "sub", "dub"].map((lang) => (
                <label key={lang} className="radio-container">
                  {lang.toUpperCase()}
                  <input
                    type="radio"
                    name="notificationLanguage"
                    value={lang}
                    checked={notificationLanguage === lang}
                    onChange={() => setNotificationLanguage(lang)}
                  />
                  <span className="radio-checkmark"></span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

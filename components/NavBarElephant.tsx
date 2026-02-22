"use client";

import { useState, useEffect } from "react";
import "./NavBarElephant.css";

export default function NavBarElephant() {
  const [hasArrived, setHasArrived] = useState(false);

  useEffect(() => {
    // After walking animation completes (2.5s), show the static logo
    const timer = setTimeout(() => {
      setHasArrived(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // If arrived, don't render the walking elephant
  if (hasArrived) return null;

  return (
    <div className="navbar-elephant-wrapper">
      <div className="navbar-elephant">
        {/* Body */}
        <div className="nav-elephant-body">
          {/* Legs */}
          <div className="nav-leg nav-back-left">
            <div className="nav-foot"></div>
          </div>
          <div className="nav-leg nav-back-right">
            <div className="nav-foot"></div>
          </div>
          
          {/* Torso */}
          <div className="nav-torso">
            {/* Party Hat */}
            <div className="nav-party-hat">
              <div className="nav-hat-cone"></div>
              <div className="nav-hat-pompom"></div>
            </div>
          </div>
          
          {/* Front Legs */}
          <div className="nav-leg nav-front-left">
            <div className="nav-foot"></div>
          </div>
          <div className="nav-leg nav-front-right">
            <div className="nav-foot"></div>
          </div>
        </div>

        {/* Head */}
        <div className="nav-elephant-head">
          {/* Ear */}
          <div className="nav-ear">
            <div className="nav-ear-inner"></div>
          </div>
          
          {/* Face */}
          <div className="nav-face">
            <div className="nav-eye">
              <div className="nav-eyelid"></div>
            </div>
            <div className="nav-cheek"></div>
            <div className="nav-smile"></div>
          </div>
          
          {/* Trunk */}
          <div className="nav-trunk">
            <div className="nav-trunk-segment nav-t1"></div>
            <div className="nav-trunk-segment nav-t2"></div>
            <div className="nav-trunk-segment nav-t3"></div>
            <div className="nav-trunk-tip">
              <div className="nav-magic-stars">
                <span className="nav-star nav-s1">✦</span>
                <span className="nav-star nav-s2">✦</span>
                <span className="nav-star nav-s3">✦</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tail */}
        <div className="nav-tail">
          <div className="nav-tail-tip"></div>
        </div>
      </div>

      {/* Walking dust */}
      <div className="nav-dust-particles">
        <span className="nav-dust nav-d1"></span>
        <span className="nav-dust nav-d2"></span>
      </div>
    </div>
  );
}

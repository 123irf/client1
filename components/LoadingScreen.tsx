"use client";

import "./LoadingScreen.css";

interface LoadingScreenProps {
  message?: string;
}

export default function LoadingScreen({ message = "Loading..." }: LoadingScreenProps) {
  return (
    <div className="ls-overlay">
      <div className="ls-track">
        <div className="ls-ground" />

        {/* Running wrapper — translates across the track */}
        <div className="ls-runner">
          <div className="ls-elephant">

            {/* Tail */}
            <div className="ls-tail">
              {/* Hair brush at tip — 5 strands fanning out */}
              <div className="ls-tail-hairs">
                <span /><span /><span /><span /><span />
              </div>
            </div>

            {/* Back legs (rendered behind torso) */}
            <div className="ls-leg ls-bl1"><div className="ls-hoof" /></div>
            <div className="ls-leg ls-bl2"><div className="ls-hoof" /></div>

            {/* Main body */}
            <div className="ls-torso" />

            {/* Front legs (rendered in front of torso) */}
            <div className="ls-leg ls-fl1"><div className="ls-hoof" /></div>
            <div className="ls-leg ls-fl2"><div className="ls-hoof" /></div>

            {/* Head + ear + trunk group */}
            <div className="ls-head-group">
              {/* Ear */}
              <div className="ls-ear">
                <div className="ls-ear-inner" />
              </div>

              {/* Head */}
              <div className="ls-head">
                {/* Party hat */}
                <div className="ls-hat">
                  <div className="ls-hat-cone" />
                  <div className="ls-hat-pom" />
                </div>
                {/* Eye */}
                <div className="ls-eye" />
              </div>

              {/* Trunk */}
              <div className="ls-trunk">
                <div className="ls-trunk-mid" />
                <div className="ls-trunk-tip" />
              </div>
            </div>
          </div>

          {/* Dust puffs behind feet */}
          <div className="ls-dust-wrap">
            <span className="ls-dust ld1" />
            <span className="ls-dust ld2" />
            <span className="ls-dust ld3" />
          </div>
        </div>
      </div>

      {/* Loading label */}
      <div className="ls-label">
        <span className="ls-msg">{message}</span>
        <span className="ls-dots">
          <span /><span /><span />
        </span>
      </div>
    </div>
  );
}

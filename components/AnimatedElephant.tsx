"use client";

import "./AnimatedElephant.css";

interface AnimatedElephantProps {
  className?: string;
}

export default function AnimatedElephant({ className = "" }: AnimatedElephantProps) {
  return (
    <div className={`elephant-container ${className}`}>
      {/* Walking Animation Wrapper */}
      <div className="elephant-wrapper">
        {/* Main Elephant Body */}
        <div className="elephant">
          {/* Body */}
          <div className="elephant-body">
            {/* Back Legs */}
            <div className="leg back-left">
              <div className="foot"></div>
            </div>
            <div className="leg back-right">
              <div className="foot"></div>
            </div>
            
            {/* Main Body Shape */}
            <div className="torso">
              {/* Party Hat */}
              <div className="party-hat">
                <div className="hat-cone"></div>
                <div className="hat-pompom"></div>
              </div>
            </div>
            
            {/* Front Legs */}
            <div className="leg front-left">
              <div className="foot"></div>
            </div>
            <div className="leg front-right">
              <div className="foot"></div>
            </div>
          </div>

          {/* Head */}
          <div className="elephant-head">
            {/* Ear */}
            <div className="ear">
              <div className="ear-inner"></div>
            </div>
            
            {/* Face */}
            <div className="face">
              <div className="eye">
                <div className="eyelid"></div>
              </div>
              <div className="cheek"></div>
              <div className="smile"></div>
            </div>
            
            {/* Trunk */}
            <div className="trunk">
              <div className="trunk-segment t1"></div>
              <div className="trunk-segment t2"></div>
              <div className="trunk-segment t3"></div>
              <div className="trunk-tip">
                {/* Magic stars coming from trunk */}
                <div className="magic-stars">
                  <span className="star s1">✦</span>
                  <span className="star s2">✦</span>
                  <span className="star s3">✦</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tail */}
          <div className="tail">
            <div className="tail-tip"></div>
          </div>
        </div>

        {/* Walking dust particles */}
        <div className="dust-particles">
          <span className="dust d1"></span>
          <span className="dust d2"></span>
          <span className="dust d3"></span>
        </div>
      </div>

      {/* Shadow */}
      <div className="elephant-shadow"></div>
    </div>
  );
}

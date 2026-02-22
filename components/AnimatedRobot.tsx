"use client";

import { FaRobot } from "react-icons/fa";
import "./AnimatedRobot.css";

export default function AnimatedRobot() {
  return (
    <div className="robot-container">
      {/* Main Robot Body */}
      <div className="robot-wrapper">
        {/* Floating Animation Container */}
        <div className="robot-float">
          {/* Robot Head */}
          <div className="robot-head">
            <div className="robot-face">
              <div className="robot-eyes">
                <div className="eye left">
                  <div className="pupil"></div>
                </div>
                <div className="eye right">
                  <div className="pupil"></div>
                </div>
              </div>
              <div className="robot-mouth"></div>
            </div>
            {/* Antenna */}
            <div className="antenna">
              <div className="antenna-stem"></div>
              <div className="antenna-bulb"></div>
            </div>
          </div>

          {/* Robot Body */}
          <div className="robot-body">
            <div className="robot-chest">
              <div className="chest-panel">
                <div className="panel-light"></div>
              </div>
            </div>
            {/* Arms */}
            <div className="arm left">
              <div className="arm-segment">
                <div className="hand"></div>
              </div>
            </div>
            <div className="arm right">
              <div className="arm-segment">
                <div className="hand"></div>
              </div>
            </div>
          </div>

          {/* Robot Message Bubble */}
          <div className="message-bubble">
            <span>Let&apos;s Chat!</span>
            <div className="bubble-tail"></div>
          </div>
        </div>

        {/* Shadow */}
        <div className="robot-shadow"></div>
      </div>

      {/* Decorative Elements */}
      <div className="deco-circles">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </div>
    </div>
  );
}

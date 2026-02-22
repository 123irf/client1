import { FaLightbulb, FaShieldAlt, FaPuzzlePiece, FaSuitcase } from "react-icons/fa";
import "./WhyValue.css";

const cards = [
  {
    icon: FaLightbulb,
    title: "AI-Powered Learning",
    desc: "Smart tools powered by AI to make learning engaging and effective",
  },
  {
    icon: FaShieldAlt,
    title: "Safe & Trusted",
    desc: "Child-safe materials rigorously tested and trusted by parents",
  },
  {
    icon: FaPuzzlePiece,
    title: "Creative & Fun",
    desc: "Interactive solutions that develop creativity, thinking, and problem-solving skills",
  },
  {
    icon: FaSuitcase,
    title: "Perfect for Early Learners",
    desc: "Designed specially for preschool, and early-stage learning",
  },
];

export default function WhyValue() {
  return (
    <section className="why-value">
      <h2 className="why-value-heading">Why Value With</h2>
      <p className="why-value-heading-green">KidZoFi Care:</p>

      <div className="why-value-cards">
        {cards.map((card, i) => (
          <div key={i} className="wv-card">
            <div className="wv-card-icon">
              <card.icon />
            </div>
            <div className="wv-card-title">{card.title}</div>
            <div className="wv-card-desc">{card.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

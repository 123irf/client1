import Link from "next/link";
import Image from "next/image";
import "./AboutHero.css";

export default function AboutHero() {
  return (
    <>
      {/* Hero Banner */}
      <section className="about-hero">
        <div className="about-hero-bg">
          <Image
            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1400&h=600&fit=crop"
            alt="About KidZoFi background"
            fill
            priority
            className="about-hero-bg-image"
          />
          <div className="about-hero-overlay" />
        </div>

        <div className="about-hero-content">
          <div className="about-hero-left">
            <h1 className="about-hero-heading">
              About <span>KidZoFi</span>
            </h1>
            <p className="about-hero-tagline">
              Inspiring intelligent, playful learning for every child.
            </p>
            <p className="about-hero-desc">
              KidZoFi blends AI technology with joyful activities so children learn to
              think, explore, and create with confidence—while parents feel secure and
              supported.
            </p>

            <div className="about-hero-buttons">
              <Link href="/products" className="about-btn-primary">
                Explore Products
              </Link>
              <Link href="#mission" className="about-btn-secondary">
                Meet the Brand
              </Link>
            </div>

            <div className="about-hero-badges">
              <span className="about-badge">
                <strong>3–8yrs+</strong> early learners
              </span>
              <span className="about-badge">
                <strong>AI-guided</strong> smart play journeys
              </span>
              <span className="about-badge">
                <strong>Parent-approved</strong> and educator-tested
              </span>
            </div>
          </div>

          <div className="about-hero-right">
            <Image
              src="https://images.unsplash.com/photo-1588072432836-e10032774350?w=500&h=400&fit=crop"
              alt="Child learning with tablet"
              width={500}
              height={400}
              className="about-hero-image"
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="about-mv-section" id="mission">
        <div className="about-mv-row">
          <div className="about-mv-text">
            <h2 className="about-mv-title">Our Mission</h2>
            <p className="about-mv-desc">
              To create smart learning tools that help children begin their learning
              journey with intelligence, curiosity, and joy. We believe every child
              deserves access to thoughtful, engaging education that sparks a lifelong
              love of learning.
            </p>
          </div>
          <div className="about-mv-image-wrapper">
            <Image
              src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop"
              alt="Kids learning and playing"
              width={600}
              height={400}
              className="about-mv-image"
            />
          </div>
        </div>

        <div className="about-mv-row reverse">
          <div className="about-mv-text">
            <h2 className="about-mv-title">Our Vision</h2>
            <p className="about-mv-desc">
              To become a trusted global brand in next-gen learning by shaping young
              minds through intelligent, technology-driven education. We envision a
              world where every child has the tools to think creatively and grow
              confidently.
            </p>
          </div>
          <div className="about-mv-image-wrapper">
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
              alt="Children learning with technology"
              width={600}
              height={400}
              className="about-mv-image"
            />
          </div>
        </div>
      </section>
    </>
  );
}

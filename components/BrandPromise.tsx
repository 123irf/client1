import "./BrandPromise.css";

export default function BrandPromise() {
  return (
    <section className="brand-promise">
      <h2 className="brand-promise-heading">Our Brand Promise</h2>
      <p className="brand-promise-subtitle">
        At KidZoFi, we promise learning tools that are thoughtful, intelligent,
        and designed to grow with your child—because every child deserves a
        smarter beginning.
      </p>

      <div className="brand-promise-cards">
        {/* Left Card */}
        <div className="bp-card bp-card-left">
          <div className="bp-card-header">
            <div className="bp-card-icon">🛡</div>
            <div>
              <div className="bp-card-title">Thoughtful, Safe, and Smart</div>
              <div className="bp-card-desc">
                Every KidZoFi product is designed with child safety,
                age-appropriate content, and meaningful learning outcomes at its
                core.
              </div>
            </div>
          </div>

          <div className="bp-features">
            <div className="bp-feature">
              <div className="bp-feature-label">For Children</div>
              <div className="bp-feature-text">Joyful, playful learning</div>
            </div>
            <div className="bp-feature">
              <div className="bp-feature-label">For Parents</div>
              <div className="bp-feature-text">Transparent, ad-free tools</div>
            </div>
            <div className="bp-feature">
              <div className="bp-feature-label">For Educators</div>
              <div className="bp-feature-text">Classroom-ready insights</div>
            </div>
            <div className="bp-feature">
              <div className="bp-feature-label">For the Future</div>
              <div className="bp-feature-text">
                Skills for tomorrow&apos;s world
              </div>
            </div>
          </div>
        </div>

        {/* Right Card */}
        <div className="bp-card bp-card-right">
          <div className="bp-card-header">
            <div className="bp-card-icon">💛</div>
            <div>
              <div className="bp-card-title">Trust at Every Step</div>
              <div className="bp-card-desc">
                Built with parents in mind, tested with educators, and loved by
                kids across the world.
              </div>
            </div>
          </div>

          <div className="bp-trust-stats">
            <div className="bp-stat">
              <span className="bp-stat-stars">★★★★★</span>
              <span className="bp-stat-text">4.9/5 average parent rating</span>
            </div>
            <div className="bp-stat">
              <span className="bp-stat-text">10,000+ smarter beginnings</span>
            </div>
          </div>

          <div className="bp-trust-badges">
            <div className="bp-badge">
              <span className="bp-badge-icon">🔒</span>
              Data-safe by design
            </div>
            <div className="bp-badge">
              <span className="bp-badge-icon">✅</span>
              Kid-first experiences
            </div>
            <div className="bp-badge">
              <span className="bp-badge-icon">⭐</span>
              Curated by educators
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

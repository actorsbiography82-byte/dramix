"use client";

import React from "react";
import styles from "./HeroBanner.module.css";

export default function HeroBanner() {
  const handleWatchClick = () => {
    // In a real app, this would scroll to the episodes grid or open the video player
    console.log("Watching Episode 1");
    const gridElement = document.querySelector('[class*="grid"]');
    if (gridElement) {
      gridElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleWatchlistClick = () => {
    console.log("Added to watchlist");
  };

  return (
    <section className={styles.heroContainer}>
      <div className={styles.content}>
        {/* Rating and Release Year */}
        <div className={styles.metaInfo}>
          <span className={styles.ratingBadge}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginRight: "2px", transform: "translateY(-1px)" }}
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            8.9 / 10
          </span>
          <span className={styles.year}>2026</span>
        </div>

        {/* Cinematic Title */}
        <h2 className={styles.title}>KURULUS OSMAN - SEASON 6</h2>

        {/* Genre Badges */}
        <div className={styles.genres}>
          <span className={`${styles.genreTag} ${styles.genreTagHighlight}`}>Action</span>
          <span className={styles.genreTag}>Drama</span>
          <span className={styles.genreTag}>Historical</span>
        </div>

        {/* Two Line Synopsis */}
        <p className={styles.synopsis}>
          The epic journey continues as Osman Bey fights to establish a sovereign state,
          facing internal betrayals and external empires. Experience the breath-taking
          battles and tactical genius in the latest season.
        </p>

        {/* Call to Action Buttons */}
        <div className={styles.ctaButtons}>
          <button className={styles.primaryButton} onClick={handleWatchClick}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="6 3 20 12 6 21 6 3" />
            </svg>
            Watch Episode 1
          </button>
          <button className={styles.secondaryButton} onClick={handleWatchlistClick}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add to Watchlist
          </button>
        </div>
      </div>
    </section>
  );
}

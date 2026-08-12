"use client";

import React from "react";
import Link from "next/link";
import styles from "./TrendingSlider.module.css";

interface SeriesItem {
  id: number;
  rank: string;
  title: string;
  rating: string;
  episodes: string;
  poster: string;
}

const seriesData: SeriesItem[] = [
  {
    id: 1,
    rank: "#1",
    title: "Dirilis Ertugrul",
    rating: "9.5",
    episodes: "150 EPS",
    poster: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 2,
    rank: "#2",
    title: "Kurulus Osman",
    rating: "9.2",
    episodes: "120 EPS",
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 3,
    rank: "#3",
    title: "Alparslan: Buyuk Selcuklu",
    rating: "9.1",
    episodes: "95 EPS",
    poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 4,
    rank: "#4",
    title: "Destan",
    rating: "8.9",
    episodes: "80 EPS",
    poster: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 5,
    rank: "#5",
    title: "Barbaroslar: Akdeniz'in Kilici",
    rating: "8.7",
    episodes: "60 EPS",
    poster: "https://images.unsplash.com/photo-1478720143022-385f704d3b73?q=80&w=600&auto=format&fit=crop"
  }
];

export default function TrendingSlider() {
  const handleCardClick = (title: string) => {
    console.log(`Selected series: ${title}`);
  };

  return (
    <section className={styles.sliderSection}>
      {/* Section Header */}
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <div className={styles.accentLine} />
          <h3 className={styles.title}>Top Rated Series</h3>
        </div>
        <Link href="/trending" className={styles.seeAll}>
          See All &rarr;
        </Link>
      </div>

      {/* Horizontal Scroll Row */}
      <div className={styles.cardsRow}>
        {seriesData.map((series) => (
          <div
            key={series.id}
            className={styles.cardWrapper}
            onClick={() => handleCardClick(series.title)}
          >
            {/* Card Poster with overlay and Rank Number */}
            <div className={styles.posterContainer}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={series.poster}
                alt={series.title}
                className={styles.posterImage}
                loading="lazy"
              />
              <div className={styles.posterOverlay} />
              <span className={styles.rankNumber}>{series.rank}</span>
            </div>

            {/* Title & Stats */}
            <div className={styles.cardInfo}>
              <h4 className={styles.cardTitle}>{series.title}</h4>
              <div className={styles.metaRow}>
                <div className={styles.rating}>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{ transform: "translateY(-1px)" }}
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <span>{series.rating}</span>
                </div>
                <span className={styles.episodes}>{series.episodes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

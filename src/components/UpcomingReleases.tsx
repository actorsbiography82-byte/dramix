"use client";

import React, { useState } from "react";
import styles from "./UpcomingReleases.module.css";

interface UpcomingItem {
  id: number;
  badge: string;
  title: string;
  description: string;
  date: string;
  poster: string;
}

const upcomingData: UpcomingItem[] = [
  {
    id: 1,
    badge: "Releasing Tonight 8:00 PM",
    title: "Rise of Empires: Ottoman - Season 3",
    description: "Mehmed the Conqueror launches an epic campaign to secure his throne against internal factions and external threats.",
    date: "August 13, 2026",
    poster: "https://images.unsplash.com/photo-1510820375313-f9428cb22029?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 2,
    badge: "Coming Friday",
    title: "Saladin: The Conqueror of Jerusalem",
    description: "Follow the legendary leader's quest to unify the Islamic world and recapture the holy city of Jerusalem.",
    date: "August 14, 2026",
    poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 3,
    badge: "Next Week",
    title: "The Shadow Agent: Teskilat - New Season",
    description: "Undercover intelligence officers put their lives on the line to neutralize high-profile threats to national security.",
    date: "August 20, 2026",
    poster: "https://images.unsplash.com/photo-1492446845049-9c50cc313f00?q=80&w=600&auto=format&fit=crop"
  }
];

export default function UpcomingReleases() {
  const [remindedIds, setRemindedIds] = useState<number[]>([]);

  const toggleReminder = (id: number, title: string) => {
    if (remindedIds.includes(id)) {
      setRemindedIds((prev) => prev.filter((item) => item !== id));
      console.log(`Reminder cancelled for: ${title}`);
    } else {
      setRemindedIds((prev) => [...prev, id]);
      console.log(`Reminder set for: ${title}`);
    }
  };

  return (
    <section className={styles.upcomingSection}>
      {/* Section Header */}
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <svg
            className={styles.bellIcon}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
          <h3 className={styles.title}>Coming Soon</h3>
        </div>
        <p className={styles.subtitle}>Get notified for upcoming episodes</p>
      </div>

      {/* Cards Stack */}
      <div className={styles.cardsStack}>
        {upcomingData.map((item) => {
          const isReminded = remindedIds.includes(item.id);
          return (
            <div key={item.id} className={styles.card}>
              {/* Teaser Image with Badge */}
              <div className={styles.imageWrapper}>
                <span className={styles.badge}>{item.badge}</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.poster}
                  alt={item.title}
                  className={styles.image}
                  loading="lazy"
                />
              </div>

              {/* Drama Details Content */}
              <div className={styles.details}>
                <h4 className={styles.cardTitle}>{item.title}</h4>
                <p className={styles.description}>{item.description}</p>
                <div className={styles.metaRow}>
                  <div className={styles.releaseDate}>
                    Expected Release: <span>{item.date}</span>
                  </div>
                  <button
                    className={`${styles.remindButton} ${isReminded ? styles.reminded : ""}`}
                    onClick={() => toggleReminder(item.id, item.title)}
                    aria-label={`Toggle reminder for ${item.title}`}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                    </svg>
                    {isReminded ? "Reminded" : "Remind Me"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

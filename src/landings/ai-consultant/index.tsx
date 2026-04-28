"use client";

import React, { useState, useEffect } from "react";
import { Page } from "@/containers/Page";
import styles from "./ai-consultant.module.scss";
import { aiService, AIAnalysis } from "@/services/aiService";

export function AIConsultantPage() {
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalysis = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await aiService.getAnalysis();
      setAnalysis(data);
    } catch (err) {
      console.error("Failed to fetch AI analysis:", err);
      setError("Failed to load AI analysis. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalysis();
  }, []);

  return (
    <Page>
      <div className={styles.page}>
        <header className={styles.header}>
          <h1>AI Consultant</h1>
          <p>Personalized insights based on your nutrition and workout plans</p>
        </header>

        {isLoading ? (
          <div className={styles.loading}>
            <div className={styles.aiBrain}>🧠</div>
            <p>GigaChat is analyzing your lifestyle...</p>
            <div className={styles.loadingBar}>
              <div className={styles.loadingProgress}></div>
            </div>
          </div>
        ) : error ? (
          <div className={styles.error}>
            <p>{error}</p>
            <button className={styles.refreshButton} onClick={fetchAnalysis}>
              Try Again
            </button>
          </div>
        ) : analysis ? (
          <div className={styles.content}>
            <div className={styles.mainCard}>
              <section className={styles.summarySection}>
                <h2>Summary</h2>
                <p>{analysis.summary}</p>
              </section>

              <section className={styles.analysisSection}>
                <h3>Detailed Analysis</h3>
                <div className={styles.text}>{analysis.detailed_analysis}</div>
              </section>

              <button className={styles.refreshButton} onClick={fetchAnalysis} disabled={isLoading}>
                Refresh Analysis
              </button>
            </div>

            <aside className={styles.sidebar}>
              <div className={styles.statusCard}>
                <div className={styles.label}>Current Status</div>
                <div className={styles.value}>{analysis.status}</div>
              </div>

              <div className={styles.recommendationsCard}>
                <h3>AI Recommendations</h3>
                <ul>
                  {analysis.recommendations.map((rec, idx) => (
                    <li key={idx}>{rec}</li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        ) : null}
      </div>
    </Page>
  );
}

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
      setError("Не удалось загрузить анализ ИИ. Пожалуйста, попробуйте позже.");
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
          <h1>ИИ-консультант</h1>
          <p>Персональные рекомендации на основе ваших планов питания и тренировок</p>
        </header>

        {isLoading ? (
          <div className={styles.loading}>
            <div className={styles.aiBrain}>🧠</div>
            <p>GigaChat анализирует ваш образ жизни...</p>
            <div className={styles.loadingBar}>
              <div className={styles.loadingProgress}></div>
            </div>
          </div>
        ) : error ? (
          <div className={styles.error}>
            <p>{error}</p>
            <button className={styles.refreshButton} onClick={fetchAnalysis}>
              Попробовать снова
            </button>
          </div>
        ) : analysis ? (
          <div className={styles.content}>
            <div className={styles.mainCard}>
              <section className={styles.summarySection}>
                <h2>Резюме</h2>
                <p>{analysis.summary}</p>
              </section>

              <section className={styles.analysisSection}>
                <h3>Подробный анализ</h3>
                <div className={styles.text}>{analysis.detailed_analysis}</div>
              </section>

              <button className={styles.refreshButton} onClick={fetchAnalysis} disabled={isLoading}>
                Обновить анализ
              </button>
            </div>

            <aside className={styles.sidebar}>
              <div className={styles.statusCard}>
                <div className={styles.label}>Текущий статус</div>
                <div className={styles.value}>{analysis.status}</div>
              </div>

              <div className={styles.recommendationsCard}>
                <h3>Рекомендации ИИ</h3>
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

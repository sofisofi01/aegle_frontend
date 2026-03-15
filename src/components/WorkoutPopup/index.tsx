// src/components/WorkoutPopup/index.tsx
'use client';

import { useState } from 'react';
import styles from './WorkoutPopup.module.scss';
import { data } from './const';

interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
}

export function Popup({ isOpen, onClose }: PopupProps) {
    const [expandedSectionIds, setExpandedSectionIds] = useState<number[]>([]);

    const toggleSection = (id: number) => {
        setExpandedSectionIds(prev => 
            prev.includes(id) 
                ? prev.filter(sectionId => sectionId !== id)
                : [...prev, id]
        );
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
                <button 
                    onClick={onClose}
                    className={styles.closeButton}
                >
                    ×
                </button>
                
                <div className={styles.content}>                    
                    <div className={styles.firstSection}>
                        <h3 className={styles.firstSectionTitle}>
                            {data[0].title}
                        </h3>
                        <div className={styles.firstSectionContent}>
                            {data[0].text.split('\n\n').map((paragraph, index) => (
                                <p key={index} className={styles.paragraph}>
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>
                    
                    <div className={styles.sectionsList}>
                        {data.slice(1).map((section) => {
                            const isSectionOpen = expandedSectionIds.includes(section.id);

                            return (
                                <div key={section.id} className={styles.section}>
                                    <div 
                                        className={styles.sectionHeader}
                                        onClick={() => toggleSection(section.id)}
                                    >
                                        <h3 className={styles.sectionTitle}>
                                            {section.title}
                                        </h3>
                                        
                                        <svg 
                                            className={`${styles.arrowIcon} ${!isSectionOpen ? styles.isRotated : ''}`}
                                            width="17" 
                                            height="10" 
                                            viewBox="0 0 17 10" 
                                            fill="none" 
                                            xmlns="www.w3.org"
                                        >
                                            <path 
                                                d="M-0.000859508 1.62762L1.60914 0.000116243L8.20664 6.66762L14.8041 0.00011682L16.4141 1.62762L8.20664 9.85262L-0.000859508 1.62762Z" 
                                                fill="#5D6C58" 
                                            />
                                        </svg>

                                    </div>
                                    
                                    {isSectionOpen && (
                                        <div className={styles.sectionContent}>
                                            {section.text.split('\n\n').map((paragraph, index) => (
                                                <p key={index} className={styles.paragraph}>
                                                    {paragraph}
                                                </p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

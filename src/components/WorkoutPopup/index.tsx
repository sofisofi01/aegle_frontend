'use client';

import { useState } from 'react';
import styles from './WorkoutPopup.module.scss';
import { data } from './const';

interface PopupProps {
    isOpen: boolean;
    onClose: () => void;   
}

export function Popup({ isOpen, onClose }: PopupProps) {
    const [expandedSectionId, setExpandedSectionId] = useState<number | null>(null);

    const toggleSection = (id: number) => {
        setExpandedSectionId(expandedSectionId === id ? null : id);
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
                    <h2 className={styles.mainTitle}>Training Guidelines</h2>
                    
                    <div className={styles.sectionsList}>
                        {data.map((section) => (
                            <div key={section.id} className={styles.section}>
                                <div 
                                    className={styles.sectionHeader}
                                    onClick={() => toggleSection(section.id)}
                                >
                                    <h3 className={styles.sectionTitle}>
                                        {section.title}
                                    </h3>
                                    <span className={styles.arrow}>
                                        {expandedSectionId === section.id ? '▼' : '▶'}
                                    </span>
                                </div>
                                
                                {expandedSectionId === section.id && (
                                    <div className={styles.sectionContent}>
                                        {section.text.split('\n\n').map((paragraph, index) => (
                                            <p key={index} className={styles.paragraph}>
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
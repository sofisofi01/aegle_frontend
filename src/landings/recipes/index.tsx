'use strict'

import { RecipesProps } from './types'
import { Page } from '@/containers/Page';
// import { data } from './const'; 
import styles from './recipes.module.scss';
import Image from 'next/image';
import searchIcon from './assets/searchIcon.svg';
import plusIcon from './assets/plusIcon.svg';
import { RecipesCard } from '@/components/RecipesCard';

export function RecipesPage({image}: RecipesProps) {
    return (
        <Page>
            <div className={styles.page}>
                <div className={styles.searchBlock}>
                    <div className={styles.headerContainer}>
                        <h1 className={styles.title}>Find your perfect dish <br/> or create it yourself</h1>
                        <div className={styles.searchContainer}>
                            <div className={styles.searchWrapper}>
                                <input
                                    type="text"
                                    placeholder="Search for the recipe..."
                                    className={styles.searchInput}
                                />
                                <button className={styles.searchButton}>
                                    <Image
                                        src={searchIcon}
                                        alt={"Search icon"}
                                        width={20}
                                        height={20}
                                    />
                                </button>
                            </div>
                            <button className={styles.createButton}>
                                <span>create</span>
                                <Image
                                    src={plusIcon}
                                    alt={"Create icon"}
                                    width={20}
                                    height={20}
                                />
                            </button>
                        </div>
                    </div>
                </div>
                <div className={styles.cardContainer}>
                    <RecipesCard/>
                </div>
            </div>
        </Page>
    )
}
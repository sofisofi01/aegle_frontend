import styles from './RecipesCard.module.scss';
import Image, { StaticImageData } from 'next/image';
import recipe from '@/landings/recipes/assets/recipe.jpg';
import { data } from '@/landings/recipes/const';

export function RecipesCard() {
    return (
        <div className={styles.card}>
            <div className={styles.cardChars}>
                <div className={styles.previewContainer}>
                    <div className={styles.imageWrapper}>
                    <Image
                        src={recipe}
                        alt="Recipe"
                        width={150}
                        height={150}
                        className={styles.recipeImage}
                    />
                    </div>
                    
                    <div className={styles.macronutrients}>
                        <h1 className={styles.title}>{data[0].title}</h1>
                        <div>Calories: <span className={styles.value}>{data[0].calories}</span></div>
                        <div>Proteins: <span className={styles.value}>{data[0].proteins}</span></div>
                        <div>Fats: <span className={styles.value}>{data[0].fats}</span></div>
                        <div>Carbohydrates: <span className={styles.value}>{data[0].carbohydrates}</span></div>
                        <div className={styles.perunit}>(Per 100 gramm)</div>
                    </div>
                </div>
                <div className={styles.recipeContainer}>
                    <div className={styles.ingredients}>
                        <div className={styles.ingredientsTitle}>
                            Ingredients
                        </div>
                        <div className={styles.ingredientsList}>{data[0].ingredients}</div>
                    </div>
                    <div className={styles.recipe}>
                        <div className={styles.recipeTitle}>
                            Recipe   
                            <div>{data[0].time}</div>
                        </div>
                        
                        <div className={styles.recipeText}>{data[0].recipe}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
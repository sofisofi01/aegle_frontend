"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "../RecipesFilterSidebar/RecipesFilterSidebar.module.scss";
import minusIcon from "@/landings/recipes/assets/minus.png";
import { availableIngredients as defaultIngredients } from "./const";
import { IngredientsFilterProps } from "./types";

export function IngredientsFilter({
  selectedIngredients,
  onSelectIngredients,
  availableIngredients = defaultIngredients,
}: IngredientsFilterProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredIngredients = availableIngredients.filter((ingredient) =>
    ingredient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddIngredient = (ingredient: string) => {
    if (!selectedIngredients.includes(ingredient)) {
      onSelectIngredients([...selectedIngredients, ingredient]);
    }
    setIsDropdownOpen(false);
    setSearchTerm("");
  };

  const handleRemoveIngredient = (ingredient: string) => {
    onSelectIngredients(selectedIngredients.filter((i) => i !== ingredient));
  };

  return (
    <div className={styles.filterGroup}>
      <h3>Ingredients</h3>

      <div className={styles.selectedIngredients}>
        {selectedIngredients.map((ingredient) => (
          <div key={ingredient} className={styles.ingredientItem}>
            <span>{ingredient}</span>
            <button
              className={styles.removeButton}
              onClick={() => handleRemoveIngredient(ingredient)}
            >
              <Image src={minusIcon} alt="minus" height={20} width={20} />
            </button>
          </div>
        ))}
      </div>

      <div className={styles.addButtonWrapper}>
        <button className={styles.addButton} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          Add...
        </button>

        {isDropdownOpen && (
          <div className={styles.dropdown}>
            <div className={styles.searchWrapper}>
              <input
                type="text"
                placeholder="Search ingredients..."
                className={styles.searchInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
            </div>

            <div className={styles.dropdownList}>
              {filteredIngredients.length > 0 ? (
                filteredIngredients.map((ingredient) => (
                  <div
                    key={ingredient}
                    className={styles.dropdownItem}
                    onClick={() => handleAddIngredient(ingredient)}
                  >
                    {ingredient}
                  </div>
                ))
              ) : (
                <div className={styles.noResults}>No ingredients found</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

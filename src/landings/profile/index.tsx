"use client";
import { Page } from "@/containers/Page";
import styles from "./profile.module.scss";
import Image from "next/image";
import { useState } from "react";
import caloriesIcon from "./assets/calories.svg";
import workoutIcon from "./assets/workout.svg";
import timeIcon from "./assets/time.svg";
import stepsIcon from "./assets/steps.svg";
import decorProfile from "./assets/decor-profile.png";
import decorGoals from "./assets/decor-goals.png";
import food1 from "./assets/food 1.png";
import food2 from "./assets/food 2.png";

import { profileData, goalsData, mealsData, workoutsData } from "./const";

export function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"meals" | "workouts" | "analytics">("meals");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileInfo, setProfileInfo] = useState({
    email: profileData.email,
    sex: profileData.sex,
    age: String(profileData.age),
    height: String(profileData.height),
    weight: String(profileData.weight),
  });
  const [emailError, setEmailError] = useState("");
  const [isEditingGoals, setIsEditingGoals] = useState(false);
  const [goalsInfo, setGoalsInfo] = useState({
    dailyCalories: String(goalsData.dailyCalories),
    workoutSessions: String(goalsData.workoutSessions),
    workoutMinutes: String(goalsData.workoutMinutes),
    stepsPerDay: String(goalsData.stepsPerDay),
  });

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleProfileEditToggle = () => {
    if (isEditingProfile) {
      if (!isValidEmail(profileInfo.email)) {
        setEmailError("Invalid email format");
        return;
      }
      setEmailError("");
    }
    setIsEditingProfile((prev) => !prev);
  };

  const handleProfileFieldChange = (
    field: "email" | "sex" | "age" | "height" | "weight",
    value: string
  ) => {
    if (field === "email") {
      setEmailError("");
    }
    setProfileInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleGoalsEditToggle = () => {
    setIsEditingGoals((prev) => !prev);
  };

  const handleGoalsFieldChange = (
    field: "dailyCalories" | "workoutSessions" | "workoutMinutes" | "stepsPerDay",
    value: string
  ) => {
    setGoalsInfo((prev) => ({ ...prev, [field]: value }));
  };

  const [openMeal, setOpenMeal] = useState<string | null>(null);
  const [openWorkout, setOpenWorkout] = useState<string | null>(null);
  return (
    <Page>
      <div className={styles.profilePage}>
        <div className={styles.profileLeft}>
          <Image
            src={profileData.avatar}
            alt="Avatar"
            className={styles.avatar}
            width={150}
            height={150}
          />

          <h1 className={styles.name}>{profileData.name}</h1>

          <div className={styles.memberInfo}>
            <p>Member since: {profileData.memberSince}</p>
            <p>Your current level: {profileData.level}</p>
            <p>Streak: {profileData.strikeDays} days</p>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.content}>
              {isEditingProfile ? (
                <>
                  <label className={styles.profileField}>
                    <span>Email</span>
                    <input
                      className={styles.profileInput}
                      type="email"
                      value={profileInfo.email}
                      onChange={(e) => handleProfileFieldChange("email", e.target.value)}
                    />
                    {emailError && <span className={styles.profileError}>{emailError}</span>}
                  </label>
                  <label className={styles.profileField}>
                    <span>Sex</span>
                    <select
                      className={styles.profileInput}
                      value={profileInfo.sex}
                      onChange={(e) => handleProfileFieldChange("sex", e.target.value)}
                    >
                      <option value="male">male</option>
                      <option value="female">female</option>
                    </select>
                  </label>
                  <label className={styles.profileField}>
                    <span>Age</span>
                    <input
                      className={styles.profileInput}
                      type="number"
                      min="0"
                      value={profileInfo.age}
                      onChange={(e) => handleProfileFieldChange("age", e.target.value)}
                    />
                  </label>
                  <label className={styles.profileField}>
                    <span>Height</span>
                    <input
                      className={styles.profileInput}
                      type="number"
                      min="0"
                      value={profileInfo.height}
                      onChange={(e) => handleProfileFieldChange("height", e.target.value)}
                    />
                  </label>
                  <label className={styles.profileField}>
                    <span>Weight</span>
                    <input
                      className={styles.profileInput}
                      type="number"
                      min="0"
                      value={profileInfo.weight}
                      onChange={(e) => handleProfileFieldChange("weight", e.target.value)}
                    />
                  </label>
                </>
              ) : (
                <>
                  <p>{profileInfo.email}</p>
                  <p>
                    {profileInfo.sex}, {profileInfo.age} y.o
                  </p>
                  <p>{profileInfo.height} cm</p>
                  <p>{profileInfo.weight} kg</p>
                </>
              )}

              <button
                type="button"
                className={styles.editProfile}
                onClick={handleProfileEditToggle}
              >
                {isEditingProfile ? "Save profile" : "Edit profile"}
              </button>
            </div>
            <Image
              src={decorProfile}
              alt=""
              className={styles.cardImage}
              width={120}
              height={120}
            />
          </div>
        </div>

        <div className={styles.profileRight}>
          <h2>Your goals are...</h2>

          <div className={styles.goalsCard}>
            <div className={styles.content}>
              <div className={styles.goalRow}>
                <div className={styles.left}>
                  <Image src={caloriesIcon} alt="" width={30} height={30} />
                  <span className={styles.label}>Daily calories:</span>
                </div>
                {isEditingGoals ? (
                  <input
                    className={styles.profileInput}
                    type="number"
                    min="0"
                    value={goalsInfo.dailyCalories}
                    onChange={(e) => handleGoalsFieldChange("dailyCalories", e.target.value)}
                  />
                ) : (
                  <span>
                    <span className={styles.value}>{goalsInfo.dailyCalories}</span> kcal
                  </span>
                )}
              </div>

              <div className={styles.goalRow}>
                <div className={styles.left}>
                  <Image src={workoutIcon} alt="" width={30} height={30} />
                  <span className={styles.label}>Workout:</span>
                </div>
                {isEditingGoals ? (
                  <input
                    className={styles.profileInput}
                    type="number"
                    min="0"
                    value={goalsInfo.workoutSessions}
                    onChange={(e) => handleGoalsFieldChange("workoutSessions", e.target.value)}
                  />
                ) : (
                  <span>
                    <span className={styles.value}>{goalsInfo.workoutSessions}</span> sessions/week
                  </span>
                )}
              </div>

              <div className={styles.goalRow}>
                <div className={styles.left}>
                  <Image src={timeIcon} alt="" width={30} height={30} />
                  <span className={styles.label}>Workout time:</span>
                </div>
                {isEditingGoals ? (
                  <input
                    className={styles.profileInput}
                    type="number"
                    min="0"
                    value={goalsInfo.workoutMinutes}
                    onChange={(e) => handleGoalsFieldChange("workoutMinutes", e.target.value)}
                  />
                ) : (
                  <span>
                    <span className={styles.value}>{goalsInfo.workoutMinutes}</span> min/week
                  </span>
                )}
              </div>

              <div className={styles.goalRow}>
                <div className={styles.left}>
                  <Image src={stepsIcon} alt="" width={30} height={30} />
                  <span className={styles.label}>Steps:</span>
                </div>
                {isEditingGoals ? (
                  <input
                    className={styles.profileInput}
                    type="number"
                    min="0"
                    value={goalsInfo.stepsPerDay}
                    onChange={(e) => handleGoalsFieldChange("stepsPerDay", e.target.value)}
                  />
                ) : (
                  <span>
                    <span className={styles.value}>{goalsInfo.stepsPerDay}</span> steps/day
                  </span>
                )}
              </div>

              <button type="button" className={styles.editGoals} onClick={handleGoalsEditToggle}>
                {isEditingGoals ? "Save goals" : "Edit goals"}
              </button>
            </div>

            <Image src={decorGoals} alt="" className={styles.cardImage} width={140} height={140} />
          </div>
        </div>
      </div>

      <div className={styles.activityWrapper}>
        <div className={styles.activitySection}>
          <h2 className={styles.activityTitle}>ACTIVITY OVERVIEW</h2>
          <p className={styles.activitySubtitle}>Your weekly summary!</p>

          <div className={styles.tabs}>
            <div
              className={`${styles.tab} ${activeTab === "meals" ? styles.active : ""}`}
              onClick={() => setActiveTab("meals")}
            >
              Meals
            </div>

            <div
              className={`${styles.tab} ${activeTab === "workouts" ? styles.active : ""}`}
              onClick={() => setActiveTab("workouts")}
            >
              Workouts
            </div>

            <div
              className={`${styles.tab} ${activeTab === "analytics" ? styles.active : ""}`}
              onClick={() => setActiveTab("analytics")}
            >
              Analytics
            </div>

            <div className={`${styles.activeBg} ${styles[activeTab]}`} />
          </div>
        </div>
      </div>
      <div className={styles.activityContentWrapper}>
        <div className={styles.activityContent}>
          {activeTab === "meals" && (
            <div className={styles.mealsContentWrapper}>
              <div className={styles.mealsContent} id="mealsScroll">
                {mealsData.map((dayData) => (
                  <div key={dayData.day} className={styles.dayColumn}>
                    <h3 className={styles.dayTitle}>{dayData.day}</h3>
                    <ul className={styles.macrosList}>
                      {Object.entries(dayData.macros).map(([k, v]) => {
                        const units: Record<string, string> = {
                          calories: "",
                          carbs: "g",
                          protein: "g",
                          fats: "g",
                        };
                        const displayName = k.charAt(0).toUpperCase() + k.slice(1);
                        const unit = units[k as keyof typeof units] || "";
                        return (
                          <li key={k} className={styles.macroRow}>
                            <span className={styles.macroName}>
                              ✦ {displayName}
                              {unit ? ` (${unit})` : ""}:
                            </span>
                            <span className={styles.macroValue}>{v}</span>
                          </li>
                        );
                      })}
                    </ul>
                    <p className={styles.totalMeals}>
                      <strong>{dayData.totalMeals}</strong> meals logged
                    </p>
                    <div className={styles.mealsList}>
                      {dayData.meals.map((meal, idx) => {
                        const id = `${dayData.day}-${idx}`;

                        return (
                          <div key={id} className={styles.mealCard}>
                            <div
                              className={`${styles.mealImageWrapper} ${
                                openMeal === id ? styles.activeMeal : ""
                              }`}
                            >
                              <Image
                                src={meal.image.src}
                                alt={meal.name}
                                width={200}
                                height={200}
                                className={styles.mealImg}
                                onClick={() => setOpenMeal(openMeal === id ? null : id)}
                              />

                              <div className={styles.mealLabel}>{meal.name}</div>
                            </div>

                            <div
                              className={`${styles.mealInfo} ${
                                openMeal === id ? styles.mealInfoOpen : ""
                              }`}
                            >
                              <p>{meal.kcal}</p>
                              <p>Carbs {meal.carbs}g</p>
                              <p>Protein {meal.protein}g</p>
                              <p>Fat {meal.fat}g</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <button
                className={styles.scrollBtn}
                onClick={() => {
                  const container = document.getElementById("mealsScroll");
                  if (container) {
                    container.scrollBy({ left: 250, behavior: "smooth" });
                  }
                }}
              >
                →
              </button>
            </div>
          )}

          {activeTab === "workouts" && (
            <div className={styles.workoutsContentWrapper}>
              <div className={styles.workoutsContent} id="workoutsScroll">
                {workoutsData.map((dayData) => (
                  <div key={dayData.day} className={styles.dayColumn}>
                    <h3 className={styles.dayTitle}>{dayData.day}</h3>
                    <ul className={styles.workoutStats}>
                      <li className={styles.statRow}>
                        <span className={styles.statLabel}>✦ Total workouts:</span>
                        <span className={styles.statValue}>{dayData.stats.totalWorkouts}</span>
                      </li>
                      <li className={styles.statRow}>
                        <span className={styles.statLabel}>✦ Total time:</span>
                        <span className={styles.statValue}>{dayData.stats.totalTime}</span>
                      </li>
                      <li className={styles.statRow}>
                        <span className={styles.statLabel}>✦ Kcal burned:</span>
                        <span className={styles.statValue}>{dayData.stats.caloriesBurned}</span>
                      </li>
                      <li className={styles.statRow}>
                        <span className={styles.statLabel}>✦ Steps:</span>
                        <span className={styles.statValue}>{dayData.stats.steps}</span>
                      </li>
                    </ul>
                    <p className={styles.totalWorkouts}>
                      <strong>{dayData.totalWorkouts}</strong> workouts logged
                    </p>
                    <div className={styles.workoutsList}>
                      {dayData.workouts.map((workout, idx) => {
                        const id = `${dayData.day}-${idx}`;

                        return (
                          <div key={id} className={styles.workoutCard}>
                            <div
                              className={`${styles.workoutImageWrapper} ${
                                openWorkout === id ? styles.activeWorkout : ""
                              }`}
                            >
                              <Image
                                src={workout.image.src}
                                alt={workout.name}
                                width={200}
                                height={200}
                                className={styles.workoutImg}
                                onClick={() => setOpenWorkout(openWorkout === id ? null : id)}
                              />

                              <div className={styles.workoutLabel}>{workout.name}</div>
                            </div>

                            <div
                              className={`${styles.workoutInfo} ${
                                openWorkout === id ? styles.workoutInfoOpen : ""
                              }`}
                            >
                              <p>{workout.type}</p>
                              <p>Duration: {workout.duration} minutes</p>
                              <p>Calories: {workout.calories}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <button
                className={styles.scrollBtn}
                onClick={() => {
                  const container = document.getElementById("workoutsScroll");
                  if (container) {
                    container.scrollBy({ left: 250, behavior: "smooth" });
                  }
                }}
              >
                →
              </button>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className={styles.analyticsContent}>
              <Image
                src={food1}
                alt="Food decor left"
                className={styles.analyticsSideImageLeft}
                width={220}
                height={260}
              />

              <div className={styles.analyticsInner}>
                <div className={styles.analyticsBlock}>
                  <h3 className={styles.analyticsTitle}>Meals</h3>
                  <div className={styles.analyticsText}>
                    <div>Your calorie intake over the last 7 days</div>
                    <div>
                      Your <span className={styles.analyticsStrong}>average</span>{" "}
                      <span className={styles.analyticsStrong}>calorie</span> intake was{" "}
                      <span className={styles.analyticsStrong}>1207</span> kcal
                    </div>
                    <div>
                      <span className={styles.analyticsStrong}>45% Carbs</span>: Your main fuel
                      source for workouts and daily activity.
                    </div>
                    <div>
                      <span className={styles.analyticsStrong}>30% Protein</span>: Crucial for
                      muscle repair after your 3 workouts.
                    </div>
                    <div>
                      <span className={styles.analyticsStrong}>25% Fats</span>: Essential for
                      hormone production and vitamin absorption.
                    </div>
                    <div>
                      <span className={styles.analyticsStrong}>This is 33% below your target</span>,
                      putting you in a significant calorie deficit for weight loss.
                    </div>
                  </div>
                </div>

                <div className={styles.analyticsBlock}>
                  <h3 className={styles.analyticsTitle}>Workouts</h3>
                  <div className={styles.analyticsText}>
                    <div>
                      You completed <span className={styles.analyticsStrong}>30 workouts</span>
                      <span className={styles.analyticsStatusOk}>Status: On track ✔</span>
                    </div>
                    <div>
                      You logged <span className={styles.analyticsStrong}>135 active minutes</span>
                      <span className={styles.analyticsStatusBad}>Status: Below target ✘</span>
                    </div>
                    <div>
                      Your <span className={styles.analyticsStrong}>average</span> daily{" "}
                      <span className={styles.analyticsStrong}>step</span> count was{" "}
                      <span className={styles.analyticsStrong}>7800</span>
                    </div>
                  </div>
                </div>

                <div className={styles.analyticsBlock}>
                  <div className={styles.analyticsText}>
                    You were excellent with your diet and workout consistency this week. The main
                    area for improvement is increasing your overall daily activity (like walking) to
                    hit your minute goal. Keep up the great work with your workouts!
                  </div>
                </div>
              </div>

              <Image
                src={food2}
                alt="Food decor right"
                className={styles.analyticsSideImageRight}
                width={220}
                height={260}
              />
            </div>
          )}
        </div>
      </div>
    </Page>
  );
}

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

import { profileData, goalsData, mealsData, workoutsData } from "./const";
import { useAuthStore } from "@/store/useAuthStore";
import { authService } from "@/services/authService";
import { DayMeals, DayWorkouts } from "./types";

export function ProfilePage() {
  const { user, updateUser } = useAuthStore();
  const [activeTab, setActiveTab] = useState<"meals" | "workouts" | "analytics">("meals");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [isEditingGoals, setIsEditingGoals] = useState(false);

  const [profileInfo, setProfileInfo] = useState({
    email: user?.email || profileData.email,
    sex: user?.gender === "M" ? "male" : user?.gender === "F" ? "female" : profileData.sex,
    age: user?.age ? String(user.age) : String(profileData.age),
    height: user?.height ? String(user.height) : String(profileData.height),
    weight: user?.weight ? String(user.weight) : String(profileData.weight),
  });

  const [goalsInfo, setGoalsInfo] = useState({
    dailyCalories: String(goalsData.dailyCalories),
    workoutSessions: String(goalsData.workoutSessions),
    workoutMinutes: String(goalsData.workoutMinutes),
    stepsPerDay: String(goalsData.stepsPerDay),
  });

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setIsLoading(true);
      const updatedUser = await authService.updateProfile(formData);
      updateUser(updatedUser);
    } catch (err) {
      console.error("Failed to upload avatar", err);
    } finally {
      setIsLoading(false);
    }
  };

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleProfileEditToggle = async () => {
    if (isEditingProfile) {
      if (!isValidEmail(profileInfo.email)) {
        setEmailError("Invalid email format");
        return;
      }
      setEmailError("");

      try {
        setIsLoading(true);
        const updateData = {
          email: profileInfo.email,
          gender: profileInfo.sex === "male" ? "M" : "F",
          age: parseInt(profileInfo.age),
          height: parseFloat(profileInfo.height),
          weight: parseFloat(profileInfo.weight),
        };

        const updatedUser = await authService.updateProfile(updateData as Record<string, unknown>);
        updateUser(updatedUser);
        setIsEditingProfile(false);
      } catch (err) {
        console.error("Failed to update profile", err);
        alert("Failed to update profile");
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsEditingProfile(true);
    }
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
            src={user?.avatar || profileData.avatar}
            alt="Avatar"
            className={styles.avatar}
            width={150}
            height={150}
            onClick={() => document.getElementById("avatar-input")?.click()}
            style={{ cursor: "pointer", objectFit: "cover", borderRadius: "50%" }}
          />
          <input
            id="avatar-input"
            type="file"
            hidden
            accept="image/*"
            onChange={handleAvatarChange}
          />

          <h1 className={styles.name}>
            {user ? `${user.first_name} ${user.last_name || ""}` : profileData.name}
          </h1>

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
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : isEditingProfile ? "Save profile" : "Edit profile"}
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

              <button type="button" className={styles.editProfile} onClick={handleGoalsEditToggle}>
                {isEditingGoals ? "Save goals" : "Edit goals"}
              </button>
            </div>
            <Image src={decorGoals} alt="" className={styles.cardImage} width={120} height={120} />
          </div>

          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === "meals" ? styles.active : ""}`}
              onClick={() => setActiveTab("meals")}
            >
              Meals
            </button>
            <button
              className={`${styles.tab} ${activeTab === "workouts" ? styles.active : ""}`}
              onClick={() => setActiveTab("workouts")}
            >
              Workouts
            </button>
            <button
              className={`${styles.tab} ${activeTab === "analytics" ? styles.active : ""}`}
              onClick={() => setActiveTab("analytics")}
            >
              Analytics
            </button>
          </div>

          <div className={styles.tabContent}>
            {activeTab === "meals" && (
              <div className={styles.mealsList}>
                {(mealsData as unknown as DayMeals[]).map((dayData, dayIdx) => (
                  <div key={dayIdx}>
                    {dayData.meals.map((meal, idx) => (
                      <div key={idx} className={styles.mealItem}>
                        <div
                          className={styles.mealHeader}
                          onClick={() => setOpenMeal(openMeal === meal.name ? null : meal.name)}
                        >
                          <div className={styles.mealInfo}>
                            <Image src={meal.image} alt="" width={50} height={50} />
                            <div>
                              <h3>{meal.name}</h3>
                              <p>{meal.kcal} kcal</p>
                            </div>
                          </div>
                          <span className={styles.arrow}>{openMeal === meal.name ? "▲" : "▼"}</span>
                        </div>
                        {openMeal === meal.name && (
                          <div className={styles.mealDetails}>
                            <p>Proteins: {meal.protein}g</p>
                            <p>Fats: {meal.fat}g</p>
                            <p>Carbs: {meal.carbs}g</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {activeTab === "workouts" && (
              <div className={styles.workoutsList}>
                {(workoutsData as unknown as DayWorkouts[]).map((dayData, dayIdx) => (
                  <div key={dayIdx}>
                    {dayData.workouts.map((workout, idx) => (
                      <div key={idx} className={styles.workoutItem}>
                        <div
                          className={styles.workoutHeader}
                          onClick={() =>
                            setOpenWorkout(openWorkout === workout.name ? null : workout.name)
                          }
                        >
                          <div className={styles.workoutInfo}>
                            <div className={styles.workoutIcon}>🏋️</div>
                            <div>
                              <h3>{workout.name}</h3>
                              <p>{workout.duration} min</p>
                            </div>
                          </div>
                          <span className={styles.arrow}>
                            {openWorkout === workout.name ? "▲" : "▼"}
                          </span>
                        </div>
                        {openWorkout === workout.name && (
                          <div className={styles.workoutDetails}>
                            <p>Type: {workout.type}</p>
                            <p>Calories burned: {workout.calories} kcal</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {activeTab === "analytics" && (
              <div className={styles.analyticsPlaceholder}>
                <p>Analytics coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Page>
  );
}

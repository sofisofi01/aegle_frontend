"use client";
import { Page } from "@/containers/Page";
import styles from "./profile.module.scss";
import Image from "next/image";
import { useState, useEffect } from "react";
import caloriesIcon from "./assets/calories.svg";
import stepsIcon from "./assets/steps.svg";
import decorProfile from "./assets/decor-profile.png";
import decorGoals from "./assets/decor-goals.png";
import food1 from "./assets/food 1.png";
import food2 from "./assets/food 2.png";

import { profileData, goalsData, mealsData } from "./const";
import { profileService } from "@/services/profileService";
import { exerciseService, WorkoutPlan } from "@/services/exerciseService";
import workoutDefaultImg from "@/landings/workout/assets/workout.png";

export function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"meals" | "workouts" | "analytics">("meals");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [activePlan, setActivePlan] = useState<WorkoutPlan | null>(null);
  const [profileInfo, setProfileInfo] = useState({
    email: profileData.email,
    sex: profileData.sex,
    age: String(profileData.age),
    height: String(profileData.height),
    weight: String(profileData.weight),
    firstName: "",
    lastName: "",
    avatar: "",
    memberSince: "",
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [emailError, setEmailError] = useState("");
  const [isEditingGoals, setIsEditingGoals] = useState(false);
  const [goalsInfo, setGoalsInfo] = useState({
    dailyCalories: String(goalsData.dailyCalories),
    workoutSessions: String(goalsData.workoutSessions),
    workoutMinutes: String(goalsData.workoutMinutes),
    stepsPerDay: String(goalsData.stepsPerDay),
    targetWeight: String(profileData.weight),
    goal: "maintain",
    activityLevel: "moderate",
  });

  const [openMeal, setOpenMeal] = useState<string | null>(null);
  const [openWorkout, setOpenWorkout] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [user, profile, plan] = await Promise.all([
          profileService.getUser(),
          profileService.getProfile(),
          exerciseService.getActivePlan().catch(() => null),
        ]);

        setActivePlan(plan);
        setProfileInfo({
          email: user.email || profileData.email,
          sex: profile.gender || profileData.sex || "male",
          age: String(profile.age || profileData.age || 0),
          height: String(profile.height || profileData.height || 0),
          weight: String(profile.current_weight || profileData.weight || 0),
          firstName: user.first_name || "",
          lastName: user.last_name || "",
          avatar: user.avatar
            ? user.avatar.startsWith("http")
              ? user.avatar
              : `https://xn--80abcyabjk1czh.xn--p1ai${user.avatar}`
            : (profileData.avatar as unknown as string),
          memberSince: user.created_at
            ? new Date(user.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "Unknown",
        });

        setGoalsInfo((prev) => ({
          ...prev,
          dailyCalories: String(profile.daily_calories || goalsData.dailyCalories || 0),
          targetWeight: String(profile.target_weight || profileData.weight || 0),
          goal: profile.goal || "maintain",
          activityLevel: profile.activity_level || "moderate",
        }));
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
        setError("Failed to load profile data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleProfileEditToggle = async () => {
    if (isEditingProfile) {
      // Валидация
      if (!profileInfo.email.trim()) {
        setEmailError("Email is required");
        return;
      }

      if (!isValidEmail(profileInfo.email)) {
        setEmailError("Invalid email format");
        return;
      }

      if (!profileInfo.age || Number(profileInfo.age) <= 0) {
        setEmailError("Valid age is required");
        return;
      }

      if (!profileInfo.height || Number(profileInfo.height) <= 0) {
        setEmailError("Valid height is required");
        return;
      }

      if (!profileInfo.weight || Number(profileInfo.weight) <= 0) {
        setEmailError("Valid weight is required");
        return;
      }

      setEmailError("");

      try {
        const userFormData = new FormData();
        userFormData.append("email", profileInfo.email);
        if (avatarFile) {
          userFormData.append("avatar", avatarFile);
        }

        const [updatedUser, updatedProfile] = await Promise.all([
          profileService.updateUser(userFormData),
          profileService.updateProfile({
            gender: profileInfo.sex,
            age: Number(profileInfo.age),
            height: Number(profileInfo.height),
            current_weight: Number(profileInfo.weight),
          }),
        ]);

        setProfileInfo((prev) => ({
          ...prev,
          avatar: updatedUser.avatar
            ? updatedUser.avatar.startsWith("http")
              ? updatedUser.avatar
              : `https://xn--80abcyabjk1czh.xn--p1ai${updatedUser.avatar}`
            : prev.avatar,
        }));
        setGoalsInfo((prev) => ({
          ...prev,
          dailyCalories: String(updatedProfile.daily_calories || prev.dailyCalories),
        }));
        setAvatarFile(null);
      } catch (error) {
        console.error("Failed to update profile:", error);
        setEmailError("Failed to update profile. Please try again.");
        return;
      }
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

    // Валидация числовых полей
    if (["age", "height", "weight"].includes(field)) {
      if (value !== "" && (isNaN(Number(value)) || Number(value) < 0)) {
        return; // Не обновляем если значение некорректное
      }
    }

    setProfileInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleGoalsEditToggle = async () => {
    if (isEditingGoals) {
      try {
        const updatedProfile = await profileService.updateProfile({
          target_weight: Number(goalsInfo.targetWeight),
          goal: goalsInfo.goal,
          activity_level: goalsInfo.activityLevel,
        });

        setGoalsInfo((prev) => ({
          ...prev,
          dailyCalories: String(updatedProfile.daily_calories || prev.dailyCalories),
        }));
      } catch (error) {
        console.error("Failed to update goals:", error);
        return;
      }
    }
    setIsEditingGoals((prev) => !prev);
  };

  const handleGoalsFieldChange = (
    field:
      | "dailyCalories"
      | "workoutSessions"
      | "workoutMinutes"
      | "stepsPerDay"
      | "targetWeight"
      | "goal"
      | "activityLevel",
    value: string
  ) => {
    // Валидация числовых полей
    if (
      [
        "dailyCalories",
        "workoutSessions",
        "workoutMinutes",
        "stepsPerDay",
        "targetWeight",
      ].includes(field)
    ) {
      if (value !== "" && (isNaN(Number(value)) || Number(value) < 0)) {
        return;
      }
    }

    setGoalsInfo((prev) => ({ ...prev, [field]: value }));
  };

  // Loading state
  if (isLoading) {
    return (
      <Page>
        <div className={styles.profilePage}>
          <div className={styles.loadingState}>Loading profile...</div>
        </div>
      </Page>
    );
  }

  // Error state
  if (error) {
    return (
      <Page>
        <div className={styles.profilePage}>
          <div className={styles.errorState}>
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        </div>
      </Page>
    );
  }

  return (
    <Page>
      <div className={styles.profilePage}>
        <div className={styles.profileLeft}>
          <div className={styles.avatarWrapper} style={{ position: "relative" }}>
            <Image
              src={profileInfo.avatar || "/default-avatar.png"}
              alt="Avatar"
              className={styles.avatar}
              width={150}
              height={150}
              style={{ objectFit: "cover", borderRadius: "50%" }}
              onError={(e) => {
                // Fallback для битых изображений
                const target = e.target as HTMLImageElement;
                target.src = "/default-avatar.png";
              }}
            />
            {isEditingProfile && (
              <label
                className={styles.avatarUploadLabel}
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  background: "rgba(0,0,0,0.5)",
                  borderRadius: "50%",
                  padding: "5px",
                  cursor: "pointer",
                }}
              >
                📸
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      const file = e.target.files[0];
                      // Проверка размера файла (например, максимум 5MB)
                      if (file.size > 5 * 1024 * 1024) {
                        setEmailError("File size should be less than 5MB");
                        return;
                      }
                      setAvatarFile(file);
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        setProfileInfo((prev) => ({
                          ...prev,
                          avatar: event.target?.result as string,
                        }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
            )}
          </div>

          <h1 className={styles.name}>
            {profileInfo.firstName} {profileInfo.lastName}
          </h1>

          {profileInfo.memberSince && (
            <div className={styles.memberInfo}>
              <p>Member since: {profileInfo.memberSince}</p>
            </div>
          )}

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
                      placeholder="Enter your email"
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
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </label>
                  <label className={styles.profileField}>
                    <span>Age</span>
                    <input
                      className={styles.profileInput}
                      type="number"
                      min="1"
                      max="120"
                      value={profileInfo.age}
                      onChange={(e) => handleProfileFieldChange("age", e.target.value)}
                      placeholder="Enter your age"
                    />
                  </label>
                  <label className={styles.profileField}>
                    <span>Height (cm)</span>
                    <input
                      className={styles.profileInput}
                      type="number"
                      min="0"
                      max="300"
                      value={profileInfo.height}
                      onChange={(e) => handleProfileFieldChange("height", e.target.value)}
                      placeholder="Enter your height"
                    />
                  </label>
                  <label className={styles.profileField}>
                    <span>Weight (kg)</span>
                    <input
                      className={styles.profileInput}
                      type="number"
                      min="0"
                      max="700"
                      value={profileInfo.weight}
                      onChange={(e) => handleProfileFieldChange("weight", e.target.value)}
                      placeholder="Enter your weight"
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
                disabled={isEditingProfile && !!emailError}
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
                <span>
                  <span className={styles.value}>{goalsInfo.dailyCalories}</span> kcal
                </span>
              </div>

              <div className={styles.goalRow}>
                <div className={styles.left}>
                  <Image src={stepsIcon} alt="" width={30} height={30} />
                  <span className={styles.label}>Target weight:</span>
                </div>
                {isEditingGoals ? (
                  <input
                    className={styles.profileInput}
                    type="number"
                    min="0"
                    max="700"
                    value={goalsInfo.targetWeight}
                    onChange={(e) => handleGoalsFieldChange("targetWeight", e.target.value)}
                  />
                ) : (
                  <span>
                    <span className={styles.value}>{goalsInfo.targetWeight}</span> kg
                  </span>
                )}
              </div>

              <div className={styles.goalRow}>
                <div className={styles.left}>
                  <Image src={stepsIcon} alt="" width={30} height={30} />
                  <span className={styles.label}>Goal:</span>
                </div>
                {isEditingGoals ? (
                  <select
                    className={styles.profileInput}
                    value={goalsInfo.goal}
                    onChange={(e) => handleGoalsFieldChange("goal", e.target.value)}
                  >
                    <option value="lose">Lose weight</option>
                    <option value="maintain">Maintain weight</option>
                    <option value="gain">Gain weight</option>
                  </select>
                ) : (
                  <span>
                    <span className={styles.value}>
                      {goalsInfo.goal === "lose"
                        ? "Lose"
                        : goalsInfo.goal === "gain"
                          ? "Gain"
                          : "Maintain"}
                    </span>
                  </span>
                )}
              </div>

              <div className={styles.goalRow}>
                <div className={styles.left}>
                  <Image src={stepsIcon} alt="" width={30} height={30} />
                  <span className={styles.label}>Activity:</span>
                </div>
                {isEditingGoals ? (
                  <select
                    className={styles.profileInput}
                    value={goalsInfo.activityLevel}
                    onChange={(e) => handleGoalsFieldChange("activityLevel", e.target.value)}
                  >
                    <option value="sedentary">Sedentary</option>
                    <option value="light">Lightly active</option>
                    <option value="moderate">Moderately active</option>
                    <option value="very_active">Very active</option>
                  </select>
                ) : (
                  <span>
                    <span className={styles.value}>
                      {goalsInfo.activityLevel === "sedentary"
                        ? "Sedentary"
                        : goalsInfo.activityLevel === "light"
                          ? "Lightly active"
                          : goalsInfo.activityLevel === "moderate"
                            ? "Moderately active"
                            : "Very active"}
                    </span>
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
          {activeTab === "meals" && mealsData && mealsData.length > 0 && (
            <div className={styles.mealsContentWrapper}>
              <div className={styles.mealsContent} id="mealsScroll">
                {mealsData.map((dayData) => (
                  <div key={dayData.day} className={styles.dayColumn}>
                    <h3 className={styles.dayTitle}>{dayData.day}</h3>
                    {dayData.macros && (
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
                    )}
                    {dayData.totalMeals && (
                      <p className={styles.totalMeals}>
                        <strong>{dayData.totalMeals}</strong> meals logged
                      </p>
                    )}
                    {dayData.meals && dayData.meals.length > 0 && (
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
                                {meal.image && (
                                  <Image
                                    src={meal.image.src}
                                    alt={meal.name}
                                    width={200}
                                    height={200}
                                    className={styles.mealImg}
                                    onClick={() => setOpenMeal(openMeal === id ? null : id)}
                                  />
                                )}

                                <div className={styles.mealLabel}>{meal.name}</div>
                              </div>

                              <div
                                className={`${styles.mealInfo} ${
                                  openMeal === id ? styles.mealInfoOpen : ""
                                }`}
                              >
                                {meal.kcal && <p>{meal.kcal}</p>}
                                {meal.carbs && <p>Carbs {meal.carbs}g</p>}
                                {meal.protein && <p>Protein {meal.protein}g</p>}
                                {meal.fat && <p>Fat {meal.fat}g</p>}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
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

          {activeTab === "workouts" && activePlan?.days && activePlan.days.length > 0 && (
            <div className={styles.workoutsContentWrapper}>
              <div className={styles.workoutsContent} id="workoutsScroll">
                {activePlan.days.map((dayData) => {
                  const totalDayCalories = dayData.exercises.reduce(
                    (sum, ex) => sum + Number(ex.total_calories || 0),
                    0
                  );
                  const totalDayTime = dayData.exercises.reduce(
                    (sum, ex) => sum + ex.sets * 2 + (ex.sets * (ex.rest_seconds || 0)) / 60,
                    0
                  );
                  const completedWorkouts = dayData.exercises.filter(
                    (ex) => ex.is_completed
                  ).length;

                  return (
                    <div key={dayData.id} className={styles.dayColumn}>
                      <h3 className={styles.dayTitle}>{dayData.name}</h3>
                      <ul className={styles.workoutStats}>
                        <li className={styles.statRow}>
                          <span className={styles.statLabel}>✦ Completed:</span>
                          <span className={styles.statValue}>
                            {completedWorkouts}/{dayData.exercises.length}
                          </span>
                        </li>
                        <li className={styles.statRow}>
                          <span className={styles.statLabel}>✦ Total time:</span>
                          <span className={styles.statValue}>{totalDayTime.toFixed(0)} min</span>
                        </li>
                        <li className={styles.statRow}>
                          <span className={styles.statLabel}>✦ Kcal burned:</span>
                          <span className={styles.statValue}>{totalDayCalories.toFixed(0)}</span>
                        </li>
                      </ul>
                      <p className={styles.totalWorkouts}>
                        <strong>{dayData.exercises.length}</strong> exercises planned
                      </p>
                      <div className={styles.workoutsList}>
                        {dayData.exercises.map((ex, idx) => {
                          const id = `${dayData.id}-${idx}`;

                          return (
                            <div key={id} className={styles.workoutCard}>
                              <div
                                className={`${styles.workoutImageWrapper} ${
                                  openWorkout === id ? styles.activeWorkout : ""
                                }`}
                              >
                                <Image
                                  src={ex.exercise?.image || workoutDefaultImg}
                                  alt={ex.exercise?.name || "Workout"}
                                  width={200}
                                  height={200}
                                  className={styles.workoutImg}
                                  onClick={() => setOpenWorkout(openWorkout === id ? null : id)}
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src =
                                      typeof workoutDefaultImg === "string"
                                        ? workoutDefaultImg
                                        : workoutDefaultImg.src;
                                  }}
                                />

                                <div className={styles.workoutLabel}>
                                  {ex.exercise?.name || "Exercise"}
                                </div>
                              </div>

                              <div
                                className={`${styles.workoutInfo} ${
                                  openWorkout === id ? styles.workoutInfoOpen : ""
                                }`}
                              >
                                <p>
                                  {ex.reps}x{ex.sets}
                                </p>
                                <p>Calories: {Number(ex.total_calories || 0).toFixed(0)}</p>
                                <p>Status: {ex.is_completed ? "✅ Done" : "⏳ Pending"}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
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

          {activeTab === "workouts" && (!activePlan?.days || activePlan.days.length === 0) && (
            <div className={styles.emptyState}>
              <p>No workout plan assigned yet. Start a workout plan to see your progress!</p>
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

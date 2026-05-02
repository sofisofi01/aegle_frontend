"use client";
import { Page } from "@/containers/Page";
import styles from "./profile.module.scss";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import caloriesIcon from "./assets/calories.svg";
import stepsIcon from "./assets/steps.svg";
import workoutIcon from "./assets/workout.svg";
import goalIcon from "./assets/time.svg";
import decorProfile from "./assets/decor-profile.png";
import decorGoals from "./assets/decor-goals.png";
import food1 from "./assets/food 1.png";
import food2 from "./assets/food 2.png";

import { profileData, goalsData, getYearWord } from "./const";
import { profileService } from "@/services/profileService";
import { exerciseService, WorkoutPlan } from "@/services/exerciseService";
import {
  nutritionService,
  NutritionPlan,
  NutritionDay,
  NutritionEntry,
} from "@/services/nutritionService";
import { progressService, AnalyticsData } from "@/services/progressService";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import workoutDefaultImg from "@/landings/workout/assets/workout.png";
import { useRouter } from "next/navigation";

export function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"meals" | "workouts" | "analytics">("meals");

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [activePlan, setActivePlan] = useState<WorkoutPlan | null>(null);
  const [nutritionPlan, setNutritionPlan] = useState<NutritionPlan | null>(null);
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

  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [weightInput, setWeightInput] = useState({
    weight: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [isSubmittingWeight, setIsSubmittingWeight] = useState(false);

  const calculateEatenCalories = () => {
    if (!nutritionPlan) return 0;

    // Получаем текущий день недели (0 - воскресенье, 1 - понедельник...)
    // В модели обычно 1 - Понедельник, ..., 7 - Воскресенье
    const now = new Date();
    let dayNum = now.getDay();
    if (dayNum === 0) dayNum = 7; // Превращаем воскресенье в 7

    const currentDay = nutritionPlan.days.find((d) => d.day_number === dayNum);
    if (!currentDay) return 0;

    let total = 0;
    currentDay.entries.forEach((entry) => {
      if (entry.is_eaten) {
        total += entry.calories;
      }
    });
    return total;
  };

  const fetchAnalytics = useCallback(async () => {
    try {
      const data = await progressService.getAnalytics();
      setAnalytics(data);

      // Если нет активной цели, но есть целевой вес в профиле, создаем цель
      if (!data.goal_progress && goalsInfo.targetWeight && profileInfo.weight) {
        await progressService.createGoal({
          target_weight: Number(goalsInfo.targetWeight),
          start_weight: Number(profileInfo.weight),
          start_date: new Date().toISOString().split("T")[0],
          target_date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // По умолчанию на 90 дней
          is_active: true,
        });
        // Перезагружаем аналитику, чтобы получить расчеты
        const updatedData = await progressService.getAnalytics();
        setAnalytics(updatedData);
      }
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    }
  }, [goalsInfo.targetWeight, profileInfo.weight]);

  useEffect(() => {
    if (activeTab === "analytics") {
      fetchAnalytics();
    }
  }, [activeTab, fetchAnalytics]);

  const handleWeightSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!weightInput.weight || !weightInput.date) return;

    setIsSubmittingWeight(true);
    try {
      await progressService.addWeightEntry({
        weight: parseFloat(weightInput.weight),
        date: weightInput.date,
      });
      setWeightInput({ ...weightInput, weight: "" });
      fetchAnalytics();
      fetchData(); // Обновить вес в профиле
    } catch (error) {
      console.error("Failed to add weight entry:", error);
    } finally {
      setIsSubmittingWeight(false);
    }
  };

  const fetchData = async () => {
    try {
      const [user, profile, plan, nPlan] = await Promise.all([
        profileService.getUser(),
        profileService.getProfile(),
        exerciseService.getActivePlan().catch(() => null),
        nutritionService.getActivePlan().catch(() => null),
      ]);

      setActivePlan(plan);
      setNutritionPlan(nPlan);
      setProfileInfo({
        email: user.email || profileData.email,
        sex: profile.gender === "M" ? "male" : profile.gender === "F" ? "female" : "male",
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
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleProfileEditToggle = async () => {
    if (isEditingProfile) {
      if (!isValidEmail(profileInfo.email)) {
        setEmailError("Invalid email format");
        return;
      }
      setEmailError("");

      try {
        const userFormData = new FormData();
        userFormData.append("email", profileInfo.email);
        if (avatarFile) {
          userFormData.append("avatar", avatarFile);
        }

        await Promise.all([
          profileService.updateUser(userFormData),
          profileService.updateProfile({
            gender: profileInfo.sex === "male" ? "M" : "F",
            age: Number(profileInfo.age),
            height: Number(profileInfo.height),
            current_weight: Number(profileInfo.weight),
          }),
        ]);
        await fetchData();
        setAvatarFile(null);
      } catch (error) {
        console.error("Failed to update profile:", error);
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
    setProfileInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleGoalsEditToggle = async () => {
    if (isEditingGoals) {
      try {
        await profileService.updateProfile({
          target_weight: Number(goalsInfo.targetWeight),
          goal: goalsInfo.goal,
          activity_level: goalsInfo.activityLevel,
        });
        await fetchData();
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
    setGoalsInfo((prev) => ({ ...prev, [field]: value }));
  };

  const [openMeal, setOpenMeal] = useState<string | null>(null);
  const [openWorkout, setOpenWorkout] = useState<string | null>(null);

  return (
    <Page>
      <div className={styles.profilePage}>
        <div className={styles.profileLeft}>
          <div className={styles.avatarWrapper} style={{ position: "relative" }}>
            <Image
              src={profileInfo.avatar}
              alt="Avatar"
              className={styles.avatar}
              width={150}
              height={150}
              style={{ objectFit: "cover", borderRadius: "50%" }}
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
                      setAvatarFile(e.target.files[0]);
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        setProfileInfo((prev) => ({
                          ...prev,
                          avatar: event.target?.result as string,
                        }));
                      };
                      reader.readAsDataURL(e.target.files[0]);
                    }
                  }}
                />
              </label>
            )}
          </div>

          <h1 className={styles.name}>
            {profileInfo.firstName} {profileInfo.lastName}
          </h1>

          <div className={styles.memberInfo}>
            <p>Участник с: {profileInfo.memberSince}</p>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.content}>
              {isEditingProfile ? (
                <>
                  <label className={styles.profileField}>
                    <span>Почта</span>
                    <input
                      className={styles.profileInput}
                      type="email"
                      value={profileInfo.email}
                      onChange={(e) => handleProfileFieldChange("email", e.target.value)}
                    />
                    {emailError && <span className={styles.profileError}>{emailError}</span>}
                  </label>
                  <label className={styles.profileField}>
                    <span>Пол</span>
                    <select
                      className={styles.profileInput}
                      value={profileInfo.sex}
                      onChange={(e) => handleProfileFieldChange("sex", e.target.value)}
                    >
                      <option value="male">муж.</option>
                      <option value="female">жен.</option>
                    </select>
                  </label>
                  <label className={styles.profileField}>
                    <span>Возраст</span>
                    <input
                      className={styles.profileInput}
                      type="number"
                      min="0"
                      value={profileInfo.age}
                      onChange={(e) => handleProfileFieldChange("age", e.target.value)}
                    />
                  </label>
                  <label className={styles.profileField}>
                    <span>Рост</span>
                    <input
                      className={styles.profileInput}
                      type="number"
                      min="0"
                      value={profileInfo.height}
                      onChange={(e) => handleProfileFieldChange("height", e.target.value)}
                    />
                  </label>
                  <label className={styles.profileField}>
                    <span>Вес</span>
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
                    {profileInfo.sex}, {profileInfo.age} {getYearWord(Number(profileInfo.age))}
                  </p>
                  <p>{profileInfo.height} см</p>
                  <p>{profileInfo.weight} кг</p>
                </>
              )}

              <button
                type="button"
                className={styles.editProfile}
                onClick={handleProfileEditToggle}
              >
                {isEditingProfile ? "Сохранить профиль" : "Редактировать"}
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
          <h2>Ваши цели...</h2>

          <div className={styles.goalsCard}>
            <div className={styles.content}>
              <div className={styles.goalRow}>
                <div className={styles.left}>
                  <Image src={caloriesIcon} alt="" width={30} height={30} />
                  <span className={styles.label}>Дневные калории:</span>
                </div>
                <span>
                  <span className={styles.value}>{goalsInfo.dailyCalories}</span> ккал
                </span>
              </div>

              <div className={styles.goalRow}>
                <div className={styles.left}>
                  <Image src={stepsIcon} alt="" width={30} height={30} />
                  <span className={styles.label}>Целевой вес:</span>
                </div>
                {isEditingGoals ? (
                  <input
                    className={styles.profileInput}
                    type="number"
                    min="0"
                    value={goalsInfo.targetWeight}
                    onChange={(e) => handleGoalsFieldChange("targetWeight", e.target.value)}
                  />
                ) : (
                  <span>
                    <span className={styles.value}>{goalsInfo.targetWeight}</span> кг
                  </span>
                )}
              </div>

              <div className={styles.goalRow}>
                <div className={styles.left}>
                  <Image src={goalIcon} alt="" width={30} height={30} />
                  <span className={styles.label}>Цель:</span>
                </div>
                {isEditingGoals ? (
                  <select
                    className={styles.profileInput}
                    value={goalsInfo.goal}
                    onChange={(e) => handleGoalsFieldChange("goal", e.target.value)}
                  >
                    <option value="lose">Сбросить вес</option>
                    <option value="maintain">Поддерживать вес</option>
                    <option value="gain">Набрать вес</option>
                  </select>
                ) : (
                  <span>
                    <span className={styles.value}>
                      {goalsInfo.goal === "lose"
                        ? "Сбросить вес"
                        : goalsInfo.goal === "maintain"
                        ? "Поддерживать вес"
                        : goalsInfo.goal === "gain"
                        ? "Набрать вес"
                        : goalsInfo.goal}
                    </span>
                  </span>
                )}
              </div>

              <div className={styles.goalRow}>
                <div className={styles.left}>
                  <Image src={workoutIcon} alt="" width={30} height={30} />
                  <span className={styles.label}>Активность:</span>
                </div>
                {isEditingGoals ? (
                  <select
                    className={styles.profileInput}
                    value={goalsInfo.activityLevel}
                    onChange={(e) => handleGoalsFieldChange("activityLevel", e.target.value)}
                  >
                    <option value="sedentary">Сидячий образ жизни</option>
                    <option value="light">Легкая активность</option>
                    <option value="moderate">Умеренная активность</option>
                    <option value="very_active">Высокая активность</option>
                  </select>
                ) : (
                  <span>
                    <span className={styles.value}>
                      {goalsInfo.activityLevel === "sedentary"
                        ? "Сидячий образ жизни"
                        : goalsInfo.activityLevel === "light"
                        ? "Лёгкая активность"
                        : goalsInfo.activityLevel === "moderate"
                        ? "Умеренная активность"
                        : goalsInfo.activityLevel === "very_active"
                        ? "Высокая активность"
                        : goalsInfo.activityLevel}
                    </span>
                  </span>
                )}
              </div>

              <button type="button" className={styles.editGoals} onClick={handleGoalsEditToggle}>
                {isEditingGoals ? "Сохранить цели" : "Редактировать"}
              </button>
            </div>

            <Image src={decorGoals} alt="" className={styles.cardImage} width={140} height={140} />
          </div>
        </div>
      </div>

      <div className={styles.activityWrapper}>
        <div className={styles.activitySection}>
          <h2 className={styles.activityTitle}>ОБЗОР АКТИВНОСТИ</h2>
          <p className={styles.activitySubtitle}>Ваш еженедельный обзор!</p>

          <div className={styles.tabs}>
            <div
              className={`${styles.tab} ${activeTab === "meals" ? styles.active : ""}`}
              onClick={() => setActiveTab("meals")}
            >
              Приёмы пищи
            </div>

            <div
              className={`${styles.tab} ${activeTab === "workouts" ? styles.active : ""}`}
              onClick={() => setActiveTab("workouts")}
            >
              Тренировки
            </div>

            <div
              className={`${styles.tab} ${activeTab === "analytics" ? styles.active : ""}`}
              onClick={() => setActiveTab("analytics")}
            >
              Аналитика
            </div>

            <div className={`${styles.activeBg} ${styles[activeTab]}`} />
          </div>
        </div>
      </div>

      <div className={styles.activityContentWrapper}>
        <div className={styles.activityContent}>
          {activeTab === "meals" && nutritionPlan?.days && (
            <div className={styles.mealsContentWrapper}>
              <div className={styles.mealsContent} id="mealsScroll">
                {nutritionPlan.days.every((d) => d.entries.length === 0) ? (
                  <div className={styles.noDataMessage}>
                    <p>
                      Вы еще не запланировали ни одного приема пищи. Перейдите на страницу Питание, чтобы начать!
                    </p>
                    <button onClick={() => router.push("/nutrition")} className={styles.goToButton}>
                      Перейти к Питанию
                    </button>
                  </div>
                ) : (
                  nutritionPlan.days.map((dayData: NutritionDay) => {
                    const dayNames = [
                      "Понедельник",
                      "Вторник",
                      "Среда",
                      "Четверг",
                      "Пятница",
                      "Суббота",
                      "Воскресенье",
                    ];
                    const displayName = dayNames[dayData.day_number - 1] || dayData.name;
                    const totals = dayData.entries.reduce(
                      (acc, e: NutritionEntry) => ({
                        calories: acc.calories + e.calories,
                        protein: acc.protein + e.protein,
                        carbs: acc.carbs + e.carbs,
                        fat: acc.fat + e.fat,
                      }),
                      { calories: 0, protein: 0, carbs: 0, fat: 0 }
                    );

                    return (
                      <div key={dayData.id} className={styles.dayColumn}>
                        <h3 className={styles.dayTitle}>{displayName}</h3>
                        <ul className={styles.macrosList}>
                          <li className={styles.macroRow}>
                            <span className={styles.macroName}>✦ Калории:</span>
                            <span className={styles.macroValue}>{totals.calories.toFixed(0)}</span>
                          </li>
                          <li className={styles.macroRow}>
                            <span className={styles.macroName}>✦ Белки:</span>
                            <span className={styles.macroValue}>{totals.protein.toFixed(1)}g</span>
                          </li>
                          <li className={styles.macroRow}>
                            <span className={styles.macroName}>✦ Углеводы:</span>
                            <span className={styles.macroValue}>{totals.carbs.toFixed(1)}g</span>
                          </li>
                          <li className={styles.macroRow}>
                            <span className={styles.macroName}>✦ Жиры:</span>
                            <span className={styles.macroValue}>{totals.fat.toFixed(1)}g</span>
                          </li>
                        </ul>
                        <p className={styles.totalMeals}>
                          <strong>{dayData.entries.length}</strong> приемов пищи запланировано
                        </p>
                        <div className={styles.mealsList}>
                          {dayData.entries.map((meal: NutritionEntry, idx: number) => {
                            const id = `meal-${dayData.id}-${idx}`;

                            return (
                              <div key={id} className={styles.mealCard}>
                                <div
                                  className={`${styles.mealImageWrapper} ${
                                    openMeal === id ? styles.activeMeal : ""
                                  }`}
                                >
                                  <Image
                                    src={
                                      meal.image_url
                                        ? meal.image_url.startsWith("http")
                                          ? meal.image_url
                                          : `https://xn--80abcyabjk1czh.xn--p1ai${meal.image_url}`
                                        : workoutDefaultImg
                                    }
                                    alt={meal.food_name}
                                    width={200}
                                    height={200}
                                    className={styles.mealImg}
                                    onClick={() => setOpenMeal(openMeal === id ? null : id)}
                                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                                      const target = e.currentTarget;
                                      target.src =
                                        typeof workoutDefaultImg === "string"
                                          ? workoutDefaultImg
                                          : workoutDefaultImg.src;
                                    }}
                                  />
                                  <div className={styles.mealLabel}>{meal.food_name}</div>
                                </div>

                                <div
                                  className={`${styles.mealInfo} ${
                                    openMeal === id ? styles.mealInfoOpen : ""
                                  }`}
                                >
                                  <p>{meal.calories} kcal</p>
                                  <p>Status: {meal.is_eaten ? "✅ Съедено" : "⏳ Запланировано"}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {activeTab === "workouts" && activePlan?.days && (
            <div className={styles.workoutsContentWrapper}>
              <div className={styles.workoutsContent} id="workoutsScroll">
                {activePlan.days.every((d) => d.exercises.length === 0) ? (
                  <div className={styles.noDataMessage}>
                    <p>
                      Вы еще не запланировали ни одной тренировки. Перейдите на страницу Тренировки, чтобы начать!
                    </p>
                    <button onClick={() => router.push("/workout")} className={styles.goToButton}>
                      Перейти к Тренировкам
                    </button>
                  </div>
                ) : (
                  activePlan.days.map((dayData) => {
                    const dayNames = [
                      "Понедельник",
                      "Вторник",
                      "Среда",
                      "Четверг",
                      "Пятница",
                      "Суббота",
                      "Воскресенье",
                    ];
                    const displayName = dayNames[dayData.day_number - 1] || dayData.name;
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
                        <h3 className={styles.dayTitle}>{displayName}</h3>
                        <ul className={styles.workoutStats}>
                          <li className={styles.statRow}>
                            <span className={styles.statLabel}>✦ Выполнено:</span>
                            <span className={styles.statValue}>
                              {completedWorkouts}/{dayData.exercises.length}
                            </span>
                          </li>
                          <li className={styles.statRow}>
                            <span className={styles.statLabel}>✦ Общее время:</span>
                            <span className={styles.statValue}>{totalDayTime.toFixed(0)} min</span>
                          </li>
                          <li className={styles.statRow}>
                            <span className={styles.statLabel}>✦ Ккал сожжено:</span>
                            <span className={styles.statValue}>{totalDayCalories.toFixed(0)}</span>
                          </li>
                        </ul>
                        <p className={styles.totalWorkouts}>
                          <strong>{dayData.exercises.length}</strong> тренировок запланировано
                        </p>
                        <div className={styles.workoutsList}>
                          {dayData.exercises.map((ex, idx) => {
                            const id = `workout-${dayData.id}-${idx}`;

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
                                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                                      const target = e.currentTarget;
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
                                  <p>Status: {ex.is_completed ? "✅ Выполнено" : "⏳ В ожидании"}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
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
                  <h3 className={styles.analyticsTitle}>Питание</h3>
                  <div className={styles.analyticsText}>
                    <div>Ваше потребление калорий из отслеженных приёмов:</div>
                    <div>
                      Вы потребили{" "}
                      <span className={styles.analyticsStrong}>{calculateEatenCalories()}</span>{" "}
                      ккал из съеденных продуктов.
                    </div>
                    {goalsInfo.dailyCalories && (
                      <div>
                        Ваша дневная норма составляет{" "}
                        <span className={styles.analyticsStrong}>{goalsInfo.dailyCalories}</span>{" "}
                        ккал.
                        {calculateEatenCalories() > Number(goalsInfo.dailyCalories) ? (
                          <span className={styles.analyticsStatusBad}>
                            {" "}
                            Вы превысили свою цель.
                          </span>
                        ) : (
                          <span>
                            {" "}
                            У вас осталось{" "}
                            {Number(goalsInfo.dailyCalories) - calculateEatenCalories()}{" "}
                            ккал.
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className={styles.analyticsBlock}>
                  <h3 className={styles.analyticsTitle}>Прогресс веса</h3>

                  {analytics?.weight_data && analytics.weight_data.length > 0 && (
                    <div className={styles.chartContainer}>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={analytics.weight_data}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey="date"
                            tickFormatter={(str) =>
                              new Date(str).toLocaleDateString(undefined, {
                                day: "numeric",
                                month: "short",
                              })
                            }
                          />
                          <YAxis domain={["dataMin - 2", "dataMax + 2"]} />
                          <Tooltip
                            labelFormatter={(label) => new Date(label).toLocaleDateString()}
                            formatter={(value) => [`${value} кг`, "Вес"]}
                          />
                          <Line
                            type="monotone"
                            dataKey="weight"
                            stroke="#7ebc9e"
                            strokeWidth={3}
                            dot={{ r: 6 }}
                            activeDot={{ r: 8 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  )}

                  <div className={styles.analyticsText}>
                    {analytics?.goal_progress ? (
                      <>
                        <div>
                          Текущий прогресс:{" "}
                          <span className={styles.analyticsStrong}>
                            {Math.round(analytics?.goal_progress?.progress_percentage || 0)}%
                          </span>
                        </div>
                        <div>
                          Целевой вес:{" "}
                          <span className={styles.analyticsStrong}>{goalsInfo.targetWeight}</span>{" "}
                          кг
                        </div>
                        {analytics?.goal_progress?.estimated_completion ? (
                          <div>
                            Примерная дата достижения цели:{" "}
                            <span className={styles.analyticsStrong}>
                              {new Date(
                                analytics?.goal_progress?.estimated_completion || ""
                              ).toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                        ) : (
                          <div>
                            Прогноз завершения:{" "}
                            <span className={styles.analyticsStrong}>Недостаточно данных</span>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <div>
                          Целевой вес:{" "}
                          <span className={styles.analyticsStrong}>{goalsInfo.targetWeight}</span>{" "}
                          кг
                        </div>
                        <div>
                          Текущий вес:{" "}
                          <span className={styles.analyticsStrong}>{profileInfo.weight}</span> кг
                        </div>
                        {Number(goalsInfo.targetWeight) !== Number(profileInfo.weight) && (
                          <div>
                            Осталось:{" "}
                            <span className={styles.analyticsStrong}>
                              {Math.abs(
                                Number(goalsInfo.targetWeight) - Number(profileInfo.weight)
                              ).toFixed(1)}
                            </span>{" "}
                            кг до цели
                          </div>
                        )}
                      </>
                    )}

                    {analytics?.weight_change !== null &&
                      analytics?.weight_change !== undefined && (
                        <div>
                          Изменение веса:{" "}
                          <span
                            className={
                              analytics.weight_change <= 0
                                ? styles.analyticsStatusOk
                                : styles.analyticsStatusBad
                            }
                          >
                            {analytics.weight_change > 0 ? "+" : ""}
                            {analytics.weight_change.toFixed(1)} кг
                          </span>
                        </div>
                      )}
                  </div>

                  <form className={styles.weightForm} onSubmit={handleWeightSubmit}>
                    <h4>Записать вес</h4>
                    <div className={styles.inputGroup}>
                      <label>Вес (кг)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={weightInput.weight}
                        onChange={(e) => setWeightInput({ ...weightInput, weight: e.target.value })}
                        placeholder="например, 75.5"
                        required
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Дата</label>
                      <input
                        type="date"
                        value={weightInput.date}
                        onChange={(e) => setWeightInput({ ...weightInput, date: e.target.value })}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className={styles.submitBtn}
                      disabled={isSubmittingWeight}
                    >
                      {isSubmittingWeight ? "Сохранение..." : "Сохранить вес"}
                    </button>
                  </form>
                </div>

                <div className={styles.analyticsBlock}>
                  <div className={styles.analyticsText}>
                    {analytics && analytics.weight_change !== null && analytics.weight_change <= 0
                      ? "Вы отлично прогрессируете к своей цели! Продолжайте соблюдать питание и активность."
                      : "Главное — регулярность. Старайтесь придерживаться нормы калорий и продолжайте отслеживать прогресс."}
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

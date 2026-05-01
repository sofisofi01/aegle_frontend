export const data = {
  title: "Создайте аккаунт Эквилибриа",
  subtitle: "Начнём с основ",

  fields: {
    name: "Введите ваше имя",
    surname: "Введите вашу фамилию",
    birth: "Введите дату рождения",
    age: "Введите ваш возраст",
    email: "Введите вашу почту",
    password: "Введите пароль",
    height: "Введите ваш рост (см)",
    weight: "Введите ваш вес (кг)",
    targetWeight: "Введите ваш целевой вес (кг)",
  },

  sections: {
    personal: "Несколько деталей, чтобы персонализировать ваш опыт...",
    goals: "Ваши цели",
    safety: "И наконец — для вашей безопасности",
  },

  activity: [
    { id: "sedentary", label: "Малоподвижный" },
    { id: "light", label: "Лёгкая активность" },
    { id: "moderate", label: "Умеренная активность" },
    { id: "active", label: "Активный" },
    { id: "very_active", label: "Очень активный" },
  ],

  goals: [
    { id: "lose", label: "Похудеть" },
    { id: "maintain", label: "Поддерживать вес" },
    { id: "gain", label: "Набрать вес" },
  ],

  actions: {
    haveAccount: "Уже есть аккаунт?",
    signIn: "Войти!",
  },
};
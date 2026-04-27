export const data = {
  title: "Create your Equilibria account",
  subtitle: "Let's start with the basics",
  fields: {
    name: "Enter your name",
    surname: "Enter your surname",
    birth: "Enter your date of birth",
    email: "Enter your email",
    password: "Enter your password",
    height: "Enter your height (cm)",
    weight: "Enter your weight (kg)",
    targetWeight: "Enter your target weight (kg)",
  },
  sections: {
    personal: "A few details to personalize your experience...",
    goals: "Your goals",
    safety: "And finally for your safety",
  },
  activity: [
    { id: "sedentary", label: "Sedentary" },
    { id: "light", label: "Light" },
    { id: "moderate", label: "Moderate" },
    { id: "active", label: "Active" },
    { id: "very_active", label: "Very active" },
  ],

  goals: [
    { id: "lose", label: "Lose weight" },
    { id: "maintain", label: "Maintain weight" },
    { id: "gain", label: "Gain weight" },
  ],
  actions: {
    haveAccount: "Already have an account?",
    signIn: "Sign In!",
  },
};

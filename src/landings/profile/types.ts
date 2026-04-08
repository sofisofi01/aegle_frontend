export type ProfileInfo = {
  name: string;
  memberSince: string;
  level: string;
  strikeDays: number;
  avatar: string;
  contact: {
    email: string;
    age: number;
    height: number;
    weight: number;
  };
  goals: {
    calories: number;
    sessions: number;
    workoutMinutes: number;
    steps: number;
  };
};
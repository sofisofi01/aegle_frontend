export type ActivityLevel = 1 | 2 | 3 | 4 | 5;

export type Gender = "male" | "female" | null;

export type SignUpData = {
  name: string;
  surname: string;
  birth: string;
  email: string;
  password: string;
  height: string;
  weight: string;
  gender: Gender;
  activity: ActivityLevel | null;
};
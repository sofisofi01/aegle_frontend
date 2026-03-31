export type ActivityLevel = 0 | 1 | 2 | 3;

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
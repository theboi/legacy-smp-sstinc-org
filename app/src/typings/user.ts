export interface User {
  iid: string;
  name: string;
  handle: string;
  rank: UserRank;
  role: UserRole;
  points: number;
  photoURL: string;
}

export interface AuthUser extends User {
  email: string;
  batch: number;
  firebaseId: string;
  telegramId: string;
}

export enum UserRole {
  "None" = -1,
  "Banned" = 0,
  "Member" = 1,
  "Trainee" = 2,
  "Employee" = 3,
  "Associate" = 4,
  "Alumni" = 5,
  "ExCo" = 6,
  "Consultant" = 7,
  "BOD" = 8,
  "Root" = 9,
}

export enum UserRank {
  "None" = -1,
  "Simp" = 1,
}

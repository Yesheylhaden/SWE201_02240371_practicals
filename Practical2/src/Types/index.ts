// src/Types/index.ts

export interface Course {
  id:         string;
  code:       string;
  name:       string;
  instructor: string;
  credits:    number;
  grade:      string;
  color:      string;
}

export type RootStackParamList = {
  Dashboard:    undefined;
  Profile:      undefined;
  CourseDetail: { course: Course };
};

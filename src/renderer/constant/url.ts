const URL = {
  DASHBOARD: "/",
  JOB: "/job",
  PEOPLE: "/people",
  TASK: "/task",
  ARCHIVE: "/archive",
  CALENDAR: "/calendar",
  EXTENSION: "/extension",
  SETTING: "/setting",
  ABOUT: "/about",
} as const;

export default URL;
export type URLLink = (typeof URL)[keyof typeof URL];

export enum PLAN {
  FREE = 'FREE',
  PRO = 'PRO',
  // ENTERPRISE = 'ENTERPRISE'
}

export interface SETTING {
  QUESTION_LIMIT: number;
  OPTIONS_LIMIT: number;
  TEXT_LIMIT: number;
}

export type APP_SETTINGS_TYPE = {
  [key in PLAN]: SETTING;
};

export const APP_SETTINGS: APP_SETTINGS_TYPE = {
  [PLAN.FREE]: {
    QUESTION_LIMIT: 20,
    OPTIONS_LIMIT: 5,
    TEXT_LIMIT: 1000,
  },
  [PLAN.PRO]: {
    QUESTION_LIMIT: 10,
    OPTIONS_LIMIT: 6,
    TEXT_LIMIT: 5000,
  },
  // [PLAN.ENTERPRISE]: {
  //   QUESTION_LIMIT: 10,
  //   OPTIONS_LIMIT: 6,
  //   TEXT_LIMIT: 5000,
  // }
};

export const getAppSettings = (plan: PLAN) => {
  return APP_SETTINGS[plan];
};

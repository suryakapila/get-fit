export const enum ActivityLevel {
  Sedentary = '1',
  LightlyActive = '2',
  ModeratelyActive = '3',
  VeryActive = '4',
  ExtraActive = '5',
}

export const Activity = [
  {
    id: ActivityLevel.Sedentary,
    activityLevel: 'Sedentary',
    description: 'little or no exercise',
  },
  {
    id: ActivityLevel.LightlyActive,
    activityLevel: 'Lightly Active',
    description: 'light exercise/sports 1-3 days/week',
  },
  {
    id: ActivityLevel.ModeratelyActive,
    activityLevel: 'Moderately Active',
    description: 'moderate exercise/sports 3-5 days/week',
  },
  {
    id: ActivityLevel.VeryActive,
    activityLevel: 'Very Active',
    description: 'hard exercise/sports 6-7 days a week',
  },
  {
    id: ActivityLevel.ExtraActive,
    activityLevel: 'Extra Active',
    description: 'very hard exercise/sports & physical job or 2x training',
  },
];

export const enum bodyType {
  Underweight = 'Underweight',
  Normal = 'Normal',
  Overweight = 'Overweight',
  Obese = 'Obese',
  ObeseClass1 = 'Obese Class 1',
  ObeseClass2 = 'Obese Class 2',
  ObeseClass3 = 'Obese Class 3',
}

export const enum disclaimer {
  daysToGoalWeight = `assuming your Total Daily Energy Expended remains constant and there are no other factors influencing your weight loss. It's important to note that this is a simplified example, and individual variations and health considerations should be taken into account when creating a weight loss plan`,
}

export const bmiCategories = [
  {
    id: bodyType.Underweight,
    description: 'Underweight',
    message: 'Eat up! Time to gain some weight!',
  },
  {
    id: bodyType.Normal,
    description: 'Normal',
    message: 'Keep up the good work, stay fit!',
  },
  {
    id: bodyType.Overweight,
    description: 'Overweight',
    message: 'Watch out! Time to shed some pounds!',
  },
  {
    id: bodyType.ObeseClass1,
    description: 'Obese Class 1',
    message: 'Take action! Time to get healthy!',
  },
  {
    id: bodyType.ObeseClass2,
    description: 'Obese Class 2',
    message: `Time's ticking! Let's get moving!`,
  },
  {
    id: bodyType.ObeseClass3,
    description: 'Obese Class 3',
    message: 'Urgent change! Time to get serious!',
  },
].map((item, index) => ({ ...item, index }));

export enum DietGoal {
  WeightGain = 'weight-gain',
  WeightLoss = 'weight-loss',
  WeightMaintenance = 'weight-maintenance',
  MuscleBuilding = 'muscle-building',
}

export const MACRO_RATIOS = {
  [DietGoal.WeightGain]: {
    protein: 0.2,
    carbs: 0.5,
    fat: 0.3,
  },
  [DietGoal.WeightLoss]: {
    protein: 0.3,
    carbs: 0.4,
    fat: 0.3,
  },
  [DietGoal.WeightMaintenance]: {
    protein: 0.25,
    carbs: 0.45,
    fat: 0.3,
  },
  [DietGoal.MuscleBuilding]: {
    protein: 0.4,
    carbs: 0.4,
    fat: 0.2,
  },
};

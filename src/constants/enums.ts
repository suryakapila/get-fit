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
}

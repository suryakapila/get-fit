export const enum ActivityLevel {
  Sedentary = '1',
  LightlyActive = '2',
  ModeratelyActive = '3',
  VeryActive = '4',
  ExtraActive = '5',
}

export const Activity = [
  { id: ActivityLevel.Sedentary, activityLevel: 'Sedentary' },
  { id: ActivityLevel.LightlyActive, activityLevel: 'Lightly Active' },
  { id: ActivityLevel.ModeratelyActive, activityLevel: 'Moderately Active' },
  { id: ActivityLevel.VeryActive, activityLevel: 'Very Active' },
  { id: ActivityLevel.ExtraActive, activityLevel: 'Extra Active' },
];

export const enum bodyType {
  Underweight = 'Underweight',
  Normal = 'Normal',
  Overweight = 'Overweight',
  Obese = 'Obese',
}

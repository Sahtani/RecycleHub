export class PointSystem {
  static POINTS_PER_KG = {
    plastic: 2,
    glass: 1,
    paper: 1,
    metal: 5
  };

  static REWARD_CONVERSIONS = [
    { points: 100, reward: 50 },
    { points: 200, reward: 120 },
    { points: 500, reward: 350 }
  ];

  static calculatePoints(wasteTypes: { type: string; weight: number }[]): number {
    return wasteTypes.reduce((total, waste) => {
      // @ts-ignore
      const pointsPerKg = this.POINTS_PER_KG[waste.type.toLowerCase()] || 0;
      return total + (pointsPerKg * (waste.weight / 1000));
    }, 0);
  }

  static convertPoints(points: number): number | null {
    const reward = this.REWARD_CONVERSIONS.find(r => r.points <= points);
    return reward ? reward.reward : null;
  }
}

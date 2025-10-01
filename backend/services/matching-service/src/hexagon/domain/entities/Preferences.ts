export class Preferences {
    constructor(
        public readonly userId: string,
        public readonly maxDistanceKm?: number,
        public readonly weightConfig?: WeightConfig,
        public readonly updatedAt?: Date
    ) { }
}

export interface WeightConfig { [skill: string]: number; }

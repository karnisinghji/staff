export declare class Preferences {
    readonly userId: string;
    readonly maxDistanceKm?: number | undefined;
    readonly weightConfig?: WeightConfig | undefined;
    readonly updatedAt?: Date | undefined;
    constructor(userId: string, maxDistanceKm?: number | undefined, weightConfig?: WeightConfig | undefined, updatedAt?: Date | undefined);
}
export interface WeightConfig {
    [skill: string]: number;
}

export interface Message {
    id: string;
    fromUserId: string;
    toUserId: string;
    body: string;
    createdAt: Date;
    readAt?: Date | null;
}

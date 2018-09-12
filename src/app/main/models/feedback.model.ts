export class FeedbackModel {
  id?: number;
  message?: string;
  sendingDate?: Date;
  senderId?: number;
  isRademResponse?: boolean;
  isPublic?: boolean;

  constructor(message: string, sendingDate: Date, isRademResponse, isPublic) {
    this.message = message;
    this.sendingDate = sendingDate;
    this.isRademResponse = isRademResponse;
    this.isPublic = isPublic;
  }
}

export class FeedbackModel {
  id?: number;
  message?: string;
  sendingDate?: Date;
  sender?: string;
  senderId?: number;
  senderName?: string;
  isRademResponse?: boolean;
  isPublic?: boolean;

  constructor(id: number,
              message: string,
              sendingDate: Date,
              sender: string,
              senderId: number,
              senderName: string,
              isRademResponse: boolean,
              isPublic: boolean
  ) {
    this.id = id;
    this.message = message;
    this.sendingDate = sendingDate;
    this.sender = sender;
    this.senderId = senderId;
    this.senderName = senderName;
    this.isRademResponse = isRademResponse;
    this.isPublic = isPublic;
  }
}

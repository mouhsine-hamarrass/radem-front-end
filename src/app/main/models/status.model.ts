export class StatusModel {
  id?: number;
  stepOrder: number;
  status?: string;

  constructor(id: number, stepOrder: number, status: string) {
    this.id = id;
    this.stepOrder = stepOrder;
    this.status = status;
  }
}

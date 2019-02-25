export class AlertModel {
  id?: number;
  title: string;
  type: string;
  instructions?: string;

  constructor(id: number, title: string, type: string, instructions: string) {
    this.id = id;
    this.title = title;
    this.type = type;
    this.instructions = instructions;
  }
}

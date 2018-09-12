export class AlertModel {
  id?: number;
  title: string;
  instructions?: string;

  constructor(id: number, title: string, instructions: string) {
    this.id = id;
    this.title = title;
    this.instructions = instructions;
  }
}

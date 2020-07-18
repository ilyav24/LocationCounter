export class SensoreUsage {
  date: Date;
  num: number;
  constructor(num: number) {
    this.date = new Date(Date.now());
    this.num = num;
  }
}

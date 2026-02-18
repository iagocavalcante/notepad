export class Note {
  title: string;
  text: string;
  id: number | null | undefined;
  constructor(title: string, text: string, id: number | null | undefined) {
    this.title = title;
    this.text = text;
    this.id = id;
  }
}

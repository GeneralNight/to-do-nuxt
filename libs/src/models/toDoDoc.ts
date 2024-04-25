export type ToDoItem = {
  id: string;
  body: string;
  checked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class ToDoDoc {
  constructor(
    public id: string,
    public ownerId: string,
    public title: string,
    public createdAt: Date,
    public updatedAt: Date,
    public items: ToDoItem[]
  ) { }

  static fromFirestore(snapshot: any) {
    return !snapshot || !snapshot.exists ? null : ToDoDoc.fromMap({ ...snapshot.data(), id: snapshot.id });
  }

  static fromMap(map: any) {
    return new ToDoDoc(
      map.id,
      map.ownerId,
      map.title,
      map.createdAt,
      map.updatedAt,
      map.items,
    )
  }

  toMap(): Omit<ToDoDoc, 'toMap'> {
    return {
      id: this.id,
      ownerId: this.ownerId,
      title: this.title,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      items: this.items,
    };
  }
}


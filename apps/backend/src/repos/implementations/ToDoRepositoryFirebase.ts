import { ToDoDoc } from "@libs/models";
import { firestore } from "firebase-admin";
import { TO_DO_COLLECTION } from "../../utils/Constants";
import { IToDoRepository } from "../interfaces/IToDoRepository";

export class ToDoRepositoryFirebase implements IToDoRepository {
  protected firestore = firestore();
  protected coll: FirebaseFirestore.CollectionReference;

  constructor(

  ) {
    this.coll = this.firestore.collection(TO_DO_COLLECTION);
  }

  async listToDo(): Promise<ToDoDoc[]> {
    const items = await this.coll.get()
    return items.docs.map(item => ToDoDoc.fromFirestore(item))
  }

  async createToDo(data: Partial<ToDoDoc>): Promise<void> {

    const doc = this.coll.doc();

    const finalData: Partial<ToDoDoc> = {
      id: doc.id,
      ...data,
      updatedAt: new Date(),
      createdAt: new Date(),
    }

    await doc.create(finalData);
    return
  }

  async deleteToDo(toDoId: string): Promise<void> {
    const doc = this.coll.doc(toDoId);

    await doc.delete()
  }

  async getToDo(toDoId: string): Promise<ToDoDoc> {
    const doc = await this.coll.doc(toDoId).get();
    return ToDoDoc.fromFirestore(doc)
  }


}
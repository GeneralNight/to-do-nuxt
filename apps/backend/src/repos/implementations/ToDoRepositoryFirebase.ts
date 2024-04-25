import { ToDoDoc, ToDoItem } from "@libs/models";
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
    await this.coll.doc(toDoId).delete();
  }

  async getToDo(toDoId: string): Promise<ToDoDoc> {
    const doc = await this.coll.doc(toDoId).get();
    return ToDoDoc.fromFirestore(doc)
  }

  async createToDoItem(toDoId: string, data: Partial<ToDoItem>): Promise<void> {
    await this.coll.doc(toDoId).collection('items').doc().set(data)
  }

  async deleteToDoItem(toDoId: string, itemId: string): Promise<void> {
    await this.coll.doc(toDoId).collection('items').doc(itemId).delete();
  }

  async getToDoItems(toDoId: string): Promise<ToDoItem[]> {
    const doc = await this.coll.doc(toDoId).collection('items').get();
    return doc ? doc.docs.map(v => v.data() as ToDoItem) : []
  }

  async updateToDoItem(toDoId: string, itemId: string, data: Partial<ToDoItem>): Promise<void> {
    await this.coll.doc(toDoId).collection('items').doc(itemId).set(data);
  }

}
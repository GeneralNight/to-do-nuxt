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
    return (await this.coll.get()) as unknown as ToDoDoc[]
  }

  async createToDo(data: Partial<ToDoDoc>): Promise<void> {
    return
  }

  async deleteToDo(toDoId: string): Promise<void> {
    return
  }

  async getToDo(toDoId: string): Promise<ToDoDoc> {
    return
  }


}
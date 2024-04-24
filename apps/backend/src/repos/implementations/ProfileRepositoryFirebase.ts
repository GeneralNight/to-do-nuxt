import { UserProfile } from "@libs/models";
import { firestore } from "firebase-admin";
import { PROFILE_COLLECTION } from "../../utils/Constants";
import { IProfileRepository } from "../interfaces/IProfileRepository";

export class ProfileRepositoryFirebase implements IProfileRepository {
  protected firestore = firestore();
  protected coll: FirebaseFirestore.CollectionReference;

  constructor(

  ) {
    this.coll = this.firestore.collection(PROFILE_COLLECTION);
  }

  async createProfile(data: Omit<UserProfile, "toMap">): Promise<void> {
    const objId = data.id;

    const doc = objId ? this.coll.doc(objId) : this.coll.doc();

    const finalData: Partial<UserProfile> = {
      name: data.name,
      email: data.email,
      id: doc.id
    }

    await doc.create(finalData);
  }

  async getProfile(profileId: string): Promise<UserProfile> {

    const profile = await this.coll.doc(profileId).get()
    return UserProfile.fromFirestore(profile)
  }
}
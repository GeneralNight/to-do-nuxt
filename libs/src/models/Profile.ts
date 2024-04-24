export class UserProfile {
    constructor(
        public id: string,
        public name: string,
        public email: string,
    ) { }

    static fromFirestore(snapshot: any) {
        return !snapshot || !snapshot.exists ? null : UserProfile.fromMap({ ...snapshot.data(), id: snapshot.id });
    }

    static fromMap(map: any) {
        return new UserProfile(
            map.id,
            map.name,
            map.email
        )
    }

    toMap(): Omit<UserProfile, 'toMap'> {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
        };
    }
} 
export class User {
    constructor(
        private _id: string,
        private _email: string,
        private _isAvailable: boolean = true,
        private _createdAt: Date = new Date(),
        private _updatedAt: Date = new Date()
    ) { }

    get Id(): string {
        return this._id;
    }
    get email(): string {
        return this._email;
    }
    get isAvailable(): boolean {
        return this._isAvailable;
    }
    get createdAt(): Date {
        return this._createdAt;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }
}

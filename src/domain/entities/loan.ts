export class Loan {
    constructor(
        private _id: string,
        private _bookId: string,
        private _userId: string,
        private _loanDate: Date,
        private _returnDate: Date | null = null,
        private createdAt: Date = new Date(),
        private updatedAt: Date = new Date(),
    ) { }

    get id(): string {
        return this._id;
    }

    get bookId(): string {
        return this._bookId;
    }

    get userId(): string {
        return this._userId;
    }

    get loanDate(): Date {
        return this._loanDate;
    }

    get returnDate(): Date | null {
        return this._returnDate;
    }

    get CreatedAt(): Date {
        return this.createdAt;
    }

    get UpdatedAt(): Date {
        return this.updatedAt;
    }

    return() {
        if (this._returnDate) {
            throw new Error('この書籍は既に返却されています');
        } else {
            this._returnDate = new Date();
        }
    }

    get dueDate(): Date {
        const dueDate = new Date(this.loanDate);
        dueDate.setDate(dueDate.getDate() + 14);
        return dueDate;
    }
}

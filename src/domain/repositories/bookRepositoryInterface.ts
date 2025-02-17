import { Book } from "../entities/book";
import { TransactionContextInterface } from "../utils/transactionContextInterface";

export interface BookRepositoryInterface {
    create(book: Book, ctx?: TransactionContextInterface): Promise<Book>;
    findById(id: String, ctx?: TransactionContextInterface): Promise<Book | null>;
    update(book: Book, ctx?: TransactionContextInterface): Promise<Book>;
}
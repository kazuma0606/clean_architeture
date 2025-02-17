import { Book } from "@prisma/client";

export interface BookRepositoryInterface {
    create(title: String): Promise<Book>;
    findById(id: String): Promise<Book | null>;
}
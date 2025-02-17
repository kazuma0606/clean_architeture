import { BookRepositoryInterface } from "../../../domain/repositries/bookRepositoryInterface";
import { Book } from "../../../domain/entities/book";
import { IdGeneratorInterface } from "../../../domain/utils/idGeneratorInterface";
import { AddBookRequestDto } from "../../dtos/book/addBookRequestDto";
import { AddBookResponseDto } from "../../dtos/book/addBookResponseDto";
import { AddBookUseCaseInterface } from "./addBookUseCaseInterface";

export class AddBookUseCase implements AddBookUseCaseInterface {
    constructor(private readonly bookRepositry: BookRepositoryInterface,
        private readonly idGenerator: IdGeneratorInterface
    ) { }

    async execute(requestDto: AddBookRequestDto): Promise<AddBookResponseDto> {
        const id = this.idGenerator.generate();
        const newbook = new Book(id, requestDto.title);
        const createdBook = await this.bookRepositry.create(newbook);
        return {
            id: createdBook.id,
            title: createdBook.title,
            isAvailable: createdBook.isAvailable,
            createdAt: createdBook.createdAt,
            updatedAt: createdBook.updatedAt
        }
    }
}
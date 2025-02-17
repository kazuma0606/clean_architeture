import { BookRepositoryInterface } from "../../../domain/repositories/bookRepositoryInterface";
import { findBookByIdRequestDto } from "../../dtos/book/findBookByIdRequestDto";
import { findBookByIdResponseDto } from "../../dtos/book/findBookByIdResponseDto";
import { findBookByIdUseCaseInterface } from "./findBookByIdUseCaseInterface";

export class FindBookByIdUseCase implements findBookByIdUseCaseInterface {
    constructor(private readonly bookRepositry: BookRepositoryInterface) { }

    async execute(requestDto: findBookByIdRequestDto): Promise<findBookByIdResponseDto | null> {
        const foundBook = await this.bookRepositry.findById(requestDto.id);
        if (!foundBook) {
            return null;
        }
        return {
            id: foundBook.id,
            title: foundBook.title,
            isAvailable: foundBook.isAvailable,
            createdAt: foundBook.createdAt,
            updatedAt: foundBook.updatedAt
        }
    }
}
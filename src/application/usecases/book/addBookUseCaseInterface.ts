import { AddBookResponseDto } from "../../dtos/book/addBookResponseDto";
import { AddBookRequestDto } from "../../dtos/book/addBookRequestDto";

export interface AddBookUseCaseInterface {
    execute(requestDto: AddBookRequestDto): Promise<AddBookResponseDto>;
}
import { findBookByIdRequestDto } from "../../dtos/book/findBookByIdRequestDto";
import { findBookByIdResponseDto } from "../../dtos/book/findBookByIdResponseDto";


export interface findBookByIdUseCaseInterface {
    execute(requestDto: findBookByIdRequestDto): Promise<findBookByIdResponseDto | null>;
};
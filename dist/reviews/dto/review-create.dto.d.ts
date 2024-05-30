export declare class ReviewRequestDto {
    author: string;
    book: string;
    content: string;
    userId: number;
}
export declare class ReviewCreateDto {
    bookId: number;
    content: string;
    userId: number;
}
export declare class ReviewDto {
    id: number;
    bookId: number;
    content: string;
    userId: number;
}

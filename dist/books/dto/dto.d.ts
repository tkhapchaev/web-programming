export declare class BookCreateDto {
    title: string;
    author: string;
    price: number;
    coverImage: string;
    isNewRelease: boolean;
    weeklyTop: boolean;
}
export declare class BookUpdateDto {
    title?: string;
    author?: string;
    price?: number;
    coverImage?: string;
    isNewRelease?: boolean;
    weeklyTop?: boolean;
}
export declare class BookDto {
    id: number;
    title: string;
    author: string;
    price: number;
    coverImage?: string;
    isNewRelease: boolean;
    weeklyTop: boolean;
}

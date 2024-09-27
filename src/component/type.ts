import { MockData } from "../mocks/type";

export type ProductListState = {
    items: MockData[];
    page: number;
    isLoading: boolean;
    hasMore: boolean;
};

export type ProductCardProps = {
    productItem: MockData;
};

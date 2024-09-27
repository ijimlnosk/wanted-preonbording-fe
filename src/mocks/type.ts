export type MockData = {
    productId: string;
    productName: string;
    price: number;
    boughtDate: string;
};

export type MockDataResponse = {
    datas: MockData[];
    isEnd: boolean;
};

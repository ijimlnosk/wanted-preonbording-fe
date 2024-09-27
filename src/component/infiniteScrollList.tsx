import { useCallback, useEffect, useRef, useState } from "react";
import { getMockData } from "../mocks/mockData";
import { ProductListState } from "./type";
import ProductCard from "./productCard";
import Loading from "./loading";

const InfiniteScrollList = () => {
    const [productList, setProductList] = useState<ProductListState>({
        items: [],
        page: 0,
        isLoading: false,
        hasMore: true,
    });
    const [totalPice, setTotalPrice] = useState(0);

    const observer = useRef<IntersectionObserver | null>(null);

    const lastItemRef = useCallback(
        (node: HTMLElement | null) => {
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && productList.hasMore) {
                    setProductList((prev) => ({
                        ...prev,
                        page: prev.page + 1,
                    }));
                }
            });

            if (node) observer.current.observe(node);
        },
        [productList.isLoading, productList.hasMore]
    );

    useEffect(() => {
        const fetchProduct = async () => {
            setProductList((prev) => ({ ...prev, isLoading: true }));
            try {
                const response = await getMockData(productList.page);
                setProductList((prev) => ({
                    ...prev,
                    items: [...prev.items, ...response.datas],
                    isLoading: false,
                    hasMore: !response.isEnd,
                }));
            } catch (error) {
                console.error("상품 데이터 패칭 에러", error);
                setProductList((prev) => ({ ...prev, isLoading: false }));
            }
        };
        fetchProduct();
    }, [productList.page]);

    useEffect(() => {
        const newTotalPrice = productList.items.reduce(
            (sum, item) => sum + item.price,
            0
        );
        setTotalPrice(newTotalPrice);
    }, [productList.items]);

    return (
        <>
            <div className="w-full h-[100px] fixed flex top-0 justify-center items-center bg-white">
                총 합계 : {totalPice.toLocaleString()}
            </div>
            <div className="flex flex-col justify-center items-center mt-[100px]">
                <div className="w-[1280px] grid grid-cols-3">
                    {productList.items.map((product, index) => (
                        <div
                            key={index}
                            ref={
                                index === productList.items.length - 1
                                    ? lastItemRef
                                    : null
                            }
                            className=""
                        >
                            <ProductCard productItem={product} />
                        </div>
                    ))}
                </div>
                {productList.isLoading && <Loading />}
            </div>
        </>
    );
};

export default InfiniteScrollList;

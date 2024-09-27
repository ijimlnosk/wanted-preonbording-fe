import { ProductCardProps } from "./type";

const ProductCard = ({ productItem }: ProductCardProps) => {
    return (
        <div className="w-[400px] flex flex-col justify-center items-center gap-10 my-4 border-2 border-black rounded-lg">
            <div>{productItem.productName}</div>
            <div>{productItem.boughtDate}</div>
            <div>{productItem.price}</div>
        </div>
    );
};
export default ProductCard;

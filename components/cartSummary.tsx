import { FaShoppingCart } from "react-icons/fa";

interface CartSummaryProps {
    cartLength:  number
    cartTotalPrice: number
}

function CartSummary({ cartLength, cartTotalPrice }: CartSummaryProps) {
    return (
        <div className="bg-primary h-16 rounded-full flex justify-between items-center pr-4">
            <div className="flex items-center gap-4">
                <div className="relative bg-danger rounded-full h-16 w-16 flex justify-center items-center">
                    <FaShoppingCart size={30} color="white" />
                    <span
                        className="absolute bg-white rounded-full right-3 top-2 h-5 w-5 shadow-[0_6px_17px_#0003]
                text-center flex justify-center items-center text-danger font-semibold"
                    >
                        {cartLength}
                    </span>
                </div>
                <div className="text-white text-lg"> {cartTotalPrice} ريال</div>
            </div>
            <div className="text-white text-lg">السلة ( {cartLength} منتجات )</div>
        </div>
    )
}

export default CartSummary
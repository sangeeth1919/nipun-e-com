import { InputNumber, Space } from "antd";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { changeQtyService } from "../../../utils/cartHelper";

function ProductCartQnt({ product }) {
    const { cart } = useSelector((state) => state.cart);

    const cartItem = useMemo(() => {
        return cart.find((e) => e.pName === product.pName)
    }, [cart])

    const setQuantity = (value) => {
        changeQtyService({
            pName: product.pName,
            qnt: value
        })
    }

    return < Space >
        <InputNumber
            disabled={!cartItem}
            addonBefore="Q" addonAfter={product.measurement}
            size='small'
            min={0} // Prevents quantity from going below 1
            value={cartItem?.qnt}
            onChange={(value) => setQuantity(value)}
            style={{ width: '100%' }} // Adjust input width
        />
    </Space >
}

export default ProductCartQnt;

/* eslint-disable react-hooks/exhaustive-deps */
import { InputNumber, Space } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { changeQtyService } from "../../../utils/cartHelper";
import { getStocksSummaryService } from "../../../utils/stockHelper";


function ProductCartQnt({ product }) {
    const { cart } = useSelector((state) => state.cart);
    const [stockData, setStockData] = useState("")
    const cartItem = useMemo(() => {
        return cart.find((e) => e.pName === product.pName)
    }, [cart])

    useEffect(() => {
        fetchStock();
    }, [product])

    const fetchStock = async () => {
        const res = await getStocksSummaryService(product.pName)
        setStockData(res)
    }

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
            key={product.pName}
            min={0} // Prevents quantity from going below 1
            max={stockData?.availableStock?stockData.availableStock:0}
            value={cartItem?.qnt}
            onChange={(value) => setQuantity(value)}
            style={{ width: '100%' }} // Adjust input width
        />
    </Space >
}

export default ProductCartQnt;

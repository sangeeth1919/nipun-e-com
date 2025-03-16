import CheckouContainer from "../../../components/Cart/CheckouContainer";
import DataContainer from "../../../components/Common/DataContainer/DataContainer";
import PageContainer from "../../../components/Common/PageContainer/PageContainer";
import PageHeader from "../../../components/Common/PageHeader/PageHeader";


function CartPage() {

    return (
        <PageContainer>
            <PageHeader title='cart' subTitle={`check-out`} />
            <DataContainer>
               <CheckouContainer />
            </DataContainer>
        </PageContainer>
    );
}

export default CartPage;

import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import formatCurrency from "../utils/formatCurrency";
import CartItem from "./CartItem";
import storeItems from '../data/items.json';

type IOpenProps = {
    isOpen: boolean
}

export default function Shoppingcart(props: IOpenProps) {

    const { closeCart, cartItems } = useShoppingCart();


    return (
        <Offcanvas onHide={closeCart} show={props.isOpen} placement={'end'} >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {cartItems.map((item) => {
                        return (
                            <CartItem key={item.id} {...item} />
                        )
                    })}
                    <div className="ms-auto fw-bold fs-5">
                        Total:{
                            formatCurrency(cartItems.reduce((total, itemCart) => {
                                const itemLi = storeItems.find(item => item.id === itemCart.id)
                                return total + (itemLi?.price || 0) * itemCart.quantity
                            }, 0))
                        }
                    </div>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
};
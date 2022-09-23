import { Button, Card } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import formatCurrency from "../utils/formatCurrency";

interface IItems {
    item: {
        id: number;
        name: string;
        price: number;
        imgUrl: string;
    }
}

export function Storeitem(props: IItems): JSX.Element {

    const { getQuantity, increaseQuantity, decreaseQuantity, removeCart } = useShoppingCart();

    const quantity = getQuantity(props.item.id);

    return (
        <Card className={"h-100"}>
            <Card.Img variant={"top"} src={props.item.imgUrl} height={"200px"}
                style={{ objectFit: "cover" }} />
            <Card.Body className="d-flex flex-column" >
                <Card.Title className="d-flex justify-content-space-between align-items-baseline mb-4">
                    <span className="fs-2">{props.item.name}</span>
                    <span className="ms-2 text-muted">{formatCurrency(props.item.price)}</span>
                </Card.Title>
            </Card.Body>
            <div className="mt-auto">
                {
                    quantity === 0 ? (
                        <Button onClick={() => increaseQuantity(props.item.id)}  className={"w-100"} >
                            +Add To Cart
                        </Button>
                    ) : <div className="d-flex align-items-center flex-column"
                        style={{ gap: "0.5rem" }}
                    >
                        <div className="d-flex align-items-center justify-content-space-between"
                            style={{ gap: "0.5rem" }}
                        >
                            <Button onClick={() => decreaseQuantity(props.item.id)}>-</Button>
                            <div className="fs-3">{quantity} in cart</div>
                            <Button onClick={() => increaseQuantity(props.item.id)}>+</Button>
                        </div>
                        <Button onClick={() => removeCart(props.item.id)} size={"sm"} variant={"danger"}>
                            Remove
                        </Button>
                    </div>
                }
            </div>
        </Card>
    )
};
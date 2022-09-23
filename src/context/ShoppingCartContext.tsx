import { createContext, ReactNode, useContext, useState } from "react";
import Shoppingcart from "../components/Shoppingcart";


interface IShopProps {
    children: ReactNode
};

type CartItem = {
    id: number
    quantity: number
};


interface IShoppingMethods {
    openCart: () => void;
    closeCart: () => void;
    getQuantity: (id: number) => number;
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
    removeCart: (id: number) => void;
    totalQuan: number;
    cartItems: CartItem[];
};


const ShoppingCartContext = createContext({} as IShoppingMethods);

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
};

type IOpen = {
    isOpen: boolean;
}

export function ShoppingCartProvider({ children }: IShopProps) {



    const [isOpen, setIsOpen] = useState<IOpen['isOpen']>(false);

    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const openCart = () => setIsOpen(true);

    const closeCart = () => setIsOpen(false);

    const totalQuan = cartItems.reduce((totalQuantity, item) => totalQuantity = totalQuantity + item.quantity, 0);


    function getQuantity(id: number) {
        return cartItems.find(item => item.id === id)?.quantity || 0
    };

    function increaseQuantity(id: number) {
        setCartItems(curItems => {
            if (curItems.find(item => item.id === id) == null) {
                return [...curItems, { id, quantity: 1 }]
            } else {
                return curItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item;
                    }
                })
            }
        })
    };

    function decreaseQuantity(id: number) {
        setCartItems(curItems => {
            if (curItems.find(item => item.id === id)?.quantity === 1) {
                return curItems.filter(item => item.id !== id)
            } else {
                return curItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item;
                    }
                })
            }
        })
    };

    function removeCart(id: number) {
        setCartItems(curItems => {
            return curItems.filter(item => item.id !== id)
        });
    };


    return (
        <ShoppingCartContext.Provider value={{
            getQuantity,
            increaseQuantity,
            decreaseQuantity,
            removeCart,
            cartItems,
            openCart,
            closeCart,
            totalQuan
        }}>
            <Shoppingcart isOpen={isOpen} />
            {children}
        </ShoppingCartContext.Provider>
    )
};
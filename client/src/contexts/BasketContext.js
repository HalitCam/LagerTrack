import {createContext, useContext, useState, useEffect} from 'react';

const BasketContext = createContext();

const BasketContextProvider = ({children}) => {
    const [fba, setFba] = useState([]);
    const [order, setOrder] = useState([]);

    const addToBasket = (data) =>{
        setFba((prev) => [...prev, data]);
    }

    const values={
        fba,
        setFba,
        order,
        setOrder,
        addToBasket
    }

    return <BasketContext.Provider value={values}> {children} </BasketContext.Provider>

}
const useBasketContext = () => useContext(BasketContext);

export {BasketContextProvider, useBasketContext};



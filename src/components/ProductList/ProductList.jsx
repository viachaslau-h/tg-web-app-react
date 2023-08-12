import React, { useState } from 'react';
import './ProductList.css';
import ProductItem from '../ProductItem/ProductItem';
import { useTelegram } from '../../hooks/useTelegram';

const products = [
    {id: '1', title: 'Джинсы', price: 1500, description: 'Прямые'},
    {id: '2', title: 'Джинсы2', price: 1520, description: 'Прямые'},
    {id: '3', title: 'Джинсы3', price: 1550, description: 'Прямые'},
    {id: '4', title: 'Джинсы4', price: 1580, description: 'Прямые'},
    {id: '5', title: 'Джинсы5', price: 1505, description: 'Прямые'},
    {id: '6', title: 'Джинсы6', price: 1360, description: 'Прямые'},
    {id: '7', title: 'Джинсы7', price: 1560, description: 'Прямые'},
    {id: '8', title: 'Джинсы8', price: 1562, description: 'Прямые'},
]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc +=item.price
    }, 0)
}

const ProductList = () => {

    const [addedItems, setAddedItems] = useState([]);
    const {tg} = useTelegram;
    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: 'Купить ${getTotalPrice(newItems)}'
            });
        }
    }

    return (
        <div className={'list'}>
            {products.map(item => (
                <ProductItem
                    product = {item}
                    onAdd = {onAdd}
                    className = {'item'}
                />
            ))}
        </div>
    );
};

export default ProductList;
import '../styles/Options.css'

import Select from 'react-select'

import { formatPrices } from './Item'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Options(props) {
    const { shown, product } = props
    product.prices = formatPrices(product.prices)

    const navigate = useNavigate()

    const milkOptions = [
        {
            value: 0,
            label: 'Skim Milk',
        },
        {
            value: 1,
            label: 'Full Cream Milk',
        },
        {
            value: 2,
            label: 'Almond Milk',
        },
        {
            value: 3,
            label: 'Coconut Milk',
        },
    ].sort((a, b) => a.value > b.value)

    const sugarOptions = [
        {
            value: 0,
            label: 'No Sugar',
        },
        {
            value: 1,
            label: '1 Sugar',
        },
        {
            value: 2,
            label: '2 Sugars',
        },
        {
            value: 3,
            label: '3 Sugars',
        },
    ].sort((a, b) => a.value > b.value)

    const sizeOptions = Object.keys(product.prices).map(key => {
        if (key === 'min' || key === 'max') return null
        return {
            value: product.prices[key],
            label: `${key} - $${product.prices[key]}`,
        }
    }).filter(price => price !== null).sort((a, b) => a.value > b.value)

    const [item, setItem] = useState({
        title: product.title,
        subtitle: product.subtitle,
        image: product.image,
        milk: milkOptions[0].label,
        sugar: sugarOptions[0].label,
        price: sizeOptions[0].value,
        size: sizeOptions[0].label.split(" - ")[0],
        quantity: 1,
    })

    const theme = (theme) => ({
        ...theme,
        colors: {
        ...theme.colors,
            primary25: '#39CC97',
            primary: '#252731',
            neutral20: '#2A2C36',
            neutral30: '#2A2C36',
            neutral50: '#3D404E',
        },
        })

    const setMilk = (e) => {
        setItem({
            ...item,
            milk: e.label,
        })
    }

    const setSugar = (e) => {
        setItem({
            ...item,
            sugar: e.label,
        })
    }

    const setSize = (e) => {
        setItem({
            ...item,
            price: e.value,
            size: e.label.split(" - ")[0],
        })
    }

    const setQuantity = (e) => {
        setItem({
            ...item,
            quantity: e.target.value,
        })
    }

    const addItem = () => {
        if (!isNaN(item.quantity) && item.quantity > 0 && item.quantity < 100) {
            if (window.localStorage.getItem('order') === null) {
                window.localStorage.setItem('order', JSON.stringify([item]))
            } else {
                let order = JSON.parse(window.localStorage.getItem('order'))
                order.push(item)
                window.localStorage.setItem('order', JSON.stringify(order))
            }
            navigate('/home')
        } else {
            alert('Ensure All Fields Have Valid Inputs.')
        }
    }

    return (
        <div className='Options' shown={shown.toString()}>
            <h2>{product.title}</h2>
            <p className='Options__Label'>Milk</p>
            <Select className='Options__Select' options={milkOptions} defaultValue={milkOptions[0]} onChange={setMilk} placeholder="Select an option" theme={theme} />
            <p className='Options__Label'>Sugar</p>
            <Select className='Options__Select' options={sugarOptions} defaultValue={sugarOptions[0]} onChange={setSugar} placeholder="Select an option" theme={theme} />
            <p className='Options__Label'>Size</p>
            <Select className='Options__Select' options={sizeOptions} defaultValue={sizeOptions[0]} onChange={setSize} placeholder="Select an option" theme={theme} />
            <p className='Options__Label'>Quantity</p>
            <input type='number' min='1' max='99' className='Options__Quantity' defaultValue={1} onChange={setQuantity} placeholder="Set quantity" />
            <button className='Options__AddToOrder__Button' onClick={addItem}>Add To Order</button>
        </div>
    )
}

export default Options;

import '../styles/Options.css'

import Select from 'react-select'

import { formatPrices } from './Item'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function getOptions(rawOptions) {
    let options = {}
    Object.keys(rawOptions).sort((a, b) => a > b).forEach(option => { 
        options[option] = rawOptions[option].map(optionItem => {
            return {
                value: optionItem,
                label: optionItem,
                for: option,
            }
        })
    })
    return options
}

function Options(props) {
    const { shown, product } = props
    product.prices = formatPrices(product.prices)

    const navigate = useNavigate()

    const options = getOptions(product.options)

    const sizeOptions = Object.keys(product.prices).map(key => {
        if (key === 'min' || key === 'max') return null
        return {
            value: product.prices[key],
            label: `${key} - $${product.prices[key]}`,
        }
    }).filter(price => price !== null).sort((a, b) => a.value > b.value)

    const [item, setItem] = useState({
        title: product.title + ' - ' + sizeOptions[0].label.split(" - ")[0],
        subtitle: product.subtitle,
        image: product.image,
        size: sizeOptions[0].label.split(" - ")[0],
        price: sizeOptions[0].value,
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


    const setSize = (e) => {
        setItem({
            ...item,
            title: product.title + ' - ' + e.label.split(" - ")[0],
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

    const setOption = (data) => {
        let newItem = item
        newItem[data.for] = data.value
        setItem(newItem)
    }

    const addItem = () => {
        let complete = true
        Object.keys(product.options).forEach(option => {
            if (item[option] === undefined) {
                complete = false
            } else if (!product.options[option].includes(item[option])) {
                complete = false
            }
        })
        if (!isNaN(item.quantity) && item.quantity > 0 && item.quantity < 100 && complete) {
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
            {
                Object.keys(options).map((option, idx) => {
                    return <div key={idx}>
                        <p className='Options__Label'>{option}</p>
                        <Select className='Options__Select' options={options[option]} onChange={setOption} placeholder="Select an option" theme={theme} />
                    </div>
                })
            }
            <p className='Options__Label'>Size</p>
            <Select className='Options__Select' options={sizeOptions} defaultValue={sizeOptions[0]} onChange={setSize} placeholder="Select an option" theme={theme} />
            <p className='Options__Label'>Quantity</p>
            <input type='number' min='1' max='99' className='Options__Quantity' defaultValue={1} onChange={setQuantity} placeholder="Set quantity" />
            <button className='Options__AddToOrder__Button' onClick={addItem}>Add To Order</button>
        </div>
    )
}

export default Options;

import '../styles/Options.css'

import Select from 'react-select'

import { formatPrices } from './Item'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Format options to be usable in HTML
function getOptions(rawOptions) {

    // Create an object to store the formatted options
    let options = {}

    Object.keys(rawOptions).sort((a, b) => a > b).forEach(option => { 

        // Append option to options object
        options[option] = rawOptions[option].map(optionItem => {
            return {
                value: optionItem,
                label: optionItem,
                for: option,
            }
        })
    })

    // Return formatted options
    return options
}

function Options(props) {
    const { shown, product } = props

    // Format prices
    product.prices = formatPrices(product.prices)


    // Format options
    const options = getOptions(product.options)

    // Initialize navigate
    const navigate = useNavigate()

    // Get sizes and order all sizes alphabetically
    const sizeOptions = Object.keys(product.prices).map(key => {

        // Exclude min and max prices
        if (key === 'min' || key === 'max') return null

        return {
            value: product.prices[key],
            label: `${key} - $${product.prices[key]}`,
        }
    }).filter(price => price !== null).sort((a, b) => a.value > b.value)

    // Set state variable for item (will rerender view on update)
    const [item, setItem] = useState({
        title: product.title + ' - ' + sizeOptions[0].label.split(" - ")[0],
        subtitle: product.subtitle,
        image: product.image,
        size: sizeOptions[0].label.split(" - ")[0],
        price: sizeOptions[0].value,
        options: {},
        quantity: 1,
        id: product.id,
    })

    // Set color theme for select inputs
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

    // Update item state when a size is selected
    const setSize = (e) => {
        setItem({
            ...item,
            title: product.title + ' - ' + e.label.split(" - ")[0],
            price: e.value,
            size: e.label.split(" - ")[0],
        })
    }

    // Update item state when a quantity is selected
    const setQuantity = (e) => {
        setItem({
            ...item,
            quantity: e.target.value,
        })
    }


    // Update item state when an option is selected
    const setOption = (data) => {
        let newItem = item
        newItem.options[data.for] = data.value
        setItem(newItem)
    }

    // Add item to order and return to home
    const addItem = () => {

        let complete = true

        // Check all forms are filled out
        Object.keys(product.options).forEach(option => {
            if (item.options[option] === undefined) {

                // If form is not filled out, set complete to false
                complete = false
            } else if (!product.options[option].includes(item.options[option])) {

                // If form is filled out but is not a valid option, set complete to false
                complete = false
            }
        })

        // Check fields are valid
        if (!isNaN(item.quantity) && item.quantity > 0 && item.quantity < 100 && complete) {

            // Check if an order exists
            if (window.localStorage.getItem('order') === null) {

                // Create an order
                window.localStorage.setItem('order', JSON.stringify([item]))
            } else {

                // Append item to new order
                let order = JSON.parse(window.localStorage.getItem('order'))
                order.push(item)

                // Save new order
                window.localStorage.setItem('order', JSON.stringify(order))
            }

            // Return to home
            navigate('/home')
        } else {

            // If fields are not valid, alert user
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
                    <div className='Options__Hide__Overflow' shown={shown.toString()}/>
            <button className='Options__AddToOrder__Button' onClick={addItem} shown={shown.toString()}>Add To Order</button>
        </div>
    )
}

export default Options;

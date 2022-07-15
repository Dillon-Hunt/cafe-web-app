import Navigation from '../components/Navigation'

import '../styles/ItemOverview.css'

function ItemOverview() {
    const item = {
        title: "Espresso",
        subtitle: "With Milk",
        description: "Espresso is a coffee-brewing method of Italian origin, in which a small amount of nearly boiling water is forced under 9–10 bars of pressure through finely-ground coffee beans. Espresso coffee can be made with a wide variety of coffee beans and roast degrees.",
        imageUrl: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fd.newsweek.com%2Fen%2Ffull%2F1513133%2Fcoffee-caffeine-drink-cup-stock-getty.jpg&f=1&nofb=1",
        price: {
            small: 4.50,
            medium: 5.50,
            large: 6.50,
        }
    }

    return (
        <div className='ItemOverview'>
            <Navigation />
            <img className='ItemOverview__Image' src={item.imageUrl} alt=''/>
            <h1 className='ItemOverview__Title'>{item.title}</h1>
            <h2 className='ItemOverview__Subtitle'>{item.subtitle}</h2>
            <h2 className='ItemOverview__Description__Title'>Description</h2>
            <h2 className='ItemOverview__Description__Subtitle'>{item.description}</h2>
            <button type='button' className='ItemOverview__AddToOrder__Button'>Add To Order</button>
        </div>
    )
}

export default ItemOverview;

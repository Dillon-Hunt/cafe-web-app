import '../styles/Item.css'

function Item() {
    const item = {
        title: "Espresso",
        subtitle: "With Milk",
        imageUrl: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fd.newsweek.com%2Fen%2Ffull%2F1513133%2Fcoffee-caffeine-drink-cup-stock-getty.jpg&f=1&nofb=1",
        price: {
            small: 4.50,
            medium: 5.50,
            large: 6.50,
        }
    }

    return (
        <div className='Item'>
            <p className='Item__Title'>{item.title}</p>
            <p className='Item__Subtitle'>{item.subtitle}</p>
            <img className='Item__Image' src={item.imageUrl} alt={item.title} />
            <p className='Item__Price'><span className='Item__Price__Symbol'>$</span>{item.price.medium}</p>
        </div>
    )
}

export default Item;

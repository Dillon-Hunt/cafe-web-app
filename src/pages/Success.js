import Navigation from '../components/Navigation';
import '../styles/Success.css'

function Success() {
    return (
        <div className='Success'>
            <Navigation />
            <h1 className='Success__Title'>Done!</h1>
            <h2 className='Success__Subtitle'>Collect Order From K3</h2>
        </div>
    )
}

export default Success;

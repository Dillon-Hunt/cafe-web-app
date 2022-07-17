import '../styles/WelcomeBanner.css'

function WelcomeBanner(props) {
    const { signedIn } = props

    return (
        <div className="WelcomeBanner">
            <p className="WelcomeBanner__Greeting">Hi, {signedIn.displayName}</p>
        </div>
    )
}

export default WelcomeBanner;
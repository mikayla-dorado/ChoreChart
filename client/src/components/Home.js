import "./Home.css"
import ChoreChart from "../images/Chore Chart.jpg"

export const Home = () => {
    return (
        <div className="home" style={{ backgroundImage: `url(${ChoreChart})` }}>
        <div className="header">
            <h2>Welcome to Chore Chart</h2>
            <h5>Chore Chart is designed to help you manage your household more efficiently and effectively. Keep track of who is doing what, and when!</h5>
        </div>
        </div>
    )
}
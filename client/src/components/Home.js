import "./Home.css"
import "../index.css"
import ChoreChart from "../images/ChoreChart.jpg"

export const Home = () => {
    return (
        <div className="home">
            <div className="image" style={{ backgroundImage: `url(${ChoreChart})` }}></div>
            <div className="header">
                <h2>Welcome to Chore Chart</h2>
                <h5>Chore Chart is designed to help you manage your household more efficiently and effectively. Keep track of who is doing what, and when!</h5>
            </div>
        </div>
    )
}
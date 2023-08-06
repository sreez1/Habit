import {Outlet, Link} from "react-router-dom";

export const DashboardLayout = () =>(
    
    <div>
        <nav>
        <ul>
            <li>
                <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
                <Link to="/dashboard/create">Create Habit</Link>
            </li>
            <li>
                <Link to="/login"><button onClick={()=>window.localStorage.clear('token')}>Logout</button></Link>
            </li>
            
        </ul>
        <Outlet/>
        </nav>
       
    </div>
)
import {Outlet, Link} from "react-router-dom";

export const Layout = () =>(
    <div>
        <nav>
        <ul>
            <li>
            <Link to="/">Home</Link>
            </li>
            <li>
            <Link to="/login">Login</Link>
            </li>
            <li>
            <Link to="/registration">Registration</Link>
            </li>
        </ul>
        </nav>
        <Outlet />
    </div>
)
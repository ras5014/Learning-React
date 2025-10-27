import { Link, Outlet } from "react-router";

export default function MainLayout() {
    return (
        <>
            <div className="layout-background">
                <h1>I'm a Layout</h1>
                <h1>I will be visible in every children page</h1>
            </div>
            <nav>
                <ul>
                    <li><Link to={"/"}>Home</Link></li>
                    <li><Link to={"/about"}>About</Link></li>
                    <li><Link to={"/profiles"}>Profiles</Link></li>
                </ul>
            </nav>
            <Outlet />
        </>

    )
}

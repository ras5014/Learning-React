import { NavLink, Outlet } from "react-router"

export default function ProfilePage() {
    const profiles = [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
        { id: 3, name: "Alice Johnson" }
    ];
    return (
        <>
            <div className="layout-background">
                <h1>All Profiles Layout</h1>
                <ul>
                    {profiles.map((profile) => (
                        <li key={profile.id}>
                            {/* To highlight the active link we need to use NavLink and isActive in this way */}
                            <NavLink to={`/profiles/${profile.id}`} className={({ isActive }: { isActive: boolean }) => isActive ? "text-red-500 bg-amber-200 p-2" : ""}>{profile.name}</NavLink>
                        </li>
                    ))}
                </ul>
            </div>
            <Outlet />
        </>

    )
}

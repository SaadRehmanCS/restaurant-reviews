import { Link } from "react-router-dom"

export default function Header({ user, setUser }) {

    const logout = () => {
        setUser(null);
    }
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="/restaurants">Restaurant Reviews</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarText">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <Link to={"/restaurants"} className="nav-link">
                                <a aria-current="page">Restaurants</a>
                            </Link>
                        </li>
                        <li class="nav-item">
                            {
                                user ? (
                                    <a onClick={logout} className="nav-link" style={{ cursor: 'pointer' }}>
                                        Logout {user.name}
                                    </a>
                                ) : (
                                    <Link to={"/login"} className="nav-link">
                                        Login
                                    </Link>
                                )
                            }
                        </li>
                    </ul>
                    <span class="navbar-text">
                        Navbar text with an inline element
                    </span>
                </div>
            </div>
        </nav>
    );
}
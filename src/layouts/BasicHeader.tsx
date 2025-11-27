import type { JSX } from "react";
import { Link } from "react-router-dom";
import Logo from '../imgs/FontLabLogo.png';
import { Nav } from "../arrays/NavArrays";

export default function BasicHeader():JSX.Element{
    return(
        <div className="header-inner">
                <h1>
                    <Link to = "/">
                        <img src={Logo}/>
                    </Link>
                </h1>
                <nav>
                    <ul className="gnb">
                        {Nav.map(title => (
                            <li>
                                <Link to={title.path}>
                                    {title.text}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
        </div>
    )
}
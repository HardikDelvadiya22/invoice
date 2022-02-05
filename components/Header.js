import Link from 'next/link';
import React from 'react';

export default function Header() {
    return <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-5">
            <a className="navbar-brand">Invoice App</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active text-decoration-none">
                        <Link className="nav-link text-decoration-none" style={{textDecoration: "none"}}  href="/invoices">Invoices</Link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>;
}

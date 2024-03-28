import { Outlet, NavLink, useLocation } from 'react-router-dom';

import './Layout.css';
import { SignInButton, SignOutButton, useAuth } from '../api/useAuth.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareGithub } from '@fortawesome/free-brands-svg-icons';
import StackedLogo from './StackedLogo.jsx';

export function Layout() {
	const { user } = useAuth();
	const location = useLocation();

	return (
		<>
			<div className="Layout">
				<header className="Layout-header">
					<h1>Smart shopping list</h1>
					{!!user ? <SignOutButton /> : <SignInButton />}
				</header>
				<main className="Layout-main">
					<Outlet />
				</main>
				{location.pathname === '/' && (
					<div className="home-links">
						<a
							href="https://github.com/the-collab-lab/tcl-73-smart-shopping-list"
							target="_blank"
							rel="noopener noreferrer"
						>
							<FontAwesomeIcon icon={faSquareGithub} className="repo-icon" />
						</a>
						<a
							href="https://the-collab-lab.codes/"
							target="_blank"
							rel="noopener noreferrer"
							className="logoStack"
						>
							<StackedLogo />
						</a>
					</div>
				)}
				<nav className="Nav">
					<div className="Nav-container">
						<NavLink to="/" className="Nav-link">
							Home
						</NavLink>
						<NavLink to="/list" className="Nav-link">
							List
						</NavLink>
						<NavLink to="/manage-list" className="Nav-link">
							Manage List
						</NavLink>
					</div>
				</nav>
			</div>
		</>
	);
}

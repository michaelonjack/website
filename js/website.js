
const THEME_STORAGE_KEY = 'michaelonjack.com_theme';

jQuery(document).ready( function() {
	const themeButton = document.getElementById('theme-button');

	themeButton.onclick = toggleTheme

	// Default to the user's theme, or their stored preference.
	const stored = localStorage.getItem(THEME_STORAGE_KEY);
	const defaultIsLight = !(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
	setTheme({ light: stored ? stored === 'light' : defaultIsLight });
});

function setTheme({ light = true }) {

	const themeButton = document.getElementById('theme-button');

	if (light) {
		document.body.setAttribute('data-theme', 'light');
		themeButton.innerText = '🌙';
	} else {
		document.body.setAttribute('data-theme', 'dark');
		themeButton.innerText = '☀️';
	}
}

function toggleTheme() {
	const light = document.body.getAttribute('data-theme') !== 'light';
	setTheme({ light });

	localStorage.setItem(THEME_STORAGE_KEY, document.body.getAttribute('data-theme'));
}
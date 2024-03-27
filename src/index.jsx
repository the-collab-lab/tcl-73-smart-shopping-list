import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Theme } from '@radix-ui/themes';
import { App } from './App';

import './index.css';
import './custom-styles.css';

const root = createRoot(document.getElementById('root'));
root.render(
	<StrictMode>
		<Theme>
			<App />
		</Theme>
	</StrictMode>,
);

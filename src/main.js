import AppDefinition from 'getmp3-ui/app';
import { createApp } from 'vue';
import 'getmp3-ui/style/main.sass';
import 'material-icons/iconfont/material-icons.css';

const app = createApp(AppDefinition);
const appContainer = (() => {
	const appContainer = document.createElement('div');

	appContainer.style.display = 'contents';
	appContainer.style.margin = '0px';
	appContainer.style.padding = '0px';
	appContainer.style.width = '100%';
	appContainer.style.height = '100%';

	return appContainer;
})();

app.mount(appContainer);
document.body.appendChild(appContainer);

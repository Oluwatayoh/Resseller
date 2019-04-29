import { Injectable } from '@angular/core';

interface Scripts {
	name: string;
	src: string;
}

export const ScriptStore: Scripts[] = [
	{ name: 'jquery', src: '../../../assets/js/jquery.min.js' },
	{ name: 'bootstrap', src: '../../../assets/plugins/bootstrap/js/bootstrap.js' },
	{ name: 'bootstrap-select', src: '../../../assets/plugins/bootstrap-select/js/bootstrap-select.js' },
	{ name: 'jquery-slimscroll', src: '../../../assets/plugins/jquery-slimscroll/jquery.slimscroll.js' },
	{ name: 'waves', src: '../../../assets/plugins/node-waves/waves.js' },
	{ name: 'jquery-countto', src: '../../../assets/plugins/jquery-countto/jquery.countTo.js' },
	{ name: 'raphael', src: '../../../assets/plugins/raphael/raphael.min.js' },
	{ name: 'morries', src: '../../../assets/plugins/morrisjs/morris.js' },

	{ name: 'chartjs', src: '../../../assets/plugins/chartjs/Chart.bundle.js' },
	{ name: 'jquery-flot', src: '../../../assets/plugins/flot-charts/jquery.flot.js' },
	{ name: 'jquery-flot-resize', src: '../../../assets/plugins/flot-charts/jquery.flot.resize.js' },
	{ name: 'jquery-flot-pie', src: '../../../assets/plugins/flot-charts/jquery.flot.pie.js' },
	{ name: 'jquery-flot-categories', src: '../../../assets/plugins/flot-charts/jquery.flot.categories.js' },
	{ name: 'jquery-flot-time', src: '../../../assets/plugins/flot-charts/jquery.flot.time.js' },
	{ name: 'jquery-sparkline', src: '../../../assets/plugins/jquery-sparkline/jquery.sparkline.js' },
	{ name: 'admin', src: '../../../assets/js/admin.js' },
	{ name: 'index', src: '../../../assets/js/pages/index.js' },
	{ name: 'demo', src: '../../../assets/js/demo.js' }
];

declare var document: any;

@Injectable()
export class DynamicScriptLoaderService {
	private scripts: any = {};

	constructor() {
		ScriptStore.forEach((script: any) => {
			this.scripts[script.name] = {
				loaded: false,
				src: script.src
			};
		});
	}

	load(...scripts: string[]) {
		const promises: any[] = [];
		scripts.forEach((script) => promises.push(this.loadScript(script)));
		return Promise.all(promises);
	}

	loadScript(name: string) {
		return new Promise((resolve, reject) => {
			if (!this.scripts[name].loaded) {
				//load script
				let script = document.createElement('script');
				script.type = 'text/javascript';
				script.src = this.scripts[name].src;
				if (script.readyState) {
					//IE
					script.onreadystatechange = () => {
						if (script.readyState === 'loaded' || script.readyState === 'complete') {
							script.onreadystatechange = null;
							this.scripts[name].loaded = true;
							resolve({ script: name, loaded: true, status: 'Loaded' });
						}
					};
				} else {
					//Others
					script.onload = () => {
						this.scripts[name].loaded = true;
						resolve({ script: name, loaded: true, status: 'Loaded' });
					};
				}
				script.onerror = (error: any) => resolve({ script: name, loaded: false, status: 'Loaded' });
				document.getElementsByTagName('head')[0].appendChild(script);
			} else {
				resolve({ script: name, loaded: true, status: 'Already Loaded' });
			}
		});
	}
}

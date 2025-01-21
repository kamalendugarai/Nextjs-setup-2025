import chalk from 'chalk';

const show = {
	log: (...args: unknown[]) => {
		if (process.env.NODE_ENV === 'development') {
			// console.log(`%c${{ ...args }}`, 'color: #555; background: #fff;');
			console.log(chalk.bgGray.white(...args));
		}
	},
	error: (...args: unknown[]) => {
		if (process.env.NODE_ENV === 'development') {
			console.error(...args);
		}
	},
	warn: (...args: unknown[]) => {
		if (process.env.NODE_ENV === 'development') {
			console.warn(...args);
		}
	},
	info: (...args: unknown[]) => {
		if (process.env.NODE_ENV === 'development') {
			console.info(...args);
		}
	},
	debug: (...args: unknown[]) => {
		if (process.env.NODE_ENV === 'development') {
			console.debug(...args);
		}
	},
	trace: (...args: unknown[]) => {
		if (process.env.NODE_ENV === 'development') {
			console.trace(...args);
		}
	},
	table: (...args: unknown[]) => {
		if (process.env.NODE_ENV === 'development') {
			console.table(...args);
		}
	}
};
export default show;

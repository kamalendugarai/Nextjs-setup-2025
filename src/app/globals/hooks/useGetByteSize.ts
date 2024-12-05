// import { cookies } from 'next/headers'

const getByteSize = () => {
	const getByteSize = (str = '', unit = 'kb') => {
		const byteSize = new Blob([str], { type: 'text/plain' }).size;
		if (unit === 'kb') {
			return byteSize / 1024;
		} else if (unit === 'mb') {
			return byteSize / (1024 * 1024);
		}
	};
	return getByteSize;
};

export { getByteSize };

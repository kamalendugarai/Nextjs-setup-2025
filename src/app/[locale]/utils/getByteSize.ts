export const getByteSize = (str = '', unit = 'kb') => {
	const byteSize = new Blob([str], { type: 'text/plain' }).size;
	if (unit === 'mb') {
		return byteSize / (1024 * 1024);
	}
	return byteSize / 1024;
};

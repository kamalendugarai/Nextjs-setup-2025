import { getByteSize } from '@/app/[locale]/utils/getByteSize';

const getByteSizeHook = () => {
	return getByteSize;
};

export { getByteSizeHook };

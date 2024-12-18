import CryptoJS from 'crypto-js';
import { cookies } from 'next/headers';
import show from '@/app/globals/functions/console';
import { getByteSize } from './getByteSize';

const doEncrypt = async (elem: string, recog?: string, salt?: string) => {
	if (!!process.env.ENCRYPTSTORAGE?.trim()) {
		if (recog?.toLowerCase() === 'key') {
			const enCryptedValue = CryptoJS.SHA256(elem).toString();
			show.log(enCryptedValue);
			return enCryptedValue;
		}
		const salty = salt || process.env.NEXT_ENCRYPTION_SALT;
		const encrypted = CryptoJS.AES.encrypt(elem, salty as string).toString();

		return encrypted;
	}
	return elem;
};

const doDecrypt = async (elem: string, salt?: string) => {
	if (!!process.env.ENCRYPTSTORAGE?.trim()) {
		const salty = salt || process.env.NEXT_ENCRYPTION_SALT;
		const decryptedValue = CryptoJS.AES.decrypt(elem, salty as string).toString(
			CryptoJS.enc.Utf8
		);
		show.log(decryptedValue);
		return decryptedValue;
	}

	return elem;
};

const ownCookies = {
	cook: async (
		name: string,
		value: unknown,
		options: Record<string, unknown>
	) => {
		const cookieSize = getByteSize(value as string);
		if (cookieSize < 4) {
			const cookieStore = await cookies();
			const cookieName = await doEncrypt(name, 'key');
			const cookieValue = await doEncrypt(value as string);
			cookieStore.set(cookieName, cookieValue, {
				httpOnly: true,
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production',
				...options
			});
			show.log(cookieName, cookieValue);
			return cookieStore.get(cookieName);
		} else {
			console.log('Cookie size is too big to store in cookies');
		}
	},
	eat: async (name: string) => {
		const cookieStore = await cookies();
		const cookieName = await doEncrypt(name, 'key');
		const cookieValue = await doDecrypt(
			cookieStore.get(cookieName) as unknown as string
		);
		show.log(cookieName, cookieValue);
		return cookieValue;
	}
};

export default ownCookies;
export { doEncrypt, doDecrypt };

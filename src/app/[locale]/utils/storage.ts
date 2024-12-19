import CryptoJS from 'crypto-js';
// import show from '@/app/globals/functions/console';
/* eslint-disable @typescript-eslint/no-explicit-any */

const Storage = {
	defaultSalt: 'EkdxOTaM*pwy0@AwI8e2',
	enviro: !!process.env.ENCRYPTSTORAGE?.trim() || 'false',
	type: !!process.env.ENCRYPTSTORAGE?.trim() || 'localStorage',
	doEncrypt: function doEncrypt(elem: string, recog?: string, salt?: string) {
		if (/true/i.test(this.enviro.toString()) === true) {
			if (recog?.toLowerCase() === 'key') {
				return CryptoJS.SHA256(elem).toString();
			}
			const salty =
				salt || process.env.NEXT_ENCRYPTION_SALT || this.defaultSalt;
			const encrypted = CryptoJS.AES.encrypt(elem, salty).toString();

			return encrypted;
		}
		return elem;
	},
	doDecrypt: function doDecrypt(elem: string, salt?: string) {
		if (/true/i.test(this.enviro.toString()) === true) {
			const salty =
				salt || process.env.NEXT_ENCRYPTION_SALT || this.defaultSalt;
			return CryptoJS.AES.decrypt(elem, salty).toString(CryptoJS.enc.Utf8);
		}
		return elem;
	},
	add: function add(lots: { key: string; value: string; type?: string }[]) {
		const allPromises = lots.map((el) => {
			let returnedItem;
			if (Object.keys(el).length >= 2) {
				const keys: string[] = Object.keys(el);
				if (
					el.type &&
					(el.type === 'localStorage' ||
						el.type === 'sessionStorage' ||
						el.type.includes('local') ||
						el.type.includes('session'))
				) {
					if (el.type.includes('local')) {
						el.type = 'localStorage';
					}
					if (el.type.includes('session')) {
						el.type = 'sessionStorage';
					}
					if (el.type.includes('store')) {
						el.type = 'store';
					}
				}

				if (el.type !== 'store') {
					if (!keys.includes('key')) {
						// console.error('Key must be provided for ', el)
						returnedItem = Promise.reject(
							new Error(`Key must be provided for , ${el}`)
						);
					}
					if (!keys.includes('value')) {
						// console.error('Value must be provided for ', el)
						returnedItem = Promise.reject(
							new Error(`Value must be provided for , ${el}`)
						);
					}
					// console.log(tis.doEncrypt(el.key, 'key'), tis.doEncrypt(el.value));

					returnedItem = Promise.resolve().then(() => {
						// (window as { [key: string]: any })["DataManager"] as string;
						(window as { [key: string]: any })[
							(el.type ? el.type : this.type) as keyof typeof window
						].setItem(
							this.doEncrypt(el.key.toString(), 'key'),
							this.doEncrypt(el.value)
						);
						return true;
					});
				} else {
					// console.error(
					//     'Redux Store Handling needs to be implemented, this is due on Kamalendu!!!!'
					// )
				}
			} else {
				// console.error('Key and Value must be provided for ', el)
			}
			return returnedItem;
		});
		return Promise.all(allPromises)
			.then((resp) => resp)
			.catch((err) => err);
	},
	update: function update(lots: []) {
		this.add(lots);
	},
	retrieve: function retrieve(key: string, type?: string, promise = true) {
		if (key) {
			let tipe = this.type;
			if (
				type &&
				(type === 'localStorage' ||
					type === 'sessionStorage' ||
					type.includes('local') ||
					type.includes('session'))
			) {
				if (type.includes('local')) {
					tipe = 'localStorage';
				}
				if (type.includes('session')) {
					tipe = 'sessionStorage';
				}
				if (type.includes('store')) {
					tipe = 'store';
				}
			}
			const item = (window as { [key: string]: any })[
				(tipe || Storage.type) as keyof typeof window
			].getItem(Storage.doEncrypt(key, 'key'));
			if (item) {
				if (promise) {
					return Promise.resolve().then(() => Storage.doDecrypt(item));
				}
				return Storage.doDecrypt(item);
			}
			if (promise) {
				return Promise.reject(
					new Error(`Key [${key}] not found in [${tipe || Storage.type}]!`)
				);
				// .catch((err) => console.warn(err))
			}
			return undefined;
		}
		// console.error('Key must be provided to retireve its value!')
		return false;
	},
	remove: function remove(key: string, type?: string) {
		if (key) {
			let tipe = type || this.type;
			if (
				type &&
				(type === 'localStorage' ||
					type === 'sessionStorage' ||
					type.includes('local') ||
					type.includes('session'))
			) {
				if (type.includes('local')) {
					tipe = 'localStorage';
				}
				if (type.includes('session')) {
					tipe = 'sessionStorage';
				}
				if (type.includes('store')) {
					tipe = 'store';
				}
			}
			const eItem = this.doEncrypt(key, 'key');
			const item = (window as { [key: string]: any })[
				(tipe || this.type) as keyof typeof window
			].getItem(eItem);
			if (item) {
				return Promise.resolve().then(() =>
					(window as { [key: string]: any })[
						(tipe || this.type) as keyof typeof window
					].removeItem(eItem)
				);
			}
			return Promise.reject(
				new Error(`Key [${key}] not found in [${type || Storage.type}]!`)
			);
			// .catch((err) => console.warn(err))
		}
		// console.error('Key must be provided to remove it from the storage!')
		return false;
	}
};

export default Storage;

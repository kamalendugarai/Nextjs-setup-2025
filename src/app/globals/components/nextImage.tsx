import fs from "node:fs/promises"
import Image from 'next/image';
import { getPlaiceholder } from 'plaiceholder'
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props';

interface NextImageProps {
	src: string;
	effect?: PlaceholderValue;
	alt?: string;
	width?: number;
	height?: number;
	loading?: 'lazy' | 'eager'
	objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
	showInfo?: boolean
	decoding?: 'async' | 'sync'
	overrideSrc?: string,
	priority?: boolean
}

const NextImage = async ({ src = '', effect = 'blur', alt = '', width, height, loading = 'lazy', showInfo = false, decoding = 'async', priority, ...rest }: NextImageProps) => {
	let buffer = null;
	if (src.match(/https?:\/\//)?.length) {
		buffer = await fetch(src).then(async res => Buffer.from(await res.arrayBuffer()))
	} else {
		buffer = await fs.readFile(`./public/${src}`)
	}
	const { color, base64, metadata } = await getPlaiceholder(buffer);
	const hexColor = color.hex;
	const ultimWidth = width ? width : metadata.width;
	const ultimHeight = height ? height : metadata.height;
	return (
		<div className={`next-image relative w-[${ultimWidth}px] h-[${ultimHeight}px] bg-[${hexColor}]`}>
			{
				showInfo && <div className={`absolute top-0 left-0 w-full h-full list-disc items-center justify-center p-1 bg-black/[.7] overflow-scroll`}>
					{
						...Object.entries(metadata).map(([key, value]) => {
							return <div key={key} className="text-white text-sm">{key}: {value.toString()}</div>
						})
					}
				</div>
			}
			<Image
				src={src}
				placeholder={effect}
				blurDataURL={base64}
				alt={alt}
				width={ultimWidth}
				height={ultimHeight}
				loading={priority ? 'eager' : loading}
				decoding={decoding}

				{...rest}
			/>
		</div>
	);
};
export default NextImage;
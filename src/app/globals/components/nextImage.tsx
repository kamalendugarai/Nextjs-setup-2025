import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import fs from 'node:fs/promises';
import { getPlaiceholder } from 'plaiceholder';

interface NextImageProps {
	src: string;
	effect?: PlaceholderValue;
	alt?: string;
	width?: number;
	height?: number;
	loading?: 'lazy' | 'eager';
	objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
	showInfo?: boolean;
	decoding?: 'async' | 'sync';
	overrideSrc?: string;
	priority?: boolean;
}

const NextImage = async ({
	src = '',
	effect = 'blur',
	alt = '',
	width,
	height,
	loading = 'lazy',
	showInfo = false,
	decoding = 'async',
	priority,
	...rest
}: NextImageProps) => {
	let buffer = null;
	if (src.match(/https?:\/\//)?.length) {
		buffer = await fetch(src).then(async (res) =>
			Buffer.from(await res.arrayBuffer())
		);
	} else {
		buffer = await fs.readFile(`./public/${src}`);
	}
	const { color, base64, metadata } = await getPlaiceholder(buffer);
	const hexColor = color.hex;
	const ultimWidth = width ? width : metadata.width;
	const ultimHeight = height ? height : metadata.height;

	/**
	 * TailwindCSS doesn't support dynamic classes. The values shuld be hardcoded
	 * in the class names so that TailwindCSS can compile them at the build time.
	 * There is an option to use dynamic classes in TailwindCSS, called JIT (Just in Time).
	 * This feature is currently in preview. Preview features are not covered by semantic versioning
	 * and some details may change as we continue to refine them.
	 *
	 * I have noted this on 8th of December 2024.
	 *
	 * https://tailwindcss.com/docs/just-in-time-mode
	 */

	return (
		<div
			className={`next-image relative bg-[${hexColor}]}`}
			style={{
				width: `${ultimWidth}px`,
				height: `${showInfo ? (ultimHeight < 100 ? ultimHeight * 2 : ultimHeight) : ultimHeight}px`
			}}>
			{showInfo && (
				<div
					className={`absolute top-0 left-0 w-full h-full list-disc items-center justify-center p-1 bg-black/[.7] overflow-scroll`}>
					{...Object.entries(metadata).map(([key, value]) => {
						return (
							<div key={key} className='text-white text-sm'>
								{key}: {value.toString()}
							</div>
						);
					})}
				</div>
			)}
			<Image
				src={src}
				placeholder={ultimWidth > 40 && ultimHeight > 40 ? effect : 'empty'}
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

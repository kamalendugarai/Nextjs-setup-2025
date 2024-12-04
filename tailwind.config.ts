import type { Config } from 'tailwindcss';
const flowbite = require('flowbite-react/tailwind');

export default {
	darkMode: ['class'],
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'.src/app/globals/**/*.{js,ts,jsx,tsx,mdx}',
		flowbite.content()
	],
	theme: {
		extend: {
			fontSize: {
				sm: '1.4rem',
				base: '1.6rem',
				lg: '1.8rem',
				xl: '2rem',
				'2xl': '2.4rem',
				'3xl': '3rem',
				'4xl': '3.6rem',
				'5xl': '4.8rem',
				'6xl': '6rem',
				'7xl': '7.2rem',
				'8xl': '9.6rem',
				'9xl': '12.8rem'
			},
			letterSpacing: {
				tightest: '-0.12em',
				tighter: '-0.08em',
				tight: '-0.04em',
				normal: '0',
				wide: '0.04em',
				wider: '0.08em',
				widest: '0.4em'
			},
			spacing: {
				'0.5': '0.2rem', // 2px
				'1': '0.4rem', // 4px
				'1.5': '0.6rem', // 6px
				'2': '0.8rem', // 8px
				'2.5': '1rem', // 10px
				'3': '1.2rem', // 12px
				'3.5': '1.4rem', // 14px
				'4': '1.6rem', // 16px
				'5': '2rem', // 20px
				'6': '2.4rem', // 24px
				'7': '2.8rem', // 28px
				'8': '3.2rem', // 32px
				'9': '3.6rem', // 36px
				'10': '4rem', // 40px
				'11': '4.4rem', // 44px
				'12': '4.8rem', // 48px
				'14': '5.6rem', // 56px
				'16': '6.4rem', // 64px
				'20': '8rem', // 80px
				'24': '9.6rem', // 96px
				'28': '11.2rem', // 112px
				'32': '12.8rem', // 128px
				'36': '14.4rem', // 144px
				'40': '16rem', // 160px
				'44': '17.6rem', // 176px
				'48': '19.2rem', // 192px
				'52': '20.8rem', // 208px
				'56': '22.4rem', // 224px
				'60': '24rem', // 240px
				'64': '25.6rem', // 256px
				'72': '28.8rem', // 288px
				'80': '32rem', // 320px
				'96': '38.4rem' // 384px
			},
			padding: {
				'0.5': '0.2rem',
				'1': '0.4rem',
				'1.5': '0.6rem',
				'2': '0.8rem',
				'2.5': '1rem',
				'3': '1.2rem',
				'3.5': '1.4rem',
				'4': '1.6rem',
				'5': '2rem',
				'6': '2.4rem',
				'7': '2.8rem',
				'8': '3.2rem',
				'9': '3.6rem',
				'10': '4rem',
				'11': '4.4rem',
				'12': '4.8rem',
				'14': '5.6rem',
				'16': '6.4rem',
				'20': '8rem',
				'24': '9.6rem',
				'28': '11.2rem',
				'32': '12.8rem',
				'36': '14.4rem',
				'40': '16rem',
				'44': '17.6rem',
				'48': '19.2rem',
				'52': '20.8rem',
				'56': '22.4rem',
				'60': '24rem',
				'64': '25.6rem',
				'72': '28.8rem',
				'80': '32rem',
				'96': '38.4rem'
			},
			margin: {
				'0.5': '0.2rem',
				'1': '0.4rem',
				'1.5': '0.6rem',
				'2': '0.8rem',
				'2.5': '1rem',
				'3': '1.2rem',
				'3.5': '1.4rem',
				'4': '1.6rem',
				'5': '2rem',
				'6': '2.4rem',
				'7': '2.8rem',
				'8': '3.2rem',
				'9': '3.6rem',
				'10': '4rem',
				'11': '4.4rem',
				'12': '4.8rem',
				'14': '5.6rem',
				'16': '6.4rem',
				'20': '8rem',
				'24': '9.6rem',
				'28': '11.2rem',
				'32': '12.8rem',
				'36': '14.4rem',
				'40': '16rem',
				'44': '17.6rem',
				'48': '19.2rem',
				'52': '20.8rem',
				'56': '22.4rem',
				'60': '24rem',
				'64': '25.6rem',
				'72': '28.8rem',
				'80': '32rem',
				'96': '38.4rem'
			},
			width: {
				'0.5': '0.2rem',
				'1': '0.4rem',
				'1.5': '0.6rem',
				'2': '0.8rem',
				'2.5': '1rem',
				'3': '1.2rem',
				'3.5': '1.4rem',
				'4': '1.6rem',
				'5': '2rem',
				'6': '2.4rem',
				'7': '2.8rem',
				'8': '3.2rem',
				'9': '3.6rem',
				'10': '4rem',
				'11': '4.4rem',
				'12': '4.8rem',
				'14': '5.6rem',
				'16': '6.4rem',
				'20': '8rem',
				'24': '9.6rem',
				'28': '11.2rem',
				'32': '12.8rem',
				'36': '14.4rem',
				'40': '16rem',
				'44': '17.6rem',
				'48': '19.2rem',
				'52': '20.8rem',
				'56': '22.4rem',
				'60': '24rem',
				'64': '25.6rem',
				'72': '28.8rem',
				'80': '32rem',
				'96': '38.4rem'
			},
			height: {
				'0.5': '0.2rem',
				'1': '0.4rem',
				'1.5': '0.6rem',
				'2': '0.8rem',
				'2.5': '1rem',
				'3': '1.2rem',
				'3.5': '1.4rem',
				'4': '1.6rem',
				'5': '2rem',
				'6': '2.4rem',
				'7': '2.8rem',
				'8': '3.2rem',
				'9': '3.6rem',
				'10': '4rem',
				'11': '4.4rem',
				'12': '4.8rem',
				'14': '5.6rem',
				'16': '6.4rem',
				'20': '8rem',
				'24': '9.6rem',
				'28': '11.2rem',
				'32': '12.8rem',
				'36': '14.4rem',
				'40': '16rem',
				'44': '17.6rem',
				'48': '19.2rem',
				'52': '20.8rem',
				'56': '22.4rem',
				'60': '24rem',
				'64': '25.6rem',
				'72': '28.8rem',
				'80': '32rem',
				'96': '38.4rem'
			},
			size: {
				'0.5': '0.2rem',
				'1': '0.4rem',
				'1.5': '0.6rem',
				'2': '0.8rem',
				'2.5': '1rem',
				'3': '1.2rem',
				'3.5': '1.4rem',
				'4': '1.6rem',
				'5': '2rem',
				'6': '2.4rem',
				'7': '2.8rem',
				'8': '3.2rem',
				'9': '3.6rem',
				'10': '4rem',
				'11': '4.4rem',
				'12': '4.8rem',
				'14': '5.6rem',
				'16': '6.4rem',
				'20': '8rem',
				'24': '9.6rem',
				'28': '11.2rem',
				'32': '12.8rem',
				'36': '14.4rem',
				'40': '16rem',
				'44': '17.6rem',
				'48': '19.2rem',
				'52': '20.8rem',
				'56': '22.4rem',
				'60': '24rem',
				'64': '25.6rem',
				'72': '28.8rem',
				'80': '32rem',
				'96': '38.4rem'
			},
			lineHeight: {
				'0.5': '0.2rem',
				'1': '0.4rem',
				'1.5': '0.6rem',
				'2': '0.8rem',
				'2.5': '1rem',
				'3': '1.2rem',
				'3.5': '1.4rem',
				'4': '1.6rem',
				'5': '2rem',
				'6': '2.4rem',
				'7': '2.8rem',
				'8': '3.2rem',
				'9': '3.6rem',
				'10': '4rem',
				'11': '4.4rem',
				'12': '4.8rem',
				'14': '5.6rem',
				'16': '6.4rem',
				'20': '8rem',
				'24': '9.6rem',
				'28': '11.2rem',
				'32': '12.8rem',
				'36': '14.4rem',
				'40': '16rem',
				'44': '17.6rem',
				'48': '19.2rem',
				'52': '20.8rem',
				'56': '22.4rem',
				'60': '24rem',
				'64': '25.6rem',
				'72': '28.8rem',
				'80': '32rem',
				'96': '38.4rem'
			},
			borderSpacing: {
				'0.5': '0.2rem',
				'1': '0.4rem',
				'1.5': '0.6rem',
				'2': '0.8rem',
				'2.5': '1rem',
				'3': '1.2rem',
				'3.5': '1.4rem',
				'4': '1.6rem',
				'5': '2rem',
				'6': '2.4rem',
				'7': '2.8rem',
				'8': '3.2rem',
				'9': '3.6rem',
				'10': '4rem',
				'11': '4.4rem',
				'12': '4.8rem',
				'14': '5.6rem',
				'16': '6.4rem',
				'20': '8rem',
				'24': '9.6rem',
				'28': '11.2rem',
				'32': '12.8rem',
				'36': '14.4rem',
				'40': '16rem',
				'44': '17.6rem',
				'48': '19.2rem',
				'52': '20.8rem',
				'56': '22.4rem',
				'60': '24rem',
				'64': '25.6rem',
				'72': '28.8rem',
				'80': '32rem',
				'96': '38.4rem'
			},
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [
		require('cssnano')({
			preset: 'default'
		}),
		require('tailwindcss-animate'),
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/container-queries'),
		flowbite.plugin()
	]
} satisfies Config;

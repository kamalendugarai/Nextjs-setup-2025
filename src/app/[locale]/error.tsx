'use client';

// Error boundaries must be Client Components
// https://nextjs.org/docs/app/api-reference/file-conventions/error
import show from '../globals/functions/console';
import { useEffect } from 'react';

export default function Error({
	error,
	reset
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		show.error(error);
	}, [error]);

	return (
		<div>
			<h2>Something went wrong!</h2>
			<button
				onClick={
					// Attempt to recover by trying to re-render the segment
					() => reset()
				}>
				Try again
			</button>
		</div>
	);
}

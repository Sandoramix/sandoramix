import { frame, motion, useSpring } from "motion/react";
import {
	type FC,
	type PropsWithChildren,
	type RefObject,
	useEffect,
	useRef,
} from "react";
import { FaCode } from "react-icons/fa";
import type {SpringOptions} from "motion";

export const BaseLayout: FC<PropsWithChildren> = ({ children }) => {
	const ref = useRef<HTMLDivElement>(null);
	const { x, y } = useFollowPointer(ref);

	return (
		<main className="flex h-dvh w-dvw flex-col overflow-hidden bg-gradient-to-b from-neutral-950 from-55% to-red-800 text-neutral-200 select-none">
			<div className="z-20 flex w-full grow flex-col overflow-y-auto">
				{children}
			</div>
			<motion.div
				className={`z-10 h-10 w-10 text-3xl`}
				ref={ref}
				style={{ x, y }}
			>
				<FaCode className={"text-red-800/50"} />
			</motion.div>
		</main>
	);
};

const spring: SpringOptions = { damping: 10, stiffness: 69, restDelta: 0.001 };

export function useFollowPointer(ref: RefObject<HTMLDivElement | null>) {
	const x = useSpring(0, spring);
	const y = useSpring(0, spring);

	useEffect(() => {
		if (!ref.current) return;

		const handlePointerMove = (event: MouseEvent | TouchEvent) => {
			let clientX = 0;
			let clientY = 0;
			if (event instanceof MouseEvent) {
				clientX = event.clientX;
				clientY = event.clientY;
			}
			if (event instanceof TouchEvent && event.touches.length > 0) {
				const ev = event.touches[0];
				if (!ev) return;
				clientX = ev.clientX;
				clientY = ev.clientY;
			}

			const element = ref.current!;

			frame.read(() => {
				x.set(clientX - element.offsetLeft - element.offsetWidth / 2);
				y.set(clientY - element.offsetTop - element.offsetHeight / 2);
			});
		};

		window.addEventListener("pointermove", handlePointerMove);
		window.addEventListener("touchmove", handlePointerMove);

		return () => {
			window.removeEventListener("pointermove", handlePointerMove);
			window.removeEventListener("touchmove", handlePointerMove);
		};
	}, []);

	return { x, y };
}

import { type FC, useEffect, useRef } from "react";
import { splitText } from "motion-plus";
import { animate, hover } from "motion";
import { useMotionValue } from "motion/react";

type Props = {
	className?: string;
	text: string;
	automaticRestore?: boolean;
	automaticRestoreDelay?: number;
};

export const ScatterText: FC<Props> = ({ text, className, automaticRestore = false, automaticRestoreDelay = 30 }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const velocityX = useMotionValue(0);
	const velocityY = useMotionValue(0);
	const prevEventTime = useRef(performance.now());
	const prevTouch = useRef({ x: 0, y: 0 });
	const charElements = useRef<HTMLElement[]>([]);
	const restoreTimeout = useRef<NodeJS.Timeout | null>(null);

	const RESTORE_DELAY = automaticRestoreDelay * 1000;

	useEffect(() => {
		if (!containerRef.current) return;

		const { chars } = splitText(containerRef.current);
		charElements.current = chars;

		const updateVelocity = (deltaX: number, deltaY: number) => {
			const now = performance.now();
			const timeSinceLastEvent = (now - prevEventTime.current) / 1000;
			prevEventTime.current = now;

			if (timeSinceLastEvent > 0) {
				velocityX.set(deltaX / timeSinceLastEvent);
				velocityY.set(deltaY / timeSinceLastEvent);
			}
		};

		const triggerAnimation = (element: HTMLElement) => {
			const vx = velocityX.get();
			const vy = velocityY.get();
			const speed = Math.sqrt(vx * vx + vy * vy);
			const angle = Math.atan2(vy, vx);
			const distance = speed * 0.1;

			const dx = Math.cos(angle) * distance;
			const dy = Math.sin(angle) * distance;

			animate(element, { x: dx, y: dy }, { type: "spring", stiffness: 100, damping: 75 });

			resetRestoreTimer();
		};

		const resetRestoreTimer = () => {
			if (!automaticRestore) return;

			if (restoreTimeout.current) clearTimeout(restoreTimeout.current);

			restoreTimeout.current = setTimeout(() => {
				for (const char of charElements.current) {
					animate(char, { x: 0, y: 0 }, { type: "spring", stiffness: 80, damping: 20 });
				}
			}, RESTORE_DELAY);
		};

		hover(chars, (el) => triggerAnimation(el as HTMLElement));

		const handlePointerMove = (event: PointerEvent) => {
			updateVelocity(event.movementX, event.movementY);
		};

		const handleTouchStart = (event: TouchEvent) => {
			const touch = event.touches[0];
			if (touch) prevTouch.current = { x: touch.clientX, y: touch.clientY };
		};

		const handleTouchMove = (event: TouchEvent) => {
			const touch = event.touches[0];
			if (!touch) return;

			const deltaX = touch.clientX - prevTouch.current.x;
			const deltaY = touch.clientY - prevTouch.current.y;
			prevTouch.current = { x: touch.clientX, y: touch.clientY };
			updateVelocity(deltaX, deltaY);

			for (const char of charElements.current) {
				const rect = char.getBoundingClientRect();
				if (touch.clientX >= rect.left && touch.clientX <= rect.right && touch.clientY >= rect.top && touch.clientY <= rect.bottom) {
					triggerAnimation(char);
				}
			}
		};

		document.addEventListener("pointermove", handlePointerMove);
		document.addEventListener("touchstart", handleTouchStart, { passive: true });
		document.addEventListener("touchmove", handleTouchMove, { passive: true });

		return () => {
			document.removeEventListener("pointermove", handlePointerMove);
			document.removeEventListener("touchstart", handleTouchStart);
			document.removeEventListener("touchmove", handleTouchMove);
			if (restoreTimeout.current) clearTimeout(restoreTimeout.current);
		};
	}, [automaticRestore, RESTORE_DELAY]);

	return (
		<div className={className} ref={containerRef}>
			{text}
		</div>
	);
};

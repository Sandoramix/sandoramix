import { frame, motion, useSpring } from "motion/react"
import {type FC, type PropsWithChildren, type RefObject, useEffect, useRef} from "react"
import { FaCode } from "react-icons/fa";

export const BaseLayout: FC<PropsWithChildren> = ({ children }) => {
	const ref = useRef<HTMLDivElement>(null)
	const { x, y } = useFollowPointer(ref)

	return (
		<main className="flex h-dvh w-dvw flex-col bg-gradient-to-b from-neutral-950 from-55% to-red-800 text-neutral-200 overflow-hidden">
			<header className="flex flex-col items-center justify-center gap-2 p-4 text-neutral-200"></header>
			<div className="z-20 flex w-full grow flex-col overflow-y-auto">{children}</div>
			<motion.div className={`z-10 w-10 text-3xl h-10`} ref={ref} style={{ x, y }} >
				<FaCode className={"text-red-800/50"} />
			</motion.div>
		</main>
	);
};


const spring = { damping: 4, stiffness: 35, restDelta: 0.001 }

export function useFollowPointer(ref: RefObject<HTMLDivElement | null>) {
	const x = useSpring(0, spring)
	const y = useSpring(0, spring)

	useEffect(() => {
		if (!ref.current) return

		const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
			const element = ref.current!

			frame.read(() => {
				x.set(clientX - element.offsetLeft - element.offsetWidth / 2)
				y.set(clientY - element.offsetTop - element.offsetHeight / 2)
			})
		}

		window.addEventListener("pointermove", handlePointerMove)

		return () =>
			window.removeEventListener("pointermove", handlePointerMove)
	}, [])

	return { x, y }
}

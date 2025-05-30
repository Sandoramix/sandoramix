import { BaseLayout } from "~/components/layout/BaseLayout";
import { Maitree } from "next/font/google";
import { motion } from "motion/react";

const usernameFont = Maitree({
	weight: "700",
	subsets: ["latin"],
});

export default function Home() {
	return (
		<BaseLayout>
			<div className="flex w-full grow flex-col items-center justify-center capitalize">
				<motion.div
					initial={{ opacity: 0, scale: 0 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{
						duration: 0.4,
						scale: {
							type: "spring",
							visualDuration: 0.4,
							bounce: 0.4,
						},
					}}
					className={`${usernameFont.className} text-5xl font-bold uppercase`}
				>
					Sandoramix
				</motion.div>
			</div>
		</BaseLayout>
	);
}

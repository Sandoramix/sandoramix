import { BaseLayout } from "~/components/layout/BaseLayout";
import { Maitree } from "next/font/google";
import { motion } from "motion/react";
import Link from "next/link";
import {FaGithub, FaInstagram, FaLinkedin, FaYoutube} from "react-icons/fa";
import React from "react";

const usernameFont = Maitree({
	weight: "700",
	subsets: ["latin"],
});

export default function Home() {
	const links: { href: string; Icon: React.JSX.Element }[] = [
		{
			href: "https://github.com/sandoramix",
			Icon: <FaGithub className={"text-white"} />,
		},
		{
			href: "https://www.linkedin.com/in/oleksandr-dudniak/",
			Icon: <FaLinkedin className={"text-white"} />,
		},
		{
			href: "https://instagram.com/sandoramixer",
			Icon: <FaInstagram className={"text-white"} />,
		},
		{
			href: "https://www.youtube.com/@Sandoramixer",
			Icon: <FaYoutube className={"text-white"} />,
		},
	];

	return (
		<BaseLayout>
			<div className="flex w-full grow flex-col items-center justify-center capitalize">
				<motion.div
					initial={{ opacity: 0.25, scale: 0.25 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{
						duration: 0.5,
						scale: {
							type: "spring",
							visualDuration: 0.5,
							bounce: 0.4,
							power: 10
						},
					}}
					className={`${usernameFont.className} text-5xl font-bold uppercase`}
				>
					Sandoramix
				</motion.div>
				<div className={`mt-12 flex justify-center gap-4 text-4xl`}>
					{links.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							target={"_blank"}
						>
							<motion.div
								whileHover={{ scale: 1.2 }}
								whileTap={{ scale: 0.8 }}
							>
								{link.Icon}
							</motion.div>
						</Link>
					))}
				</div>
			</div>
		</BaseLayout>
	);
}

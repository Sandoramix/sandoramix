import { BaseLayout } from "~/components/layout/BaseLayout";
import { Maitree, Edu_QLD_Beginner, Exo_2 } from "next/font/google";
import { motion } from "motion/react";
import Link from "next/link";
import { FaGithub, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import React from "react";
import { ScatterText } from "~/components/motion/ScatterText";
import { ProjectCard, type Project } from "~/components/projects/ProjectCard";

const usernameFont = Maitree({
	weight: "700",
	subsets: ["latin"],
});
const eduFont = Edu_QLD_Beginner({
	weight: "700",
	subsets: ["latin"],
});
const exo2Font = Exo_2({
	weight: "700",
	subsets: ["latin"],
});

const projects: Project[] = [
	{
		title: "RF4 Interactive Tools",
		description: "Companion web app for Russian Fishing 4 — an interactive, zoomable map pinning suggested fishing spots per lake, paired with a constantly updated fish database and lure/bait suggestions for the community.",
		tags: ["Next.js", "TypeScript", "Interactive Map", "Game Companion App", "Vercel", "PostgreSQL", "Community Tool"],
		liveUrl: "https://rf4it.sandoramix.dev",
	},
	{
		title: "42-findmypeer",
		description: "42Firenze's local web app for instantly seeing which peers are on campus and where — built to cut the wandering-the-building time before a peer evaluation or a quick study group.",
		tags: ["JavaScript", "TailwindCSS", "Real-time", "Local Network", "Web App", "Campus Tool", "42 School"],
		githubUrl: "https://github.com/Sandoramix/42-findmypeer",
	},
	{
		title: "cub3D",
		description: "Wolfenstein-style raycasting 3D engine written in C from scratch — custom renderer, texture mapping, minimap and collision detection with zero external graphics libraries beyond MinilibX.",
		tags: ["C", "Raycasting", "Computer Graphics", "Game Engine", "Low-Level Programming", "Linear Algebra", "42 School"],
		githubUrl: "https://github.com/Sandoramix/42-cub3D",
	},
	{
		title: "minishell",
		description: "A POSIX-compliant shell built in C from the ground up — handles pipes, redirections, environment variables, builtins, quoting and signal handling, mirroring real bash behavior.",
		tags: ["C", "Unix", "Process Management", "Signals", "Lexing & Parsing", "Systems Programming", "42 School"],
		githubUrl: "https://github.com/Sandoramix/42-minishell",
	},
	{
		title: "42cursus",
		description: "The full 42Firenze core curriculum, project by project — from low-level C and algorithmic data structures to containerized services, each one solved solo with strict norm and zero memory leaks.",
		tags: ["C", "C++", "Docker", "Algorithms", "Data Structures", "Systems Programming", "42 School"],
		githubUrl: "https://github.com/Sandoramix/42cursus",
	},
	{
		title: "SpotiShortcut",
		description: "A lightweight Python background tool that binds global keyboard shortcuts to Spotify actions — like/save, skip, play/pause — so playback control never needs window focus.",
		tags: ["Python", "Productivity Tool", "OS Automation", "Spotify API", "Background Service", "Desktop Utility"],
		githubUrl: "https://github.com/Sandoramix/spotishortcut",
	},
];

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
			<div className=" flex w-full shrink-0 flex-col items-center justify-center gap-3 py-16 text-center capitalize">
				<ScatterText className={`text-shadow-lg text-shadow-black text-2xl text-neutral-800 uppercase ${exo2Font.className}`} text={"Oleksandr Dudniak"} automaticRestore={true} automaticRestoreDelay={4.5} />
				<motion.div
					initial={{ opacity: 0.25, scale: 0.25 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{
						duration: 0.5,
						scale: {
							type: "spring",
							visualDuration: 0.5,
							bounce: 0.4,
							power: 10,
						},
					}}
					className={`${usernameFont.className} text-3xl font-bold uppercase select-none`}
				>
					<h1>
						<ScatterText className={`text-shadow-lg text-shadow-red-950`} text={"Sandoramix"} automaticRestoreDelay={3} automaticRestore={true} />
					</h1>
				</motion.div>

				<h3 className={`text-shadow-lg text-shadow-black text-base text-neutral-300 ${eduFont.className}`}>
					<ScatterText text={"Software Developer"} automaticRestoreDelay={6} automaticRestore={true} />
				</h3>
				<div className={`mt-12 flex justify-center gap-4 text-4xl`}>
					{links.map((link) => (
						<Link key={link.href} href={link.href} target={"_blank"}>
							<motion.div tabIndex={-1} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
								{link.Icon}
							</motion.div>
						</Link>
					))}
				</div>
			</div>

			<section className="w-full px-6 pb-16">
				<h2 className={`mb-8 text-center text-2xl font-bold text-neutral-100 uppercase ${eduFont.className}`}>Projects</h2>
				<div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{projects.map((project) => (
						<ProjectCard key={project.title} project={project} />
					))}
				</div>
			</section>
		</BaseLayout>
	);
}

import { type FC } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { FaGithub, FaArrowUpRightFromSquare } from "react-icons/fa6";

export type Project = {
	title: string;
	description: string;
	tags: string[];
	githubUrl?: string;
	liveUrl?: string;
};

export const ProjectCard: FC<{ project: Project }> = ({ project }) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-50px" }}
			transition={{ duration: 0.4 }}
			whileHover={{ scale: 1.02 }}
			className="flex flex-col gap-2 rounded-xl border border-neutral-800 bg-neutral-900/60 p-5 text-left backdrop-blur-sm transition-colors hover:border-red-800/60"
		>
			<div className="flex items-center justify-between gap-2">
				<h4 className="text-lg font-bold text-neutral-100">{project.title}</h4>
				<div className="flex gap-3 text-lg text-neutral-400">
					{project.githubUrl && (
						<Link href={project.githubUrl} target="_blank" aria-label={`${project.title} GitHub repository`}>
							<FaGithub className="transition-colors hover:text-white" />
						</Link>
					)}
					{project.liveUrl && (
						<Link href={project.liveUrl} target="_blank" aria-label={`${project.title} live site`}>
							<FaArrowUpRightFromSquare className="transition-colors hover:text-red-500" />
						</Link>
					)}
				</div>
			</div>
			<p className="text-sm text-neutral-400">{project.description}</p>
			<div className="mt-2 flex flex-wrap gap-2">
				{project.tags.map((tag) => (
					<span key={tag} className="rounded-full bg-red-900/30 px-2 py-0.5 text-xs text-red-300">
						{tag}
					</span>
				))}
			</div>
		</motion.div>
	);
};

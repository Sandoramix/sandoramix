import { type AppType } from "next/app";
import { Geist } from "next/font/google";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Head from "next/head";

const geist = Geist({
	subsets: ["latin"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
	return (
		<>
			<Head>
				<title>Sandoramix</title>
				<meta
					name="description"
					content="Sandoramix's personal website. A software developer that likes to play with code."
				/>
				<link rel="icon" href="/favicon.ico" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<meta name="theme-color" content="#000000" />
				<link rel="apple-touch-icon" href="/favicon.ico" />
				<meta
					name="keywords"
					content="Sandoramix, Sandor, Odudniak, odudniak, sandoramix, software, developer, code, coding, games, gamedev, gaming, gamdev"
				/>
				<meta name="author" content="Sandoramix" />
				<meta name="copyright" content="Sandoramix @2025" />
				<meta property="og:title" content="Sandoramix" />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://sandoramix.dev" />
			</Head>
			<div className={geist.className}>
				<Component {...pageProps} />
			</div>
		</>
	);
};

export default api.withTRPC(MyApp);

import type { Metadata } from "next"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import "../public/assets/css/rentaly-style.css";
import "../public/assets/css/rentaly-coloring.css";
import "../public/assets/css/dashboard-rentaly.css";
import "../public/assets/css/dashboard-banner-rentaly.css";
import { Urbanist } from "next/font/google"
import Providers from "./Providers"
import "@/node_modules/react-modal-video/css/modal-video.css"
import "/public/assets/css/main.css"

const urbanist = Urbanist({
	weight: ['300', '400', '500', '600', '700', '800', '900'],
	subsets: ['latin'],
	variable: "--urbanist",
	display: 'swap',
})

export const metadata: Metadata = {
	title: "Sajilo - Sajilo Car Rental Service",
	description: "Sajilo - Car Rental Service in Nepal",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={`${urbanist.variable}`}>
				<Providers>
					{children}
				</Providers>
			</body>
		</html>
	)
}

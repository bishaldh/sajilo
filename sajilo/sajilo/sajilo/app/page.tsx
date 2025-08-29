import Layout from "@/components/layout/Layout"
import App from "@/components/sections/App"
import Brand2 from "@/components/sections/Brand2"
import Categories2 from "@/components/sections/Categories2"
import Cta4 from "@/components/sections/Cta4"
import Cta5 from "@/components/sections/Cta5"
import Hero2 from "@/components/sections/Hero2"
import Review2 from "@/components/sections/Review2"
import Static1 from "@/components/sections/Static1"
import Team1 from "@/components/sections/Team1"
import Testimonials from "@/components/sections/Testimonials"
import WhyUs1 from "@/components/sections/WhyUs1"

export default function Home() {
	return (
		<>
			<Layout headerStyle={2} footerStyle={1}>
				<Hero2 />
				<Categories2 />
				<Cta4 />
				<Review2 />
				<Static1 />
				<Brand2 />
				<Team1 />
				<Cta5 />
				<Testimonials />
				<WhyUs1 />
				<App />
			</Layout>
		</>
	)
}
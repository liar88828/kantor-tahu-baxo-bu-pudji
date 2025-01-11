import { About, Ceremony, ContactUs, Footer, Header, Hero, OurProducts } from "@/app/components/landing/landing.page";

export default async function HomePage() {
    return <>
        <Header/>
        <main className='container px-5'>
            <Hero/>
            <About/>
            <OurProducts/>
            <Ceremony/>
            <ContactUs/>
        </main>
        <Footer/>
    </>
}


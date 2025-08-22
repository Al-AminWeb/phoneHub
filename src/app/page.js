import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductHighlights from "@/components/ProductHighlights";
import Footer from "@/components/Footer";

export default function HomePage() {
    return (
        <div>
            <Navbar />
            <Hero />
            <ProductHighlights />
            <Footer />
        </div>
    );
}

import JobListing from "../components/JobListing/JobListing";
import TrustedCompanies from "../components/TrustedCompanies/TrustedCompanies";
import Footer from "../components/Footer/Footer";

function Home() {
    return (
        <>
            <JobListing showHero={true} />

            <TrustedCompanies />

            <Footer />
        </>
    );
}

export default Home;
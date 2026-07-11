import "./TrustedCompanies.css";

function TrustedCompanies() {

    const companies = [
        "Google",
        "Microsoft",
        "Amazon",
        "Adobe",
        "TCS",
        "Infosys",
        "Accenture",
        "IBM",
    ];

    return (
        <section className="trusted">

            <p>Trusted by leading recruiters</p>

            <div className="trusted-list">

                {companies.map((company) => (

                    <span key={company}>
                        {company}
                    </span>

                ))}

            </div>

        </section>
    );

}

export default TrustedCompanies;
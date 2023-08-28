import { useParams } from "react-router-dom"

import HeaderLanding from "../../../components/Landing/HeaderLanding"
import FooterLanding from "../../../components/Landing/FooterLanding"
import { useEffect, useState } from "react";
import axios from "../../../utils/axios";

const LandingDocs = () => {
    const { document_type } = useParams()

    const [globalConfigLandingFooter, setGlobalConfigLandingFooter] = useState(null);

    useEffect(() => {
        axios
            .get("/api/admin/settings/setting")
            .then(({ data }) => {
                setGlobalConfigLandingFooter(data[0].settings[0].landing.footer)
            })
            .catch(err => console.log(err));
    }, []);

    if (globalConfigLandingFooter) {
        return (<div className="docsLanding">
            <HeaderLanding />
            <div className="docsLanding__main">
                <div class="containerLanding">
                    <h1 className="docsLanding__main-title">{document_type === "license"
                        ? "Лицензионный договор"
                        : document_type === "offert"
                            ? "Договор оферты"
                            : "Политика конфиденциальности"}</h1>
                    <p className="docsLanding__main-text">
                        {document_type === "license"
                            ? globalConfigLandingFooter.main.license
                            : document_type === "offert"
                                ? globalConfigLandingFooter.main.offert
                                : globalConfigLandingFooter.main.politic}
                    </p>
                </div>
            </div>
            <FooterLanding data={globalConfigLandingFooter}/>
        </div>)
    }

}

export default LandingDocs
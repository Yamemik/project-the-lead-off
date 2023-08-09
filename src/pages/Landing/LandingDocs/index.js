import { useParams } from "react-router-dom"

import HeaderLanding from "../../../components/Landing/HeaderLanding"
import FooterLanding from "../../../components/Landing/FooterLanding"

const LandingDocs = () => {
    const { document_type } = useParams()

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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore sit fugit alias! Voluptatem, accusantium quidem itaque officiis odio deserunt praesentium error rem similique dolore ullam veniam non laborum corrupti commodi?
                    Delectus, illum impedit rerum quam eius vitae explicabo iusto, facere temporibus quo similique. Quisquam facere, accusantium inventore possimus natus ex amet doloribus maxime, illo sed fugiat soluta, rem hic iure?
                    Beatae exercitationem libero, assumenda fuga sint repellendus dolore quae architecto, aliquid dignissimos, rem numquam. Iste dolorem excepturi veniam incidunt. Doloribus id reiciendis reprehenderit quia odit eum molestiae sequi porro aspernatur!
                    Impedit, hic! Laudantium non hic voluptate dolorum. Suscipit assumenda enim delectus laudantium asperiores eligendi? Veritatis nobis quibusdam, vitae distinctio voluptatem hic officiis reprehenderit fuga culpa delectus incidunt nulla. Voluptates, facilis.
                    Rem nisi ab porro enim perspiciatis, blanditiis delectus cumque, consequatur quaerat possimus ducimus voluptates suscipit illo tempora ullam animi soluta natus dolorem reiciendis eveniet. Voluptas, ullam. Suscipit est facere excepturi.
                </p>
            </div>
        </div>
        <FooterLanding />
    </div>)

}

export default LandingDocs
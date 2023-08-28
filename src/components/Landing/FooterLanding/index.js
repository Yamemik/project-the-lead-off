import "./FooterLanding.scss"

const FooterLanding = ({data}) => {
    return (
        <footer className="footerLanding">
            <div className="footerLanding__banner containerLanding">
                <svg className="footerLanding__banner-diamond" xmlns="http://www.w3.org/2000/svg" width="134" height="134" viewBox="0 0 134 134" fill="none">
                    <g opacity="0.25">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M53.3486 11.1667C53.3484 11.3113 53.3381 11.4577 53.3171 11.6049L48.239 47.1518H85.761L80.6828 11.6049C80.6618 11.4577 80.6515 11.3113 80.6513 11.1667H53.3486ZM47.1202 11.1667L41.9795 47.1518H7.36572L27.9165 11.1667H47.1202ZM8.21737 53.3484L61.9058 116.813L42.3783 53.3484H8.21737ZM72.095 116.81L125.782 53.3484H91.6216L72.095 116.81ZM126.634 47.1518L106.083 11.1667H86.8797L92.0204 47.1518H126.634ZM67 112.298L85.1384 53.3484H48.8616L67 112.298Z" fill="white" />
                    </g>
                </svg>
                <div className="footerLanding__banner-info">
                    <h6 className="footerLanding__banner-info-title">{data.preview.title}</h6>
                    <p className="footerLanding__banner-info-text">{data.preview.text}</p>
                </div>
                <a className="bannerLanding__info-link" href="/platform/demo">
                    {data.preview.button}
                </a>
                <div className="footerLanding__banner-infoMobile">
                <div className="footerLanding__banner-info">
                    <h6 className="footerLanding__banner-info-title">{data.preview.title}</h6>
                    <p className="footerLanding__banner-info-text">{data.preview.text}</p>
                </div>
                <a className="bannerLanding__info-link" href="/platform/demo">
                    {data.preview.button}
                </a>
                </div>
            </div>
            <div className="footerLanding__main">
                <div class="containerLanding">
                    <div class="footerLanding__main-about">
                        <div class="footerLanding__main-about-logo">
                            <svg class="footerLanding__main-about-logo-top" xmlns="http://www.w3.org/2000/svg" width="155" height="18" viewBox="0 0 155 18" fill="none" onClick={() => window.location.href = "/landing"}>
                                <path d="M3.84 0.336V13.44H9.84V17.136H0V0.336H3.84Z" fill="white" />
                                <path d="M14.8913 10.464V13.44H21.6112V17.136H11.0513V0.336H21.4913V4.032H14.8913V6.816H20.8913V10.464H14.8913Z" fill="white" />
                                <path d="M38.4122 17.136H34.2122L33.3722 14.496H27.1322L26.2922 17.136H22.0922L27.8042 0.336H32.7002L38.4122 17.136ZM30.2522 4.728L28.2842 10.896H32.2202L30.2522 4.728Z" fill="white" />
                                <path d="M39.3647 0.336H46.0847C48.3887 0.336 50.3247 1.144 51.8927 2.76C53.4607 4.376 54.2447 6.368 54.2447 8.736C54.2447 11.12 53.4607 13.12 51.8927 14.736C50.3407 16.336 48.4047 17.136 46.0847 17.136H39.3647V0.336ZM43.2047 13.44H46.0847C47.4127 13.44 48.4847 13.016 49.3007 12.168C50.1327 11.32 50.5487 10.176 50.5487 8.736C50.5487 7.296 50.1327 6.16 49.3007 5.328C48.4847 4.464 47.4127 4.032 46.0847 4.032H43.2047V13.44Z" fill="white" />
                                <path d="M65.0437 11.688H55.9238V8.232H65.0437V11.688Z" fill="white" />
                                <path d="M81.6517 14.952C79.9557 16.632 77.8917 17.472 75.4597 17.472C73.0277 17.472 70.9637 16.632 69.2677 14.952C67.5717 13.272 66.7237 11.2 66.7237 8.736C66.7237 6.272 67.5717 4.2 69.2677 2.52C70.9637 0.84 73.0277 0 75.4597 0C77.8917 0 79.9557 0.84 81.6517 2.52C83.3477 4.2 84.1957 6.272 84.1957 8.736C84.1957 11.2 83.3477 13.272 81.6517 14.952ZM70.5637 8.736C70.5637 10.208 71.0277 11.408 71.9557 12.336C72.8838 13.264 74.0518 13.728 75.4597 13.728C76.8517 13.728 78.0117 13.264 78.9397 12.336C79.8837 11.392 80.3557 10.192 80.3557 8.736C80.3557 7.28 79.8837 6.08 78.9397 5.136C78.0117 4.208 76.8517 3.744 75.4597 3.744C74.0518 3.744 72.8838 4.208 71.9557 5.136C71.0277 6.064 70.5637 7.264 70.5637 8.736Z" fill="white" />
                                <path d="M96.0778 0.336V4.032H89.7178V7.272H95.9578V10.968H89.7178V17.136H85.8778V0.336H96.0778Z" fill="white" />
                                <path d="M108.067 0.336V4.032H101.707V7.272H107.947V10.968H101.707V17.136H97.8666V0.336H108.067Z" fill="white" />
                                <path d="M112.86 15.192C112.86 15.816 112.636 16.352 112.188 16.8C111.74 17.248 111.204 17.472 110.58 17.472C109.956 17.472 109.42 17.248 108.972 16.8C108.524 16.352 108.3 15.816 108.3 15.192C108.3 14.568 108.524 14.032 108.972 13.584C109.42 13.136 109.956 12.912 110.58 12.912C111.204 12.912 111.74 13.136 112.188 13.584C112.636 14.032 112.86 14.568 112.86 15.192Z" fill="white" />
                                <path d="M124.267 9.456V0.336H128.107V17.136H125.227L118.747 8.016V17.136H114.907V0.336H117.787L124.267 9.456Z" fill="white" />
                                <path d="M134.345 10.464V13.44H141.065V17.136H130.505V0.336H140.945V4.032H134.345V6.816H140.345V10.464H134.345Z" fill="white" />
                                <path d="M141.551 0.336H154.031V4.032H149.711V17.136H145.871V4.032H141.551V0.336Z" fill="white" />
                            </svg>
                            <p class="footerLanding__main-about-logo-bottom">система управления лидами</p>
                        </div>
                        <div class="footerLanding__main-about-rightsReserved">
                            {data.main.copyright}
                        </div>
                    </div>
                    {/* <div class="footerLanding__main-menu">
                        <a href="/" class="footerLanding__main-menu-link">Menu 1</a>
                        <a href="/" class="footerLanding__main-menu-link">Menu 2</a>
                        <a href="/" class="footerLanding__main-menu-link">Menu 3</a>
                        <a href="/" class="footerLanding__main-menu-link">Menu 4</a>
                        <a href="/" class="footerLanding__main-menu-link">Menu 5</a>
                    </div> */}
                    <div class="footerLanding__main-contacts">
                        <div class="footerLanding__main-contacts-row">
                            <svg className="footerLanding__main-contacts-row-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M6.72229 1.97344L3.25431 2.35877C2.32462 2.46207 1.60764 3.19943 1.70526 4.12973C1.94931 6.4554 3.0987 11.0411 8.02806 15.9705C12.9574 20.8998 17.5437 22.0499 19.8698 22.2943C20.8003 22.3921 21.5379 21.6751 21.6412 20.7452L22.0265 17.2776C22.1146 16.485 21.7233 15.7158 21.0308 15.3202L18.5467 13.9011C17.7636 13.4538 16.7781 13.5858 16.1404 14.2235L15.5031 14.8608C15.0303 15.3336 14.3489 15.5337 13.7445 15.2474C13.0285 14.9082 11.9935 14.2791 10.8572 13.1427C9.7208 12.0064 9.09172 10.9715 8.75252 10.2554C8.46625 9.65107 8.66632 8.96964 9.13917 8.4968L9.77645 7.85951C10.4141 7.22184 10.5462 6.23628 10.0988 5.45323L8.67975 2.96914C8.28415 2.27664 7.51494 1.88537 6.72229 1.97344Z" stroke="#3173B0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <p className="footerLanding__main-contacts-row-text">{data.main.telephone}</p>
                        </div>
                        <div class="footerLanding__main-contacts-row">
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="24" viewBox="0 0 26 24" fill="none">
                                <path d="M1 6C1 4.89543 1.89543 4 3 4H23C24.1046 4 25 4.89543 25 6V19C25 20.1046 24.1046 21 23 21H3C1.89543 21 1 20.1046 1 19V6Z" stroke="#3173B0" stroke-width="2" stroke-linejoin="round" />
                                <path d="M2.42131 5.30287C1.91709 4.84067 2.24409 4 2.9281 4H23.0719C23.7559 4 24.0829 4.84067 23.5787 5.30287L15.0272 13.1418C13.8802 14.1931 12.1198 14.1931 10.9728 13.1418L2.42131 5.30287Z" stroke="#3173B0" stroke-width="2" stroke-linejoin="round" />
                            </svg>
                            <p className="footerLanding__main-contacts-row-text">{data.main.email}</p>
                        </div>
                        <div class="footerLanding__main-contacts-row">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                <path d="M22 11C22 15.346 15.8077 20.9022 13.1687 23.0727C12.4838 23.636 11.5162 23.636 10.8313 23.0727C8.19234 20.9022 2 15.346 2 11C2 5.47715 6.47715 1 12 1C17.5228 1 22 5.47715 22 11Z" stroke="#3173B0" stroke-width="2" />
                                <circle cx="12" cy="11" r="3" stroke="#3173B0" stroke-width="2" />
                            </svg>
                            <p className="footerLanding__main-contacts-row-text">{data.main.map}</p>
                        </div>
                    </div>
                    <div class="footerLanding__main-about-rightsReserved footerLanding__main-about-rightsReserved--mobile">
                        {data.main.copyright}
                        </div>
                </div>
            </div>
            <div className="footerLanding__bottom">
                <div className="containerLanding">
                    <a href={`/landing/docs/license`} target="_blank" className="footerLanding__bottom-link" rel="noreferrer">Лицензионный договор</a>
                    <a href={`/landing/docs/offert`} target="_blank" className="footerLanding__bottom-link" rel="noreferrer">Договор оферты</a>
                    <a href={`/landing/docs/privacy`} target="_blank" className="footerLanding__bottom-link" rel="noreferrer">Политика конфиденциальности</a>
                </div>
            </div>
        </footer>
    )
}

export default FooterLanding
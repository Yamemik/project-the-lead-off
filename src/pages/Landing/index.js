import FooterLanding from "../../components/Landing/FooterLanding";
import HeaderLanding from "../../components/Landing/HeaderLanding";
import Button from "../../components/UI/Button";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/scss";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Landing.scss";
import { useEffect, useRef, useState } from "react";
import axios from "../../utils/axios";

const Landing = () => {
	const [_, setInit] = useState();
	const prevBtn = useRef(null);
	const nextBtn = useRef(null);

	const [advantages, setAdvantages] = useState([]);

	const feedbackVideo = useRef(null);
	const [feedbackVideoPlay, setFeebackVideoPlay] = useState(false);

    const [globalConfigLanding, setGlobalConfigLanding] = useState(null);

	useEffect(() => {
		axios
			.get("/api/admin/settings/setting")
			.then(({ data }) => {
                setGlobalConfigLanding(data[0].settings[0].landing)
            })
			.catch(err => console.log(err));
		axios
			.get("/api/admin/settings/about")
			.then(({ data }) => setAdvantages(data[0].privilege))
			.catch(err => console.log(err));
	}, []);

	if (globalConfigLanding) {
        return (
            <>
                <HeaderLanding />
                <section className="bannerLanding">
                    <div className="containerLanding">
                        <div className="bannerLanding__info">
                            <h1 className="bannerLanding__info-title">
                                {globalConfigLanding.banner.title}
                            </h1>
                            <p className="bannerLanding__info-text">
                                {globalConfigLanding.banner.text}
                            </p>
                            <a
                                className="bannerLanding__info-link"
                                href="/platform/demo"
                            >
                                {globalConfigLanding.banner.button}
                            </a>
                        </div>
                        <div className="bannerLanding__images">
                            <img
                                className="bannerLanding__images-img"
                                src="/img/landing/banner-img.png"
                                alt="Превью платформы"
                            />
                        </div>
                    </div>
                </section>
                <section className="advantagesLanding">
                    <div class="containerLanding">
                        <h2 className="advantagesLanding__title titleLanding">
                            Преимущества
                        </h2>
                        <div className="advantagesLanding__content">
                            <div className="advantagesLanding__content-item advantagesLanding__content-item--blue">
                                <div className="advantagesLanding__content-item-info">
                                    <h6 className="advantagesLanding__content-item-info-title">
                                        {advantages.length > 0 &&
                                        advantages[0]?.title
                                            ? advantages[0].title
                                            : "Сервис"}
                                    </h6>
                                    <p className="advantagesLanding__content-item-info-text">
                                        {advantages.length > 0 &&
                                        advantages[0]?.text
                                            ? advantages[0].text
                                            : "Умная платформа для поддержки клиентов, партнеров и сотрудников по телефону, в почте и мессенджерах"}
                                    </p>
                                </div>
                                <div className="advantagesLanding__content-item-paint">
                                    <svg
                                        className="advantagesLanding__content-item-paint-icon"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="36"
                                        height="36"
                                        viewBox="0 0 36 36"
                                        fill="none"
                                    >
                                        <g clip-path="url(#clip0_120_2686)">
                                            <path
                                                d="M28.925 5.20625L17.2813 1.46875L1.46875 6.5L5.0625 28.7812L17.2813 34.5312L29.5 28.7812L32.375 10.8125"
                                                stroke="white"
                                                stroke-width="2"
                                                stroke-miterlimit="10"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                d="M8.65625 15.125L15.125 23.0312L34.5312 3.625"
                                                stroke="white"
                                                stroke-width="2"
                                                stroke-miterlimit="10"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_120_2686">
                                                <rect
                                                    width="34.5"
                                                    height="34.5"
                                                    fill="white"
                                                    transform="translate(0.75 0.75)"
                                                />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                            </div>
                            <div className="advantagesLanding__content-item advantagesLanding__content-item--green">
                                <div className="advantagesLanding__content-item-info">
                                    <h6 className="advantagesLanding__content-item-info-title">
                                        {advantages.length > 0 &&
                                        advantages[1]?.title
                                            ? advantages[1].title
                                            : "Сервис"}
                                    </h6>
                                    <p className="advantagesLanding__content-item-info-text">
                                        {advantages.length > 0 &&
                                        advantages[1]?.text
                                            ? advantages[1].text
                                            : "Умная платформа для поддержки клиентов, партнеров и сотрудников по телефону, в почте и мессенджерах"}
                                    </p>
                                </div>
                                <div className="advantagesLanding__content-item-paint">
                                    <svg
                                        className="advantagesLanding__content-item-paint-icon"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="36"
                                        height="36"
                                        viewBox="0 0 36 36"
                                        fill="none"
                                    >
                                        <g clip-path="url(#clip0_120_2686)">
                                            <path
                                                d="M28.925 5.20625L17.2813 1.46875L1.46875 6.5L5.0625 28.7812L17.2813 34.5312L29.5 28.7812L32.375 10.8125"
                                                stroke="white"
                                                stroke-width="2"
                                                stroke-miterlimit="10"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                d="M8.65625 15.125L15.125 23.0312L34.5312 3.625"
                                                stroke="white"
                                                stroke-width="2"
                                                stroke-miterlimit="10"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_120_2686">
                                                <rect
                                                    width="34.5"
                                                    height="34.5"
                                                    fill="white"
                                                    transform="translate(0.75 0.75)"
                                                />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                            </div>
                            <div className="advantagesLanding__content-item advantagesLanding__content-item--purple">
                                <div className="advantagesLanding__content-item-info">
                                    <h6 className="advantagesLanding__content-item-info-title">
                                        {advantages.length > 0 &&
                                        advantages[2]?.title
                                            ? advantages[2].title
                                            : "Сервис"}
                                    </h6>
                                    <p className="advantagesLanding__content-item-info-text">
                                        {advantages.length > 0 &&
                                        advantages[2]?.text
                                            ? advantages[2].text
                                            : "Умная платформа для поддержки клиентов, партнеров и сотрудников по телефону, в почте и мессенджерах"}
                                    </p>
                                </div>
                                <div className="advantagesLanding__content-item-paint">
                                    <svg
                                        className="advantagesLanding__content-item-paint-icon"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="36"
                                        height="36"
                                        viewBox="0 0 36 36"
                                        fill="none"
                                    >
                                        <g clip-path="url(#clip0_120_2686)">
                                            <path
                                                d="M28.925 5.20625L17.2813 1.46875L1.46875 6.5L5.0625 28.7812L17.2813 34.5312L29.5 28.7812L32.375 10.8125"
                                                stroke="white"
                                                stroke-width="2"
                                                stroke-miterlimit="10"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                d="M8.65625 15.125L15.125 23.0312L34.5312 3.625"
                                                stroke="white"
                                                stroke-width="2"
                                                stroke-miterlimit="10"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_120_2686">
                                                <rect
                                                    width="34.5"
                                                    height="34.5"
                                                    fill="white"
                                                    transform="translate(0.75 0.75)"
                                                />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                            </div>
                            <div className="advantagesLanding__content-item advantagesLanding__content-item--purple">
                                <div className="advantagesLanding__content-item-info">
                                    <h6 className="advantagesLanding__content-item-info-title">
                                        {advantages.length > 0 &&
                                        advantages[3]?.title
                                            ? advantages[3].title
                                            : "Сервис"}
                                    </h6>
                                    <p className="advantagesLanding__content-item-info-text">
                                        {advantages.length > 0 &&
                                        advantages[3]?.text
                                            ? advantages[3].text
                                            : "Умная платформа для поддержки клиентов, партнеров и сотрудников по телефону, в почте и мессенджерах"}
                                    </p>
                                </div>
                                <div className="advantagesLanding__content-item-paint">
                                    <svg
                                        className="advantagesLanding__content-item-paint-icon"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="36"
                                        height="36"
                                        viewBox="0 0 36 36"
                                        fill="none"
                                    >
                                        <g clip-path="url(#clip0_120_2686)">
                                            <path
                                                d="M28.925 5.20625L17.2813 1.46875L1.46875 6.5L5.0625 28.7812L17.2813 34.5312L29.5 28.7812L32.375 10.8125"
                                                stroke="white"
                                                stroke-width="2"
                                                stroke-miterlimit="10"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                d="M8.65625 15.125L15.125 23.0312L34.5312 3.625"
                                                stroke="white"
                                                stroke-width="2"
                                                stroke-miterlimit="10"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_120_2686">
                                                <rect
                                                    width="34.5"
                                                    height="34.5"
                                                    fill="white"
                                                    transform="translate(0.75 0.75)"
                                                />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                            </div>
                            <div className="advantagesLanding__content-item advantagesLanding__content-item--blue">
                                <div className="advantagesLanding__content-item-info">
                                    <h6 className="advantagesLanding__content-item-info-title">
                                        {advantages.length > 0 &&
                                        advantages[4]?.title
                                            ? advantages[4].title
                                            : "Сервис"}
                                    </h6>
                                    <p className="advantagesLanding__content-item-info-text">
                                        {advantages.length > 0 &&
                                        advantages[4]?.text
                                            ? advantages[4].text
                                            : "Умная платформа для поддержки клиентов, партнеров и сотрудников по телефону, в почте и мессенджерах"}
                                    </p>
                                </div>
                                <div className="advantagesLanding__content-item-paint">
                                    <svg
                                        className="advantagesLanding__content-item-paint-icon"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="36"
                                        height="36"
                                        viewBox="0 0 36 36"
                                        fill="none"
                                    >
                                        <g clip-path="url(#clip0_120_2686)">
                                            <path
                                                d="M28.925 5.20625L17.2813 1.46875L1.46875 6.5L5.0625 28.7812L17.2813 34.5312L29.5 28.7812L32.375 10.8125"
                                                stroke="white"
                                                stroke-width="2"
                                                stroke-miterlimit="10"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                d="M8.65625 15.125L15.125 23.0312L34.5312 3.625"
                                                stroke="white"
                                                stroke-width="2"
                                                stroke-miterlimit="10"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_120_2686">
                                                <rect
                                                    width="34.5"
                                                    height="34.5"
                                                    fill="white"
                                                    transform="translate(0.75 0.75)"
                                                />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                            </div>
                            <div className="advantagesLanding__content-item advantagesLanding__content-item--green">
                                <div className="advantagesLanding__content-item-info">
                                    <h6 className="advantagesLanding__content-item-info-title">
                                        {advantages.length > 0 &&
                                        advantages[5]?.title
                                            ? advantages[5].title
                                            : "Сервис"}
                                    </h6>
                                    <p className="advantagesLanding__content-item-info-text">
                                        {advantages.length > 0 &&
                                        advantages[5]?.text
                                            ? advantages[5].text
                                            : "Умная платформа для поддержки клиентов, партнеров и сотрудников по телефону, в почте и мессенджерах"}
                                    </p>
                                </div>
                                <div className="advantagesLanding__content-item-paint">
                                    <svg
                                        className="advantagesLanding__content-item-paint-icon"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="36"
                                        height="36"
                                        viewBox="0 0 36 36"
                                        fill="none"
                                    >
                                        <g clip-path="url(#clip0_120_2686)">
                                            <path
                                                d="M28.925 5.20625L17.2813 1.46875L1.46875 6.5L5.0625 28.7812L17.2813 34.5312L29.5 28.7812L32.375 10.8125"
                                                stroke="white"
                                                stroke-width="2"
                                                stroke-miterlimit="10"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                d="M8.65625 15.125L15.125 23.0312L34.5312 3.625"
                                                stroke="white"
                                                stroke-width="2"
                                                stroke-miterlimit="10"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_120_2686">
                                                <rect
                                                    width="34.5"
                                                    height="34.5"
                                                    fill="white"
                                                    transform="translate(0.75 0.75)"
                                                />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="advantagesLanding__extra">
                            <h6 className="advantagesLanding__extra-title">
                                {globalConfigLanding.numbers.title}
                            </h6>
                            <div className="advantagesLanding__extra-items">
                                <div className="advantagesLanding__extra-items-item">
                                    <div className="advantagesLanding__extra-items-item-number">
                                        {globalConfigLanding.numbers.nums[0].number}
                                    </div>
                                    <div className="advantagesLanding__extra-items-item-opinion">
                                        {globalConfigLanding.numbers.nums[0].opinion}
                                    </div>
                                </div>
                                <div className="advantagesLanding__extra-items-item">
                                    <div className="advantagesLanding__extra-items-item-number">
                                        {globalConfigLanding.numbers.nums[1].number}
                                    </div>
                                    <div className="advantagesLanding__extra-items-item-opinion">
                                        {globalConfigLanding.numbers.nums[1].opinion}
                                    </div>
                                </div>
                                <div className="advantagesLanding__extra-items-item">
                                    <div className="advantagesLanding__extra-items-item-number">
                                        {globalConfigLanding.numbers.nums[2].number}
                                    </div>
                                    <div className="advantagesLanding__extra-items-item-opinion">
                                        {globalConfigLanding.numbers.nums[2].opinion}
                                    </div>
                                </div>
                            </div>
                            <img
                                className="advantagesLanding__extra-img"
                                src="/img/landing/extra-img.png"
                                alt=""
                            />
                        </div>
                    </div>
                </section>
                <section className="tarifs">
                    <div class="containerLanding">
                        <h2 className="tarifs__title titleLanding">Тарифы</h2>
                        <div class="tarifs__items">
                            <div class="tarifs__items-item">
                                <h6 className="tarifs__items-item-title">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="25"
                                        height="25"
                                        viewBox="0 0 25 25"
                                        fill="none"
                                    >
                                        <path
                                            d="M1.50244 9.5L5.50008 2.5H19.5L23.4977 9.5L12.5 22.5L1.50244 9.5Z"
                                            stroke="#3173B0"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M1.5 9.5H23.5"
                                            stroke="#3173B0"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M8.5 9.5L9.5 2.5"
                                            stroke="#3173B0"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M16.5 9.5L15.5 2.5"
                                            stroke="#3173B0"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M12.5 22.5L8.5 9.5"
                                            stroke="#3173B0"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M12.5 22.5L16.5 9.5"
                                            stroke="#3173B0"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                    {globalConfigLanding.tarifs[0].title}
                                </h6>
                                <p class="tarifs__items-item-opinion">
                                    {globalConfigLanding.tarifs[0].opinion}
                                </p>
                                <ul class="tarifs__items-item-list">
                                    <li class="tarifs__items-item-list-item">
                                        {globalConfigLanding.tarifs[0].advantages[0]}
                                    </li>
                                    <li class="tarifs__items-item-list-item">
                                        {globalConfigLanding.tarifs[0].advantages[1]}
                                    </li>
                                    <li class="tarifs__items-item-list-item">
                                        {globalConfigLanding.tarifs[0].advantages[2]}
                                    </li>
                                    <li class="tarifs__items-item-list-item">
                                        {globalConfigLanding.tarifs[0].advantages[3]}
                                    </li>
                                </ul>
                                <Button
                                    click={() =>
                                        (window.location.href = "/platform/demo")
                                    }
                                    type="fill"
                                    text={globalConfigLanding.tarifs[0].button}
                                />
                            </div>
                            <div class="tarifs__items-item">
                                <h6 className="tarifs__items-item-title">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="25"
                                        height="25"
                                        viewBox="0 0 25 25"
                                        fill="none"
                                    >
                                        <rect
                                            x="3.5"
                                            y="10.5"
                                            width="18"
                                            height="12"
                                            rx="2"
                                            stroke="#EF5C5C"
                                            stroke-width="2"
                                        />
                                        <path
                                            d="M7.5 10.5V6.5C7.5 5.17392 8.02678 3.90215 8.96447 2.96447C9.90215 2.02678 11.1739 1.5 12.5 1.5C13.8261 1.5 15.0979 2.02678 16.0355 2.96447C16.9732 3.90215 17.5 5.17392 17.5 6.5V10.5"
                                            stroke="#EF5C5C"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                    {globalConfigLanding.tarifs[1].title}
                                </h6>
                                <p class="tarifs__items-item-opinion">
                                    {globalConfigLanding.tarifs[1].opinion}
                                </p>
                                <ul class="tarifs__items-item-list">
                                    <li class="tarifs__items-item-list-item">
                                        {globalConfigLanding.tarifs[1].advantages[0]}
                                    </li>
                                    <li class="tarifs__items-item-list-item">
                                        {globalConfigLanding.tarifs[1].advantages[1]}
                                    </li>
                                    <li class="tarifs__items-item-list-item">
                                        {globalConfigLanding.tarifs[1].advantages[2]}
                                    </li>
                                    <li class="tarifs__items-item-list-item">
                                        {globalConfigLanding.tarifs[1].advantages[3]}
                                    </li>
                                </ul>
                                <Button
                                    click={() =>
                                        (window.location.href = "/platform/demo")
                                    }
                                    type="fill"
                                    text={globalConfigLanding.tarifs[1].button}
                                />
                            </div>
                            <div class="tarifs__items-item">
                                <h6 className="tarifs__items-item-title">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="25"
                                        height="25"
                                        viewBox="0 0 25 25"
                                        fill="none"
                                    >
                                        <rect
                                            x="3.5"
                                            y="11.5"
                                            width="18"
                                            height="12"
                                            rx="2"
                                            stroke="#31BC48"
                                            stroke-width="2"
                                        />
                                        <path
                                            d="M7.5 6.49988C7.5 5.1738 8.02678 3.90203 8.96447 2.96434C9.90215 2.02666 11.1739 1.49988 12.5 1.49988C13.8261 1.49988 15.0979 2.02666 16.0355 2.96434C16.9732 3.90203 17.5 5.1738 17.5 6.49988V11.4999"
                                            stroke="#31BC48"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                    {globalConfigLanding.tarifs[2].title}
                                </h6>
                                <p class="tarifs__items-item-opinion">
                                    {globalConfigLanding.tarifs[2].opinion}
                                </p>
                                <ul class="tarifs__items-item-list">
                                    <li class="tarifs__items-item-list-item">
                                        {globalConfigLanding.tarifs[2].advantages[0]}
                                    </li>
                                    <li class="tarifs__items-item-list-item">
                                        {globalConfigLanding.tarifs[2].advantages[1]}
                                    </li>
                                    <li class="tarifs__items-item-list-item">
                                        {globalConfigLanding.tarifs[2].advantages[2]}
                                    </li>
                                    <li class="tarifs__items-item-list-item">
                                        {globalConfigLanding.tarifs[2].advantages[3]}
                                    </li>
                                </ul>
                                <Button
                                    click={() =>
                                        (window.location.href = "/platform/demo")
                                    }
                                    type="fill"
                                    text={globalConfigLanding.tarifs[2].button}
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="feedbacks">
                    <div className="containerLanding">
                        <h2 className="tarifs__title titleLanding">Отзывы</h2>
                        <div className="feedbacks__content">
                            <Swiper
                                loop={true}
                                spaceBetween={24}
                                onInit={() => setInit(true)}
                                pagination={{
                                    clickable: true,
                                }}
                                navigation={{
                                    prevEl: prevBtn.current,
                                    nextEl: nextBtn.current,
                                }}
                                modules={[Pagination, Navigation]}
                                breakpoints={{
                                    320: {
                                        slidesPerView: 1,
                                        slidesPerGroup: 1,
                                        speed: 500,
                                    },
                                    1520: {
                                        slidesPerView: 2,
                                        slidesPerGroup: 2,
                                        speed: 800,
                                    },
                                }}
                            >
                                {
                                    globalConfigLanding.feedbacks.map((feedback, index) => (
                                        <SwiperSlide>
                                            <div className="feedbacks__content-feedback">
                                                <img
                                                    className="feedbacks__content-feedback-avatar"
                                                    src={globalConfigLanding.feedbacks[index].img}
                                                    alt=""
                                                />
                                                <div className="feedbacks__content-feedback-info">
                                                    <h6 class="feedbacks__content-feedback-info-title">
                                                        {globalConfigLanding.feedbacks[index].fio}
                                                    </h6>
                                                    <p class="feedbacks__content-feedback-info-tag">
                                                        {globalConfigLanding.feedbacks[index].post}
                                                    </p>
                                                    <p class="feedbacks__content-feedback-info-text">
                                                        {globalConfigLanding.feedbacks[index].text}
                                                    </p>
                                                </div>
                                                <div className="feedbacks__content-feedback-info--mobile">
                                                    <div className="feedbacks__content-feedback-info-box">
                                                        <img
                                                            className="feedbacks__content-feedback-avatar feedbacks__content-feedback-avatar--mobile"
                                                            src={globalConfigLanding.feedbacks[index].img}
                                                            alt=""
                                                        />
                                                        <div>
                                                            <h6 class="feedbacks__content-feedback-info-title">
                                                                {globalConfigLanding.feedbacks[index].fio}
                                                            </h6>
                                                            <p class="feedbacks__content-feedback-info-tag">
                                                                {globalConfigLanding.feedbacks[index].post}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <p class="feedbacks__content-feedback-info-text">
                                                        {globalConfigLanding.feedbacks[index].text}
                                                    </p>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))
                                }
                                {/*<SwiperSlide>*/}
                                {/*    <div className="feedbacks__content-feedback">*/}
                                {/*        <img*/}
                                {/*            className="feedbacks__content-feedback-avatar"*/}
                                {/*            src="/img/landing/avatar.png"*/}
                                {/*            alt=""*/}
                                {/*        />*/}
                                {/*        <div className="feedbacks__content-feedback-info">*/}
                                {/*            <h6 class="feedbacks__content-feedback-info-title">*/}
                                {/*                Иванов Иван Иванович*/}
                                {/*            </h6>*/}
                                {/*            <p class="feedbacks__content-feedback-info-tag">*/}
                                {/*                Генеральный директор компании*/}
                                {/*                «Юмисофт»*/}
                                {/*            </p>*/}
                                {/*            <p class="feedbacks__content-feedback-info-text">*/}
                                {/*                Отличная программа для планирования,*/}
                                {/*                контроля и управления всеми*/}
                                {/*                задачами. Она помогает нам*/}
                                {/*                организовать внутренние процессы.*/}
                                {/*                В ней мы ставим задачи сотрудникам*/}
                                {/*                и контролируем сроки. Это удобно:*/}
                                {/*                теперь никто не забывает о своих*/}
                                {/*                задачах*/}
                                {/*            </p>*/}
                                {/*        </div>*/}
                                {/*        <div className="feedbacks__content-feedback-info--mobile">*/}
                                {/*            <div className="feedbacks__content-feedback-info-box">*/}
                                {/*                <img*/}
                                {/*                    className="feedbacks__content-feedback-avatar feedbacks__content-feedback-avatar--mobile"*/}
                                {/*                    src="/img/landing/avatar.png"*/}
                                {/*                    alt=""*/}
                                {/*                />*/}
                                {/*                <div>*/}
                                {/*                    <h6 class="feedbacks__content-feedback-info-title">*/}
                                {/*                        Иванов Иван Иванович*/}
                                {/*                    </h6>*/}
                                {/*                    <p class="feedbacks__content-feedback-info-tag">*/}
                                {/*                        Генеральный директор*/}
                                {/*                        компании «Юмисофт»*/}
                                {/*                    </p>*/}
                                {/*                </div>*/}
                                {/*            </div>*/}
                                {/*            <p class="feedbacks__content-feedback-info-text">*/}
                                {/*                Отличная программа для планирования,*/}
                                {/*                контроля и управления всеми*/}
                                {/*                задачами. Она помогает нам*/}
                                {/*                организовать внутренние процессы.*/}
                                {/*                В ней мы ставим задачи сотрудникам*/}
                                {/*                и контролируем сроки. Это удобно:*/}
                                {/*                теперь никто не забывает о своих*/}
                                {/*                задачах*/}
                                {/*            </p>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</SwiperSlide>*/}
                                {/*<SwiperSlide>*/}
                                {/*    <div className="feedbacks__content-feedback">*/}
                                {/*        <img*/}
                                {/*            className="feedbacks__content-feedback-avatar"*/}
                                {/*            src="/img/landing/avatar.png"*/}
                                {/*            alt=""*/}
                                {/*        />*/}
                                {/*        <div className="feedbacks__content-feedback-info">*/}
                                {/*            <h6 class="feedbacks__content-feedback-info-title">*/}
                                {/*                Иванов Иван Иванович*/}
                                {/*            </h6>*/}
                                {/*            <p class="feedbacks__content-feedback-info-tag">*/}
                                {/*                Генеральный директор компании*/}
                                {/*                «Юмисофт»*/}
                                {/*            </p>*/}
                                {/*            <p class="feedbacks__content-feedback-info-text">*/}
                                {/*                Отличная программа для планирования,*/}
                                {/*                контроля и управления всеми*/}
                                {/*                задачами. Она помогает нам*/}
                                {/*                организовать внутренние процессы.*/}
                                {/*                В ней мы ставим задачи сотрудникам*/}
                                {/*                и контролируем сроки. Это удобно:*/}
                                {/*                теперь никто не забывает о своих*/}
                                {/*                задачах*/}
                                {/*            </p>*/}
                                {/*        </div>*/}
                                {/*        <div className="feedbacks__content-feedback-info--mobile">*/}
                                {/*            <div className="feedbacks__content-feedback-info-box">*/}
                                {/*                <img*/}
                                {/*                    className="feedbacks__content-feedback-avatar feedbacks__content-feedback-avatar--mobile"*/}
                                {/*                    src="/img/landing/avatar.png"*/}
                                {/*                    alt=""*/}
                                {/*                />*/}
                                {/*                <div>*/}
                                {/*                    <h6 class="feedbacks__content-feedback-info-title">*/}
                                {/*                        Иванов Иван Иванович*/}
                                {/*                    </h6>*/}
                                {/*                    <p class="feedbacks__content-feedback-info-tag">*/}
                                {/*                        Генеральный директор*/}
                                {/*                        компании «Юмисофт»*/}
                                {/*                    </p>*/}
                                {/*                </div>*/}
                                {/*            </div>*/}
                                {/*            <p class="feedbacks__content-feedback-info-text">*/}
                                {/*                Отличная программа для планирования,*/}
                                {/*                контроля и управления всеми*/}
                                {/*                задачами. Она помогает нам*/}
                                {/*                организовать внутренние процессы.*/}
                                {/*                В ней мы ставим задачи сотрудникам*/}
                                {/*                и контролируем сроки. Это удобно:*/}
                                {/*                теперь никто не забывает о своих*/}
                                {/*                задачах*/}
                                {/*            </p>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</SwiperSlide>*/}
                                {/*<SwiperSlide>*/}
                                {/*    <div className="feedbacks__content-feedback">*/}
                                {/*        <div className="feedbacks__content-feedback-avatar">*/}
                                {/*            <video ref={feedbackVideo}>*/}
                                {/*                <source*/}
                                {/*                    src="/videos/feedback.mp4"*/}
                                {/*                    type="video/mp4"*/}
                                {/*                />*/}
                                {/*            </video>*/}
                                {/*            <div className="feedbacks__content-feedback-avatar-play">*/}
                                {/*                {!feedbackVideoPlay ? (*/}
                                {/*                    <svg*/}
                                {/*                        onClick={() => {*/}
                                {/*                            feedbackVideo.current.play();*/}
                                {/*                            setFeebackVideoPlay(*/}
                                {/*                                true,*/}
                                {/*                            );*/}
                                {/*                        }}*/}
                                {/*                        xmlns="http://www.w3.org/2000/svg"*/}
                                {/*                        width="20"*/}
                                {/*                        height="20"*/}
                                {/*                        viewBox="0 0 20 20"*/}
                                {/*                        fill="none"*/}
                                {/*                    >*/}
                                {/*                        <path*/}
                                {/*                            d="M6.16675 5.15537C6.16675 3.98811 7.44129 3.26814 8.44102 3.87066L16.4795 8.71528C17.4471 9.29845 17.4471 10.7015 16.4795 11.2847L8.44102 16.1293C7.44129 16.7319 6.16675 16.0119 6.16675 14.8446V5.15537Z"*/}
                                {/*                            stroke="white"*/}
                                {/*                            stroke-width="2"*/}
                                {/*                            stroke-linecap="round"*/}
                                {/*                            stroke-linejoin="round"*/}
                                {/*                        />*/}
                                {/*                    </svg>*/}
                                {/*                ) : (*/}
                                {/*                    <svg*/}
                                {/*                        onClick={() => {*/}
                                {/*                            feedbackVideo.current.pause();*/}
                                {/*                            setFeebackVideoPlay(*/}
                                {/*                                false,*/}
                                {/*                            );*/}
                                {/*                        }}*/}
                                {/*                        xmlns="http://www.w3.org/2000/svg"*/}
                                {/*                        width="20"*/}
                                {/*                        height="20"*/}
                                {/*                        viewBox="0 0 20 20"*/}
                                {/*                        fill="none"*/}
                                {/*                    >*/}
                                {/*                        <path*/}
                                {/*                            d="M6.8 3.6V16.4H3.6V3.6H6.8ZM6.8 2H3.6C3.17565 2 2.76869 2.16857 2.46863 2.46863C2.16857 2.76869 2 3.17565 2 3.6V16.4C2 16.8243 2.16857 17.2313 2.46863 17.5314C2.76869 17.8314 3.17565 18 3.6 18H6.8C7.22435 18 7.63131 17.8314 7.93137 17.5314C8.23143 17.2313 8.4 16.8243 8.4 16.4V3.6C8.4 3.17565 8.23143 2.76869 7.93137 2.46863C7.63131 2.16857 7.22435 2 6.8 2ZM16.4 3.6V16.4H13.2V3.6H16.4ZM16.4 2H13.2C12.7757 2 12.3687 2.16857 12.0686 2.46863C11.7686 2.76869 11.6 3.17565 11.6 3.6V16.4C11.6 16.8243 11.7686 17.2313 12.0686 17.5314C12.3687 17.8314 12.7757 18 13.2 18H16.4C16.8243 18 17.2313 17.8314 17.5314 17.5314C17.8314 17.2313 18 16.8243 18 16.4V3.6C18 3.17565 17.8314 2.76869 17.5314 2.46863C17.2313 2.16857 16.8243 2 16.4 2Z"*/}
                                {/*                            fill="white"*/}
                                {/*                        />*/}
                                {/*                    </svg>*/}
                                {/*                )}*/}
                                {/*            </div>*/}
                                {/*        </div>*/}
                                {/*        <div className="feedbacks__content-feedback-info">*/}
                                {/*            <h6 class="feedbacks__content-feedback-info-title">*/}
                                {/*                Иванов Иван Иванович*/}
                                {/*            </h6>*/}
                                {/*            <p class="feedbacks__content-feedback-info-tag">*/}
                                {/*                Генеральный директор компании*/}
                                {/*                «Юмисофт»*/}
                                {/*            </p>*/}
                                {/*            <p class="feedbacks__content-feedback-info-text">*/}
                                {/*                Отличная программа для планирования,*/}
                                {/*                контроля и управления всеми*/}
                                {/*                задачами. Она помогает нам*/}
                                {/*                организовать внутренние процессы.*/}
                                {/*                В ней мы ставим задачи сотрудникам*/}
                                {/*                и контролируем сроки. Это удобно:*/}
                                {/*                теперь никто не забывает о своих*/}
                                {/*                задачах*/}
                                {/*            </p>*/}
                                {/*        </div>*/}
                                {/*        <div className="feedbacks__content-feedback-info--mobile">*/}
                                {/*            <div className="feedbacks__content-feedback-info-box">*/}
                                {/*                <div className="feedbacks__content-feedback-avatar feedbacks__content-feedback-avatar--mobile">*/}
                                {/*                    <video ref={feedbackVideo}>*/}
                                {/*                        <source*/}
                                {/*                            src="/videos/feedback.mp4"*/}
                                {/*                            type="video/mp4"*/}
                                {/*                        />*/}
                                {/*                    </video>*/}
                                {/*                    <div className="feedbacks__content-feedback-avatar-play">*/}
                                {/*                        {!feedbackVideoPlay ? (*/}
                                {/*                            <svg*/}
                                {/*                                onClick={() => {*/}
                                {/*                                    feedbackVideo.current.play();*/}
                                {/*                                    setFeebackVideoPlay(*/}
                                {/*                                        true,*/}
                                {/*                                    );*/}
                                {/*                                }}*/}
                                {/*                                xmlns="http://www.w3.org/2000/svg"*/}
                                {/*                                width="20"*/}
                                {/*                                height="20"*/}
                                {/*                                viewBox="0 0 20 20"*/}
                                {/*                                fill="none"*/}
                                {/*                            >*/}
                                {/*                                <path*/}
                                {/*                                    d="M6.16675 5.15537C6.16675 3.98811 7.44129 3.26814 8.44102 3.87066L16.4795 8.71528C17.4471 9.29845 17.4471 10.7015 16.4795 11.2847L8.44102 16.1293C7.44129 16.7319 6.16675 16.0119 6.16675 14.8446V5.15537Z"*/}
                                {/*                                    stroke="white"*/}
                                {/*                                    stroke-width="2"*/}
                                {/*                                    stroke-linecap="round"*/}
                                {/*                                    stroke-linejoin="round"*/}
                                {/*                                />*/}
                                {/*                            </svg>*/}
                                {/*                        ) : (*/}
                                {/*                            <svg*/}
                                {/*                                onClick={() => {*/}
                                {/*                                    feedbackVideo.current.pause();*/}
                                {/*                                    setFeebackVideoPlay(*/}
                                {/*                                        false,*/}
                                {/*                                    );*/}
                                {/*                                }}*/}
                                {/*                                xmlns="http://www.w3.org/2000/svg"*/}
                                {/*                                width="20"*/}
                                {/*                                height="20"*/}
                                {/*                                viewBox="0 0 20 20"*/}
                                {/*                                fill="none"*/}
                                {/*                            >*/}
                                {/*                                <path*/}
                                {/*                                    d="M6.8 3.6V16.4H3.6V3.6H6.8ZM6.8 2H3.6C3.17565 2 2.76869 2.16857 2.46863 2.46863C2.16857 2.76869 2 3.17565 2 3.6V16.4C2 16.8243 2.16857 17.2313 2.46863 17.5314C2.76869 17.8314 3.17565 18 3.6 18H6.8C7.22435 18 7.63131 17.8314 7.93137 17.5314C8.23143 17.2313 8.4 16.8243 8.4 16.4V3.6C8.4 3.17565 8.23143 2.76869 7.93137 2.46863C7.63131 2.16857 7.22435 2 6.8 2ZM16.4 3.6V16.4H13.2V3.6H16.4ZM16.4 2H13.2C12.7757 2 12.3687 2.16857 12.0686 2.46863C11.7686 2.76869 11.6 3.17565 11.6 3.6V16.4C11.6 16.8243 11.7686 17.2313 12.0686 17.5314C12.3687 17.8314 12.7757 18 13.2 18H16.4C16.8243 18 17.2313 17.8314 17.5314 17.5314C17.8314 17.2313 18 16.8243 18 16.4V3.6C18 3.17565 17.8314 2.76869 17.5314 2.46863C17.2313 2.16857 16.8243 2 16.4 2Z"*/}
                                {/*                                    fill="white"*/}
                                {/*                                />*/}
                                {/*                            </svg>*/}
                                {/*                        )}*/}
                                {/*                    </div>*/}
                                {/*                </div>*/}
                                {/*                <div>*/}
                                {/*                    <h6 class="feedbacks__content-feedback-info-title">*/}
                                {/*                        Иванов Иван Иванович*/}
                                {/*                    </h6>*/}
                                {/*                    <p class="feedbacks__content-feedback-info-tag">*/}
                                {/*                        Генеральный директор*/}
                                {/*                        компании «Юмисофт»*/}
                                {/*                    </p>*/}
                                {/*                </div>*/}
                                {/*            </div>*/}
                                {/*            <p class="feedbacks__content-feedback-info-text">*/}
                                {/*                Отличная программа для планирования,*/}
                                {/*                контроля и управления всеми*/}
                                {/*                задачами. Она помогает нам*/}
                                {/*                организовать внутренние процессы.*/}
                                {/*                В ней мы ставим задачи сотрудникам*/}
                                {/*                и контролируем сроки. Это удобно:*/}
                                {/*                теперь никто не забывает о своих*/}
                                {/*                задачах*/}
                                {/*            </p>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</SwiperSlide>*/}
                                {/*<SwiperSlide>*/}
                                {/*    <div className="feedbacks__content-feedback">*/}
                                {/*        <img*/}
                                {/*            className="feedbacks__content-feedback-avatar"*/}
                                {/*            src="/img/landing/avatar.png"*/}
                                {/*            alt=""*/}
                                {/*        />*/}
                                {/*        <div className="feedbacks__content-feedback-info">*/}
                                {/*            <h6 class="feedbacks__content-feedback-info-title">*/}
                                {/*                Иванов Иван Иванович*/}
                                {/*            </h6>*/}
                                {/*            <p class="feedbacks__content-feedback-info-tag">*/}
                                {/*                Генеральный директор компании*/}
                                {/*                «Юмисофт»*/}
                                {/*            </p>*/}
                                {/*            <p class="feedbacks__content-feedback-info-text">*/}
                                {/*                Отличная программа для планирования,*/}
                                {/*                контроля и управления всеми*/}
                                {/*                задачами. Она помогает нам*/}
                                {/*                организовать внутренние процессы.*/}
                                {/*                В ней мы ставим задачи сотрудникам*/}
                                {/*                и контролируем сроки. Это удобно:*/}
                                {/*                теперь никто не забывает о своих*/}
                                {/*                задачах*/}
                                {/*            </p>*/}
                                {/*        </div>*/}
                                {/*        <div className="feedbacks__content-feedback-info--mobile">*/}
                                {/*            <div className="feedbacks__content-feedback-info-box">*/}
                                {/*                <img*/}
                                {/*                    className="feedbacks__content-feedback-avatar feedbacks__content-feedback-avatar--mobile"*/}
                                {/*                    src="/img/landing/avatar.png"*/}
                                {/*                    alt=""*/}
                                {/*                />*/}
                                {/*                <div>*/}
                                {/*                    <h6 class="feedbacks__content-feedback-info-title">*/}
                                {/*                        Иванов Иван Иванович*/}
                                {/*                    </h6>*/}
                                {/*                    <p class="feedbacks__content-feedback-info-tag">*/}
                                {/*                        Генеральный директор*/}
                                {/*                        компании «Юмисофт»*/}
                                {/*                    </p>*/}
                                {/*                </div>*/}
                                {/*            </div>*/}
                                {/*            <p class="feedbacks__content-feedback-info-text">*/}
                                {/*                Отличная программа для планирования,*/}
                                {/*                контроля и управления всеми*/}
                                {/*                задачами. Она помогает нам*/}
                                {/*                организовать внутренние процессы.*/}
                                {/*                В ней мы ставим задачи сотрудникам*/}
                                {/*                и контролируем сроки. Это удобно:*/}
                                {/*                теперь никто не забывает о своих*/}
                                {/*                задачах*/}
                                {/*            </p>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</SwiperSlide>*/}
                                {/*<SwiperSlide>*/}
                                {/*    <div className="feedbacks__content-feedback">*/}
                                {/*        <img*/}
                                {/*            className="feedbacks__content-feedback-avatar"*/}
                                {/*            src="/img/landing/avatar.png"*/}
                                {/*            alt=""*/}
                                {/*        />*/}
                                {/*        <div className="feedbacks__content-feedback-info">*/}
                                {/*            <h6 class="feedbacks__content-feedback-info-title">*/}
                                {/*                Иванов Иван Иванович*/}
                                {/*            </h6>*/}
                                {/*            <p class="feedbacks__content-feedback-info-tag">*/}
                                {/*                Генеральный директор компании*/}
                                {/*                «Юмисофт»*/}
                                {/*            </p>*/}
                                {/*            <p class="feedbacks__content-feedback-info-text">*/}
                                {/*                Отличная программа для планирования,*/}
                                {/*                контроля и управления всеми*/}
                                {/*                задачами. Она помогает нам*/}
                                {/*                организовать внутренние процессы.*/}
                                {/*                В ней мы ставим задачи сотрудникам*/}
                                {/*                и контролируем сроки. Это удобно:*/}
                                {/*                теперь никто не забывает о своих*/}
                                {/*                задачах*/}
                                {/*            </p>*/}
                                {/*        </div>*/}
                                {/*        <div className="feedbacks__content-feedback-info--mobile">*/}
                                {/*            <div className="feedbacks__content-feedback-info-box">*/}
                                {/*                <img*/}
                                {/*                    className="feedbacks__content-feedback-avatar feedbacks__content-feedback-avatar--mobile"*/}
                                {/*                    src="/img/landing/avatar.png"*/}
                                {/*                    alt=""*/}
                                {/*                />*/}
                                {/*                <div>*/}
                                {/*                    <h6 class="feedbacks__content-feedback-info-title">*/}
                                {/*                        Иванов Иван Иванович*/}
                                {/*                    </h6>*/}
                                {/*                    <p class="feedbacks__content-feedback-info-tag">*/}
                                {/*                        Генеральный директор*/}
                                {/*                        компании «Юмисофт»*/}
                                {/*                    </p>*/}
                                {/*                </div>*/}
                                {/*            </div>*/}
                                {/*            <p class="feedbacks__content-feedback-info-text">*/}
                                {/*                Отличная программа для планирования,*/}
                                {/*                контроля и управления всеми*/}
                                {/*                задачами. Она помогает нам*/}
                                {/*                организовать внутренние процессы.*/}
                                {/*                В ней мы ставим задачи сотрудникам*/}
                                {/*                и контролируем сроки. Это удобно:*/}
                                {/*                теперь никто не забывает о своих*/}
                                {/*                задачах*/}
                                {/*            </p>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</SwiperSlide>*/}
                            </Swiper>
                            <button class="feedbacks__content-prev" ref={prevBtn}>
                                <img
                                    src="/img/landing/slide-right.svg"
                                    alt="Предыдущий слайд"
                                />
                            </button>
                            <button class="feedbacks__content-next" ref={nextBtn}>
                                <img
                                    src="/img/landing/slide-left.svg"
                                    alt="Следующий слайд"
                                />
                            </button>
                        </div>
                    </div>
                </section>
                <FooterLanding data={globalConfigLanding.footer}/>
            </>
        );
    }
};

export default Landing;

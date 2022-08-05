import bootstrap from "bootstrap/dist/js/bootstrap.min.js";

import jQuery from "jquery/dist/jquery.min.js";
import { render } from "react-dom";
import { useEffect, useState } from "react";
import AuthService from "./services/auth/auth.service";
import { useLocation } from 'react-router-dom';

import { BrowserRouter, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { StrictMode } from "react";
import Search from "./Search";
import Menu from "./Components/Menu";
import Index from "./Index";
import SignUp from "./SignUp";
import Login from "./Login";
import LoginForm from "./Components/auth/LoginForm";
import Logout from "./Logout";
import CreateJob from "./dashboard/company/CreateJob/CreateJob";
import Modal from 'react-bootstrap/Modal'
import ProfileEdit from "./dashboard/company/ProfileEdit";
import ManageJobs from "./dashboard/company/ManageJobs/ManageJobs";
import Dashboard from "./dashboard/company/CompanyDashboard";
import Footer from "./Components/footer";
import CondidateProfile from "./Components/profile/CondidateProfile.";
import { Outlet } from "react-router-dom";
import CompanyDashboardLayout from "./dashboard/company/CompanyDashboardLayout";
import CondadateDashboardLayout from "./dashboard/condidate/CondadateDashboardLayout";
import CondadateDashboard from "./dashboard/condidate/CondadateDashboard";
import CondadateFavourites from "./dashboard/condidate/CondadateFavourites";
import CondadateApplications from "./dashboard/condidate/CondadateApplications";
import CondadateProfileEdit from "./dashboard/condidate/profile/CondidateProfileEdit";
import ManageApplications from "./dashboard/company/ManageApplications/ManageApplications";
import Inbox from "./dashboard/company/Inbox/Inbox";
import Notifications from "./dashboard/company/Notifications/Notifications";
import authService from "./services/auth/auth.service";
import Switch from "./dashboard/condidate/switch/Switch";
import Companies from "./pages/conpanies/Companies";
import ChangePassword from "./dashboard/condidate/changePassword/ChangePassword";
// require('dotenv').config({ path: '../.env.development' });
import useGeo from './hooks/useGeo'
const App = () => {

    const location = useLocation();
    const geo = useGeo();

    const user = authService.getCurrentUser();

    // useGoogleOneTapLogin(
    //     {
    //         onError: error => console.log(error),
    //         onSuccess: googleUser => console.log(googleUser),
    //         googleAccountConfigs: {
    //             client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    //             prompt_parent_id: "google-login-button",
    //             state_cookie_domain: "localhost",
    //             cancel_on_tap_outside: true,


    //         },
    //     }
    // );




    return (
        //environment variable for netlify

        <div>
            {user && user.status == "new" ? <LoginForm /> : null}
            {location.pathname.search('/dashboard') ? <Menu
                //if i'm in root path
                mode={location.pathname === '/'}
            /> : null}
            <Routes>
                <Route path="dashboard" element={!authService.getCurrentUser() ? (<Login />) : (<Outlet />)} >
                    <Route exact path="company" element={!authService.getCurrentUser() ? (<Login />) : (<CompanyDashboardLayout />)}>
                        <Route path="" element={<Dashboard />} />
                        <Route path="post" element={<CreateJob />} />
                        <Route path="profile" element={<ProfileEdit />} />

                        <Route path="jobs/:id" element={<CreateJob />} />
                        <Route path="jobs" element={<ManageJobs />} />
                        <Route path="condadates" element={<ManageApplications />} />
                        <Route path="inbox" element={<Inbox />} />
                        <Route path="inbox/:id" element={<Inbox />} />
                        <Route path="notifications" element={<Notifications />} />
                    </Route>
                    <Route path="" element={!authService.getCurrentUser() ? (<Login />) : (user && user.company ? <CompanyDashboardLayout /> : <CondadateDashboardLayout />)}>
                        <Route path="" element={user && user.company ? <Dashboard /> : <CondadateDashboard />} />
                        <Route path="post" element={user && user.company ? <CreateJob /> : <Navigate to="../switch" replace />} />
                        <Route path="jobs/:id" element={user && user.company ? <CreateJob /> : <Navigate to="../switch" replace />} />
                        <Route path="jobs" element={user && user.company ? <ManageJobs /> : <Navigate to="../switch" replace />} />
                        <Route path="condadates" element={user && user.company ? <ManageApplications /> : <Navigate to="../switch" replace />} />
                        <Route path="profile" element={<CondadateProfileEdit />} />
                        <Route path="applications" element={<CondadateApplications />} />
                        <Route path="favourites" element={<CondadateFavourites />} />
                        <Route path="password" element={<ChangePassword />} />
                        <Route path="switch" element={<Switch />} />
                        <Route path="inbox" element={<Inbox />} />
                        <Route path="inbox/:id" element={<Inbox />} />
                        <Route path="notifications" element={<Notifications />} />
                    </Route>
                </Route>


                <Route path="/search" element={<Search />} />
                <Route path="/companies" element={<Companies />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/signup" element={!authService.getCurrentUser() ? (<SignUp />) : (<Navigate to="/" replace />)} />
                <Route path="/login" element={!authService.getCurrentUser() ? (<Login />) : (<Navigate to="/" replace />)} />
                <Route path="/:id" element={<CondidateProfile />} >
                </Route>
                <Route path="/" element={<Index />} />

            </Routes>



            {location.pathname.search('/dashboard') ? <Footer /> : null}

        </div>


    );
};
export default App;
render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>,
    document.getElementById("root")
);

(function ($) {
    "use strict";

    var animateHTML = function () {
        var elems;
        var windowHeight;

        function init() {
            elems = document.querySelectorAll('.pxp-animate-in');
            windowHeight = window.innerHeight;
            addEventHandlers();
            checkPosition();
        }

        function addEventHandlers() {
            window.addEventListener('scroll', checkPosition);
            window.addEventListener('resize', init);
        }

        function checkPosition() {
            for (var i = 0; i < elems.length; i++) {
                var positionFromTop = elems[i].getBoundingClientRect().top;

                if (positionFromTop - windowHeight <= 0) {
                    elems[i].classList.add('pxp-in');
                    if ($(elems[i]).hasClass('pxp-info-stats-item')) {
                        animateBubbles(elems[i]);
                    }
                    if ($(elems[i]).hasClass('pxp-testimonials-1-circles-item')) {
                        animateTestimonialsCircles(elems[i]);
                    }
                }
            }
        }

        return {
            init: init
        };
    };

    function handlePreloader() {
        if ($('.pxp-preloader').length > 0) {
            $('.pxp-preloader').delay(200).fadeOut(500, function () {
                animateHTML().init();
                animateHeroElement('.pxp-hero-right-bg-card');
                animateHeroElement('.pxp-hero-card-info');
                animateHeroElement('.pxp-hero-cards-container');
                animateHeroElement('.pxp-hero-center-carousel');
                setTimeout(function () {
                    animateHeroElement('.pxp-hero-stats-item');
                }, 200);
                setTimeout(function () {
                    animateHeroElement('.pxp-header-side-image');
                }, 200);

                setTimeout(function () {
                    animateHeroElement('.pxp-contact-us-form');
                }, 200);

                animateHeroElement('.pxp-hero-boxed-circulars');
                animateHeroElement('.pxp-hero-boxed-icon-circle-1');
                animateHeroElement('.pxp-hero-boxed-icon-circle-2');

                animateHeroElement('.pxp-hero-boxed-info-card-big');
                animateHeroElement('.pxp-hero-boxed-info-card-small');
                animateHeroElement('.pxp-hero-boxed-info-list-container');

                animateOnMouseMove('.pxp-mouse-move');
            });
        }
    }

    function windowResizeHandler() {
        resizeHeroBoxedCirculars();
    }

    function onContentScroll() {
        if ($('.pxp-header').hasClass('pxp-bigger') || $('.pxp-header').hasClass('pxp-no-bg')) {
            if (window.pageYOffset > 20) {
                $('.pxp-header').addClass('pxp-is-sticky');
            } else {
                $('.pxp-header').removeClass('pxp-is-sticky');
            }
        } else if ($('.pxp-header').hasClass('pxp-no-bg')) {
            if (window.pageYOffset > 0) {
                $('.pxp-header').addClass('pxp-is-sticky');
            } else {
                $('.pxp-header').removeClass('pxp-is-sticky');
            }
        } else {
            if (window.pageYOffset > 93) {
                $('.pxp-header').addClass('pxp-is-sticky');
            } else {
                $('.pxp-header').removeClass('pxp-is-sticky');
            }
        }
    }

    window.onscroll = function () {
        onContentScroll();
    };

    $(window).on('load', function () {
        handlePreloader();
    });

    windowResizeHandler();

    $(window).resize(function () {
        windowResizeHandler();
    });

    function animateHeroElement(element) {
        if ($(element).hasClass('pxp-has-animation')) {
            $(element).addClass('pxp-animate');
        }
        if ($(element).hasClass('pxp-animate-cards')) {
            setTimeout(function () {
                $(element).find('.pxp-hero-card').addClass('pxp-animate');
            }, 600);
            setTimeout(function () {
                $(element).find('.pxp-hero-card-dark').addClass('pxp-animate');
                $(element).find('.pxp-hero-card-light').addClass('pxp-animate');
            }, 1200);
        }
        if ($(element).hasClass('pxp-animate-bounce')) {
            setTimeout(function () {
                $(element).addClass('animate__animated animate__bounceIn');
            }, 1800);
        }
        if ($(element).hasClass('pxp-animate-circles-bounce')) {
            $(element).addClass('animate__animated animate__bounceIn');
        }
        if ($(element).hasClass('pxp-animate-info-card')) {
            setTimeout(function () {
                $(element).addClass('animate__animated animate__flipInX');
            }, 300);
        }
        if ($(element).hasClass('pxp-animate-icon-circle-bounce')) {
            setTimeout(function () {
                $(element).addClass('animate__animated animate__bounceIn');
            }, 800);
        }
    }

    function animateBubbles(element) {
        if ($(element).hasClass('pxp-animate-bounce')) {
            setTimeout(function () {
                $(element).addClass('animate__animated animate__bounceIn');
            }, 500);
        }
    }

    function animateTestimonialsCircles(element) {
        if ($(element).hasClass('pxp-animate-bounce')) {
            setTimeout(function () {
                $(element).addClass('animate__animated animate__bounceIn');
            }, 200);
        }
    }

    function animateOnMouseMove(element) {
        const mouseMoveElems = document.querySelectorAll(element);

        mouseMoveElems.forEach(function (mouseMoveElem) {
            var speed = mouseMoveElem.getAttribute('data-speed');

            window.addEventListener('mousemove', (evt) => {
                const x = -(window.innerWidth / 2 - evt.pageX) / parseInt(speed);
                const y = -(window.innerHeight / 2 - evt.pageY) / parseInt(speed);
                mouseMoveElem.style.transform = `translateY(${y}px) translateX(${x}px)`;
            });
        });
    }

    function resizeHeroBoxedCirculars() {
        if ($('.pxp-hero-boxed-circulars').length > 0) {
            var circularsWidth = $('.pxp-hero-boxed-circulars').width();
            $('.pxp-hero-boxed-circulars').height(circularsWidth);
        }
    }

    if ($('.pxp-hero-logos-carousel').length > 0) {
        $('.pxp-hero-logos-carousel').owlCarousel({
            'nav': false,
            'dots': false,
            'margin': 40,
            'loop': true,
            'responsive': {
                0: {
                    'items': 4
                },
                767: {
                    'items': 5
                },
                991: {
                    'items': 7
                },
                1200: {
                    'items': 5
                },
                1400: {
                    'items': 6
                }
            },
            'checkVisible': false,
            'smartSpeed': 600,
            'autoplay': false,
            'autoplayTimeout': 5000
        });
    }

    $('.pxp-animate-icon').hover(function () {
        $(this).find('img').addClass('animate__animated animate__jackInTheBox');
    }, function () {
        $(this).find('img').removeClass('animate__animated animate__jackInTheBox');
    });

    // Price plans switcher
    $('[name=pxp-price-plans-switcher]').on('change', function () {
        var checkedValue = $('[name=pxp-price-plans-switcher]:checked').attr('data-period');

        if (checkedValue == 'month') {
            $('.pxp-plans-price-annual').hide();
            $('.pxp-plans-price-monthly').show();
        } else {
            $('.pxp-plans-price-monthly').hide();
            $('.pxp-plans-price-annual').show();
        }
    });

    if ($('.pxp-categories-carousel').length > 0) {
        $('.pxp-categories-carousel').owlCarousel({
            'nav': false,
            'dots': true,
            'margin': 30,
            'loop': false,
            'responsive': {
                0: {
                    'items': 1
                },
                600: {
                    'items': 2
                },
                900: {
                    'items': 4
                },
                1600: {
                    'items': 6
                }
            },
            'checkVisible': false,
            'smartSpeed': 600
        });
    }

    // Set checked badge color for jobs list filter
    $('.pxp-jobs-list-side-filter .list-group-item input[type="checkbox"').on('change', function () {
        if ($(this).is(":checked")) {
            $(this).parent().parent().addClass('pxp-checked');
        } else {
            $(this).parent().parent().removeClass('pxp-checked');
        }
    });

    // Company dashboard charts
    if ($('#pxp-company-dashboard-visits-chart').length > 0) {
        var companyVisitsChartElem = document.getElementById('pxp-company-dashboard-visits-chart').getContext('2d');

        var gradient = companyVisitsChartElem.createLinearGradient(0, 250, 0, 0);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
        gradient.addColorStop(.5, 'rgba(0, 112, 201, 0.09)');
        gradient.addColorStop(1, 'rgba(0, 112, 201, 0.12)');

        var companyVisitsChart = new Chart(companyVisitsChartElem, {
            type: 'line',
            data: {
                labels: ['Oct 06', 'Oct 07', 'Oct 08', 'Oct 09', 'Oct 10', 'Oct 11', 'Oct 12'],
                datasets: [{
                    label: 'Visits',
                    data: [12, 56, 34, 78, 38, 28, 54],
                    borderWidth: 3,
                    borderColor: 'rgba(0, 112, 201, 1)',
                    pointBackgroundColor: 'rgba(255, 255, 255, 0)',
                    pointHoverBackgroundColor: 'rgba(255, 255, 255, 1)',
                    pointBorderColor: 'rgba(66, 133, 244, 0)',
                    pointHoverBorderColor: 'rgba(0, 112, 201, 1)',
                    pointBorderWidth: 10,
                    pointHoverBorderWidth: 3,
                    pointHitRadius: 20,
                    cubicInterpolationMode: 'monotone',
                    fill: true,
                    backgroundColor: gradient
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        ticks: {
                            fontColor: 'rgba(153, 153, 153, 1)',
                            maxTicksLimit: 7,
                            maxRotation: 0
                        },
                        gridLines: {
                            zeroLineColor: 'rgba(232, 232, 232, 1)',
                            drawOnChartArea: false,
                        },
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontColor: 'rgba(153, 153, 153, 1)',
                            callback: function (value, index, values) {
                                if (Math.floor(value) === value) {
                                    return value;
                                }
                            }
                        },
                        gridLines: {
                            zeroLineColor: 'rgba(232, 232, 232, 0)',
                        },
                    }],
                },
                responsive: true,
                tooltips: {
                    backgroundColor: 'rgba(0, 39, 69, 1)',
                    cornerRadius: 7,
                    mode: 'index',
                    intersect: false,
                    displayColors: false,
                    xPadding: 10,
                    yPadding: 10,
                    titleFontColor: 'rgba(255, 255, 255, .7)',
                    bodyFontColor: 'rgba(255, 255, 255, 1)',
                    titleFontStyle: 'normal',
                    bodyFontStyle: 'bold',
                },
                legend: {
                    display: false,
                }
            }
        });
    }
    if ($('#pxp-company-dashboard-app-chart').length > 0) {
        var companyAppChartElem = document.getElementById('pxp-company-dashboard-app-chart').getContext('2d');

        var gradient = companyVisitsChartElem.createLinearGradient(0, 250, 0, 0);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
        gradient.addColorStop(.5, 'rgba(255, 168, 35, 0.09)');
        gradient.addColorStop(1, 'rgba(255, 168, 35, 0.12)');

        var companyAppChart = new Chart(companyAppChartElem, {
            type: 'line',
            data: {
                labels: ['Oct 06', 'Oct 07', 'Oct 08', 'Oct 09', 'Oct 10', 'Oct 11', 'Oct 12'],
                datasets: [{
                    label: 'Applications',
                    data: [43, 81, 72, 85, 42, 65, 80],
                    borderWidth: 3,
                    borderColor: 'rgba(255, 168, 35, 1)',
                    pointBackgroundColor: 'rgba(255, 255, 255, 0)',
                    pointHoverBackgroundColor: 'rgba(255, 255, 255, 1)',
                    pointBorderColor: 'rgba(66, 133, 244, 0)',
                    pointHoverBorderColor: 'rgba(255, 168, 35, 1)',
                    pointBorderWidth: 10,
                    pointHoverBorderWidth: 3,
                    pointHitRadius: 20,
                    cubicInterpolationMode: 'monotone',
                    fill: true,
                    backgroundColor: gradient
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        ticks: {
                            fontColor: 'rgba(153, 153, 153, 1)',
                            maxTicksLimit: 7,
                            maxRotation: 0
                        },
                        gridLines: {
                            zeroLineColor: 'rgba(232, 232, 232, 1)',
                            drawOnChartArea: false,
                        },
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontColor: 'rgba(153, 153, 153, 1)',
                            callback: function (value, index, values) {
                                if (Math.floor(value) === value) {
                                    return value;
                                }
                            }
                        },
                        gridLines: {
                            zeroLineColor: 'rgba(232, 232, 232, 0)',
                        },
                    }],
                },
                responsive: true,
                tooltips: {
                    backgroundColor: 'rgba(0, 39, 69, 1)',
                    cornerRadius: 7,
                    mode: 'index',
                    intersect: false,
                    displayColors: false,
                    xPadding: 10,
                    yPadding: 10,
                    titleFontColor: 'rgba(255, 255, 255, .7)',
                    bodyFontColor: 'rgba(255, 255, 255, 1)',
                    titleFontStyle: 'normal',
                    bodyFontStyle: 'bold',
                },
                legend: {
                    display: false,
                }
            }
        });
    }

    // Candidate dashboard charts
    if ($('#pxp-candidate-dashboard-visits-chart').length > 0) {
        var candidateVisitsChartElem = document.getElementById('pxp-candidate-dashboard-visits-chart').getContext('2d');

        var gradient = candidateVisitsChartElem.createLinearGradient(0, 250, 0, 0);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
        gradient.addColorStop(.5, 'rgba(0, 112, 201, 0.09)');
        gradient.addColorStop(1, 'rgba(0, 112, 201, 0.12)');

        var candidateVisitsChart = new Chart(candidateVisitsChartElem, {
            type: 'line',
            data: {
                labels: ['Oct 06', 'Oct 07', 'Oct 08', 'Oct 09', 'Oct 10', 'Oct 11', 'Oct 12'],
                datasets: [{
                    label: 'Visits',
                    data: [12, 56, 34, 78, 38, 28, 54],
                    borderWidth: 3,
                    borderColor: 'rgba(0, 112, 201, 1)',
                    pointBackgroundColor: 'rgba(255, 255, 255, 0)',
                    pointHoverBackgroundColor: 'rgba(255, 255, 255, 1)',
                    pointBorderColor: 'rgba(66, 133, 244, 0)',
                    pointHoverBorderColor: 'rgba(0, 112, 201, 1)',
                    pointBorderWidth: 10,
                    pointHoverBorderWidth: 3,
                    pointHitRadius: 20,
                    cubicInterpolationMode: 'monotone',
                    fill: true,
                    backgroundColor: gradient
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        ticks: {
                            fontColor: 'rgba(153, 153, 153, 1)',
                            maxTicksLimit: 7,
                            maxRotation: 0
                        },
                        gridLines: {
                            zeroLineColor: 'rgba(232, 232, 232, 1)',
                            drawOnChartArea: false,
                        },
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontColor: 'rgba(153, 153, 153, 1)',
                            callback: function (value, index, values) {
                                if (Math.floor(value) === value) {
                                    return value;
                                }
                            }
                        },
                        gridLines: {
                            zeroLineColor: 'rgba(232, 232, 232, 0)',
                        },
                    }],
                },
                responsive: true,
                tooltips: {
                    backgroundColor: 'rgba(0, 39, 69, 1)',
                    cornerRadius: 7,
                    mode: 'index',
                    intersect: false,
                    displayColors: false,
                    xPadding: 10,
                    yPadding: 10,
                    titleFontColor: 'rgba(255, 255, 255, .7)',
                    bodyFontColor: 'rgba(255, 255, 255, 1)',
                    titleFontStyle: 'normal',
                    bodyFontStyle: 'bold',
                },
                legend: {
                    display: false,
                }
            }
        });
    }
    if ($('#pxp-candidate-dashboard-app-chart').length > 0) {
        var candidateAppChartElem = document.getElementById('pxp-candidate-dashboard-app-chart').getContext('2d');

        var gradient = candidateVisitsChartElem.createLinearGradient(0, 250, 0, 0);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
        gradient.addColorStop(.5, 'rgba(255, 168, 35, 0.09)');
        gradient.addColorStop(1, 'rgba(255, 168, 35, 0.12)');

        var candidateAppChart = new Chart(candidateAppChartElem, {
            type: 'line',
            data: {
                labels: ['Oct 06', 'Oct 07', 'Oct 08', 'Oct 09', 'Oct 10', 'Oct 11', 'Oct 12'],
                datasets: [{
                    label: 'Applications',
                    data: [43, 81, 72, 85, 42, 65, 80],
                    borderWidth: 3,
                    borderColor: 'rgba(255, 168, 35, 1)',
                    pointBackgroundColor: 'rgba(255, 255, 255, 0)',
                    pointHoverBackgroundColor: 'rgba(255, 255, 255, 1)',
                    pointBorderColor: 'rgba(66, 133, 244, 0)',
                    pointHoverBorderColor: 'rgba(255, 168, 35, 1)',
                    pointBorderWidth: 10,
                    pointHoverBorderWidth: 3,
                    pointHitRadius: 20,
                    cubicInterpolationMode: 'monotone',
                    fill: true,
                    backgroundColor: gradient
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        ticks: {
                            fontColor: 'rgba(153, 153, 153, 1)',
                            maxTicksLimit: 7,
                            maxRotation: 0
                        },
                        gridLines: {
                            zeroLineColor: 'rgba(232, 232, 232, 1)',
                            drawOnChartArea: false,
                        },
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontColor: 'rgba(153, 153, 153, 1)',
                            callback: function (value, index, values) {
                                if (Math.floor(value) === value) {
                                    return value;
                                }
                            }
                        },
                        gridLines: {
                            zeroLineColor: 'rgba(232, 232, 232, 0)',
                        },
                    }],
                },
                responsive: true,
                tooltips: {
                    backgroundColor: 'rgba(0, 39, 69, 1)',
                    cornerRadius: 7,
                    mode: 'index',
                    intersect: false,
                    displayColors: false,
                    xPadding: 10,
                    yPadding: 10,
                    titleFontColor: 'rgba(255, 255, 255, .7)',
                    bodyFontColor: 'rgba(255, 255, 255, 1)',
                    titleFontStyle: 'normal',
                    bodyFontStyle: 'bold',
                },
                legend: {
                    display: false,
                }
            }
        });
    }

    // Upload company cover photo and logo
    if ($('#pxp-company-cover-choose-file').length > 0) {
        const chooseCoverFile = document.getElementById('pxp-company-cover-choose-file');

        chooseCoverFile.addEventListener('change', function () {
            const files = chooseCoverFile.files[0];

            if (files) {
                const fileReader = new FileReader();

                fileReader.readAsDataURL(files);
                fileReader.addEventListener("load", function () {
                    $('#pxp-company-cover-choose-file').next('label').css({
                        'background-image': 'url(' + this.result + ')',
                        'border': '0 none'
                    }).find('span').hide();
                });
            }
        });
    }
    if ($('#pxp-company-logo-choose-file').length > 0) {
        const chooseLogoFile = document.getElementById('pxp-company-logo-choose-file');

        chooseLogoFile.addEventListener('change', function () {
            const files = chooseLogoFile.files[0];

            if (files) {
                const fileReader = new FileReader();

                fileReader.readAsDataURL(files);
                fileReader.addEventListener("load", function () {
                    $('#pxp-company-logo-choose-file').next('label').css({
                        'background-image': 'url(' + this.result + ')',
                        'border': '0 none'
                    }).find('span').hide();
                });
            }
        });
    }

    // Upload candidate cover photo and logo
    if ($('#pxp-candidate-cover-choose-file').length > 0) {
        const chooseCandidateCoverFile = document.getElementById('pxp-candidate-cover-choose-file');

        chooseCandidateCoverFile.addEventListener('change', function () {
            const files = chooseCandidateCoverFile.files[0];

            if (files) {
                const fileReader = new FileReader();

                fileReader.readAsDataURL(files);
                fileReader.addEventListener("load", function () {
                    $('#pxp-candidate-cover-choose-file').next('label').css({
                        'background-image': 'url(' + this.result + ')',
                        'border': '0 none'
                    }).find('span').hide();
                });
            }
        });
    }
    if ($('#pxp-candidate-photo-choose-file').length > 0) {
        const chooseCandidatePhotoFile = document.getElementById('pxp-candidate-photo-choose-file');

        chooseCandidatePhotoFile.addEventListener('change', function () {
            const files = chooseCandidatePhotoFile.files[0];

            if (files) {
                const fileReader = new FileReader();

                fileReader.readAsDataURL(files);
                fileReader.addEventListener("load", function () {
                    $('#pxp-candidate-photo-choose-file').next('label').css({
                        'background-image': 'url(' + this.result + ')',
                        'border': '0 none'
                    }).find('span').hide();
                });
            }
        });
    }

    // Toogle side filter on mobile
    $('.pxp-list-side-filter-header a').on('click', function () {
        $(this).parent().parent().find('.pxp-list-side-filter-panel').slideToggle();
    });

    // Toggle job details panel on mobile
    $('.pxp-jobs-card-4').on('click', function () {
        $('.pxp-jobs-tab-content').addClass('pxp-show');
    });
    $('.pxp-jobs-tab-pane-close-btn').on('click', function () {
        $('.pxp-jobs-tab-content').removeClass('pxp-show');
    });

    // Toggle messages panel on mobile
    $('.pxp-dashboard-inbox-list-item').on('click', function () {
        $('.pxp-dashboard-inbox-messages-container').addClass('pxp-show');
    });
    $('.pxp-dashboard-inbox-messages-close-btn').on('click', function () {
        $('.pxp-dashboard-inbox-messages-container').removeClass('pxp-show');
    });
})(jQuery);

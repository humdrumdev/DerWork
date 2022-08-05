import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import categoriesService from "../../services/categories.service";
const CategoriesSection = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        categoriesService.getCategories().then(data => {
            setCategories(data.data);
            setLoading(false);
        }
        );

    }, []);

    return (
        <section className="mt-100">
            <div className="pxp-container">
                <h2 className="pxp-section-h2 text-center">Search by Category</h2>
                <p className="pxp-text-light text-center">Search your career opportunity with our categories</p>
    
                <div className="row mt-4 mt-md-5 pxp-animate-in pxp-animate-in-top pxp-in">
                    {
                        loading ?
                            <div className="col-12 text-center">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                            :
                            categories.map((category, index) => {
                                return (
                                    <div key={index} className="col-12 col-md-4 col-lg-3 col-xxl-2 pxp-categories-card-1-container">
                                        <Link to={"/search"} params={{ category: category.name }}
                                        className="pxp-categories-card-1">
                                            <div className="pxp-categories-card-1-icon-container">
                                                <div className="pxp-categories-card-1-icon">
                                                    <span className={
                                                        category.icon
                                                    }></span>
                                                </div>
                                            </div>
                                            <div className="pxp-categories-card-1-title">{category.label}</div>
                                            <div className="pxp-categories-card-1-subtitle">139 open positions</div>
                                        </Link>
                                    </div>
                                )
                            }
                            )

                    }
                </div>

                {/* <div className="mt-4 mt-md-5 text-center pxp-animate-in pxp-animate-in-top pxp-in">
                    <a href="jobs-list-1.html" className="btn rounded-pill pxp-section-cta">All Categories<span className="fa fa-angle-right"></span></a>
                </div> */}
            </div>
        </section>
        )
    }
export default CategoriesSection;
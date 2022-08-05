import CategoriesSection from './Categories';
import Cities from './Cities';
import HeaderSection from './HeaderSection';
import JobsSection from './JobsSection';
import TextSection from './TextSection';
const Home = () => {
    return (
        <div>
            <HeaderSection/>  
            <TextSection/> 
            <CategoriesSection/>
            <JobsSection/>
            <Cities/>

        </div>
    );
}

export default Home;

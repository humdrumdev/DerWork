import { useEffect, useState } from "react";
import CreateJobForm from "./CreateJobForm";
import { useParams } from "react-router-dom";
const CreateJob = () => {
    // payment details
    // const [jobSalaryType, setJobSalaryType] = useState("");
    // const [jobSalary, setJobSalary] = useState("");
    // const [jobSalaryRangeFrom, setJobSalaryRangeFrom] = useState("");
    // const [jobSalaryRangeTo, setJobSalaryRangeTo] = useState("");
    // const [jobSalaryCurrency, setJobSalaryCurrency] = useState("");


    // //job type
    // const [jobType, setJobType] = useState("");
    // const [jobTime, setJobTime] = useState("");

    // //How many people do you want to hire
    // const [numberOfPeople, setNumberOfPeople] = useState("");
    
    // //planned start date
    // const [startDate, setStartDate] = useState("");

    //job description

    // //Job settings (Country and language, etc)
    // const [jobCountry, setJobCountry] = useState("");
    // const [jobLanguage, setJobLanguage] = useState("");

    // //Apply method
    // const [applyMethod, setApplyMethod] = useState("");
    // const [applyEmail, setApplyEmail] = useState("");
    // const [applyLink, setApplyLink] = useState("");
    // const [applyPhone, setApplyPhone] = useState("");
    // const [applyAddress, setApplyAddress] = useState("");
    // const [applyWebsite, setApplyWebsite] = useState("");

    // //job requirements
    // const [jobRequirements, setJobRequirements] = useState("");
    // const [jobBenefits, setJobBenefits] = useState("");
    // const [jobSkills, setJobSkills] = useState("");
    // const [jobEducation, setJobEducation] = useState("");
    // const [jobExperience, setJobExperience] = useState("");
    // const [jobCertificates, setJobCertificates] = useState("");
    // const [jobCategories, setJobCategories] = useState("");
    // const [jobTags, setJobTags] = useState("");
    
    // //How quickly do you need to hire?
    // const [PostDuration, setPostDuration] = useState("");
    // @IsNotEmpty()
    // jobTitle: string;

    // @IsNotEmpty()
    // jobLocation: string;

    // @IsNotEmpty()
    // jobDescription: string;

    // @IsNotEmpty()
    // jobMinYearsOfExperience: number;

    // @IsNotEmpty()
    // jobCareerLevel: string;

    // @IsNotEmpty()
    // jobType: string;

    // @IsNotEmpty()
    // jobSalaryType: string;

    // @IsNotEmpty()
    // jobSalary: string;

    // @IsNotEmpty()
    // jobSalaryRangeFrom: string;

    // @IsNotEmpty()
    // jobSalaryRangeTo: string;

    // @IsNotEmpty()
    // jobSalaryCurrency: string;

    // @IsNotEmpty()
    // numberOfPeople: string;
    //submit job 

    //get job id from useParams

        const params = useParams();


    return (

        <div>
            <h1>Create Job Offer</h1>
                <p className="pxp-text-light">Edit your company profile page info.</p>
                <CreateJobForm id={params.id} />
        </div>
    );
};

export default CreateJob;
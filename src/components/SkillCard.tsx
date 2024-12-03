import styles from '../extension.module.scss';
import Logo from '../assets/images/primary-logo.png';
import cx from 'classnames';
import CircularProgressBar from './CircularProgress/CircularProgress';
import { LoadingState } from './LoadingState/LoadingState';
import { AutofillIcon } from './Icons/AutofillIcon';
import { ErrorState } from './ErrorState/ErrorState';
import { AutofillingState } from './AutofillingState/AutofillingState';
import { BlockIcon } from './Icons/BlockIcon';
interface JobData {
    companyName: string;
    jobRole: string;
    jobDescription: string;
    hardSkills: string[];
    softSkills: string[];
    skills: string[];
    scoringResult: {
        matchScore: number;
    };
}
interface SkillCardProps {
    error: Error | null;
    jobData: JobData;
    onJobScan: () => void;
    onHandleAutofillForm: () => void;
    isLoading: boolean;
    isAutofilling: boolean;
    isFormAvailable: boolean;
    isPremium: boolean;
    name: string;
}

export default function SkillCard({
    jobData,
    onJobScan,
    isLoading,
    isAutofilling,
    onHandleAutofillForm,
    isFormAvailable,
    error,
    isPremium,
    name
}: SkillCardProps) {
    const year = new Date().getFullYear();

    const generateContent = () => {
        if (error) {
            return <ErrorState {...{ error }} />;
        }

        if (isLoading) {
            return <LoadingState />;
        }

        if (isAutofilling) {
            return <AutofillingState />;
        }

        return (
            <div>
                <div className={styles.matcher}>
                    <CircularProgressBar
                        size={72}
                        progress={jobData.scoringResult.matchScore || 0}
                        strokeWidth={5}
                        circleOneStroke="#E4F0B5"
                        circleTwoStroke="#D6F06B"
                    />
                </div>
                <div className={styles.companyTitle}>
                    <h2 className={styles.title}>{jobData.jobRole || "Job Role"}</h2>
                    <p className={styles.company}>
                        @{jobData.companyName || "Company Name"}
                    </p>
                </div>
                <p className={styles.summary}>
                    {`This resume contains ${jobData.skills.length} keywords featured in the job description.`}
                </p>
                <div className={styles.skillGroup}>
                    {jobData.skills.map((skill) => (
                        <p key={skill} className={cx(styles.skill, styles.isContained)}>
                            {skill}
                        </p>
                    ))}
                </div>
                <div className={styles.buttonContainer}>
                    {isFormAvailable && (
                        <button
                            className={styles.button}
                            onClick={onHandleAutofillForm}
                            disabled={!isPremium || isAutofilling}
                        >
                            <p className={styles.autofillText}>Autofill Form</p>
                        </button>
                    )}
                    <button
                        className={styles.button}
                        onClick={onJobScan}
                        disabled={!isPremium}
                    >
                        <p className={styles.autofillText}>Scan</p>
                        <AutofillIcon />
                    </button>
                </div>
                {!isPremium && (
                    <div className={styles.blockScan}>
                        <div className={styles.textBox}>
                            <span className={styles.limit}>
                                <BlockIcon /> Free scan limit reached
                            </span>
                            <span className={styles.upgrade}>
                                Upgrade to{" "}
                                <a className={styles.premium} target="_blank" href="/ddd">
                                    Premium
                                </a>{" "}
                                for unlimited scans
                            </span>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <img className={styles.logo} src={Logo} alt="Sunday morning logo" />
                <span >Hello <span className={styles.name}>{name}</span></span>
            </div>
            <div className={cx(styles.content)}>{generateContent()}</div>
            <div className={styles.jobDescription}>
                <p>© Copyright {year} Sunday Morning, All Rights Reserved</p>
            </div>
        </div>
    );
}


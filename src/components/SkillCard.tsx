import styles from '../extension.module.scss';
import Logo from '../assets/images/primary-logo.png';
import cx from 'classnames';
import CircularProgressBar from './CircularProgress/CircularProgress';
import { LoadingState } from './LoadingState/LoadingState';
import { AutofillIcon } from './Icons/AutofillIcon';
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
    jobData: JobData;
    onJobScan: () => void;
    onHandleAutofillForm: () => void;
    isLoading: boolean;
    isAutofilling: boolean;
    isFormAvailable: boolean;
}

export default function SkillCard({ jobData, onJobScan, isLoading, isAutofilling, onHandleAutofillForm, isFormAvailable }: SkillCardProps) {
    const year = new Date().getFullYear()
    const isLoderActive = isLoading || isAutofilling;

    return (
        <div className={styles.card}>
            <img className={styles.logo} src={Logo} alt="Sunday morning logo" />
            <div className={cx(styles.content, { [styles.isLoading]: isLoderActive })}>
                {isLoderActive ? <LoadingState /> :
                    <>
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
                            <h2 className={styles.title}>{jobData.jobRole || 'Job Role'}</h2>
                            <p className={styles.company}>@{jobData.companyName || 'Company Name'}</p>
                        </div>
                        <p className={styles.summary}>
                            {`Your resume contains ${jobData.skills.length} keywords featured in the job description.`}
                        </p>
                        <div className={styles.skillGroup}>
                            {jobData.skills.map((skill) => (
                                <p key={skill} className={cx(styles.skill, styles.isContained)}>
                                    {skill}
                                </p>
                            ))}
                        </div>
                        <div className={styles.buttonContainer}>
                            {isFormAvailable && <button
                                className={styles.button}
                                onClick={onHandleAutofillForm}
                                disabled={isAutofilling}
                            >
                                <p className={styles.autofillText}>Autofill Form</p>
                            </button>}
                            <button className={styles.button} onClick={onJobScan}>
                                <p className={styles.autofillText}>Scan</p>
                                <AutofillIcon />
                            </button>
                        </div>
                    </>
                }
            </div>
            <div className={styles.jobDescription}>
                <p>© Copyright {year} Sunday Morning, All Rights Reserved</p>
            </div>
        </div>
    );
}

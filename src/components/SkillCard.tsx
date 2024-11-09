import styles from '../extension.module.scss';
import Logo from '../assets/images/primary-logo.png';
import cx from 'classnames';
import CircularProgressBar from './CircularProgress/CircularProgress';
// import { LoadingState } from './LoadingState/LoadingState';

interface SkillCardProps {
    skills: string[];
    onHighlightClick: () => void;
}

export default function SkillCard({ skills, onHighlightClick }: SkillCardProps) {
    return (
        <div className={styles.card}>
            <img className={styles.logo} src={Logo} alt="Sunday morning logo" />
            {/* <LoadingState /> */}
            <div className={styles.matcher}>
                <CircularProgressBar
                    size={72}
                    progress={70}
                    strokeWidth={5}
                    circleOneStroke="#E4F0B5"
                    circleTwoStroke="#D6F06B"
                />
            </div>
            <div className={styles.companyTitle}>
                <h2 className={styles.title}>Product Design Manager</h2>
                <p className={styles.company}>@Gitlab</p>
            </div>
            <p className={styles.summary}>
                Your resume contains {skills.length} keywords featured in the job description.
            </p>
            <div className={styles.skillGroup}>
                {skills.map((skill) => (
                    <p key={skill} className={cx(styles.skill, styles.isContained)}>
                        {skill}
                    </p>
                ))}
            </div>
            <p className={styles.source}>From Indeed</p>
            <button className={styles.button} onClick={onHighlightClick}>Highlight Skills</button>
            <div className={styles.jobDescription}>
                <p>© Copyright 2024 Sunday Morning, All Rights Reserved</p>
            </div>
        </div>
    );
}

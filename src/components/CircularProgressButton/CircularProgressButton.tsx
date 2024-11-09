import React from 'react';
import styles from './CircularProgressButton.module.scss';

interface CircularProgressButtonProps {
  size: number; // Diameter of the circle in pixels
  progress: number; // Progress percentage (0 - 100)
  onClick: () => void; // Click handler for the button
  strokeWidth?: number; // Optional stroke width
  circleOneStroke?: string; // Color of the background circle
  circleTwoStroke?: string; // Color of the progress circle
  buttonContent?: React.ReactNode; // Content inside the button
}

const CircularProgressButton: React.FC<CircularProgressButtonProps> = ({
  size,
  progress,
  onClick,
  strokeWidth = 10,
  circleOneStroke = '#E4F0B5',
  circleTwoStroke = '#D6F06B',
  buttonContent,
}) => {
  const normalizedRadius = (size - strokeWidth) / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (progress / 100) * circumference;

  // Unique IDs for the gradients to avoid conflicts
  const gradientIdBackground = `gradient-bg-${Math.random()}`;
  const gradientIdProgress = `gradient-progress-${Math.random()}`;

  return (
    <div
      className={styles.circularProgressButton}
      style={{ height: size, width: size }}
    >
      <svg
        height={size}
        width={size}
        className={styles.circularProgressBar}
      >
        <defs>
          {/* Gradient for the background circle */}
          <linearGradient
            id={gradientIdBackground}
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2={size}
            y2="0"
          >
            <stop
              offset="0%"
              stopColor={circleOneStroke}
              stopOpacity="0.5"
            />
            <stop
              offset="10%"
              stopColor={circleOneStroke}
              stopOpacity="1"
            />
            <stop
              offset="100%"
              stopColor={circleOneStroke}
              stopOpacity="1"
            />
          </linearGradient>

          {/* Gradient for the progress circle */}
          <linearGradient
            id={gradientIdProgress}
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2={size}
            y2="0"
          >
            <stop
              offset="100%"
              stopColor={circleTwoStroke}
              stopOpacity="1"
            />
            <stop
              offset="10%"
              stopColor={circleTwoStroke}
              stopOpacity="1"
            />
            <stop
              offset="0%"
              stopColor={circleTwoStroke}
              stopOpacity="0.5"
            />
          </linearGradient>
        </defs>

        {/* Background Circle */}
        <circle
          className={styles.backgroundCircle}
          stroke={`url(#${gradientIdBackground})`}
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={size / 2}
          cy={size / 2}
        />

        {/* Progress Circle */}
        <circle
          className={styles.progressCircle}
          stroke={`url(#${gradientIdProgress})`}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>

      {/* Circular Button */}
      <button
        className={styles.centerButton}
        onClick={onClick}
        style={{
          height: size - strokeWidth * 2,
          width: size - strokeWidth * 2,
        }}
      >
        {buttonContent}
      </button>
    </div>
  );
};

export default CircularProgressButton;

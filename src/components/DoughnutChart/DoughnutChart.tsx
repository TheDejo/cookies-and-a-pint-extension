import React, { useState, useEffect, useRef } from 'react';
import styles from './DoughnutChart.module.scss'

const DoughnutChart: React.FC = () => {
    const [value] = useState<number>(75); // Initialize slider value at 50
    const canvasRef = useRef<HTMLCanvasElement>(null); // Reference to the canvas

    const doughnutValue = value < 35 ? 'Low' : `${value}%`

    // Function to draw the doughnut chart
    const drawDoughnut = (ctx: CanvasRenderingContext2D, value: number) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        const centerX = ctx.canvas.width / 2;
        const centerY = ctx.canvas.height / 2;
        const radius = 90;
        const lineWidth = 30;

        // Outer circle (grey background)
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = 'transparent';
        ctx.stroke();
        ctx.closePath();

        // Create a linear gradient for the inner arc with a fade effect
        // const gradient = ctx.createLinearGradient(0, 0, ctx.canvas.width, ctx.canvas.height);
        // gradient.addColorStop(1, 'rgba(236, 230, 208, 0.896)'); // Start color (faded yellow)
        // gradient.addColorStop(0.5, 'rgba(239, 203, 59, 0.7)'); // Midway with more opacity
        // gradient.addColorStop(0, 'rgba(239, 203, 59, 1)'); // End color (full opacity yellow)

        const gradient = ctx.createLinearGradient(0, 0, ctx.canvas.width, ctx.canvas.height);
        gradient.addColorStop(1, 'rgba(24, 191, 113, 0)'); // Start color (faded green)
        gradient.addColorStop(0.5, 'rgba(24, 191, 113, 0.7)'); // Midway with more opacity
        gradient.addColorStop(0, 'rgba(24, 191, 113, 1)'); // End color (full opacity green)

        // Inner circle (dynamic based on range input)
        const startAngle = 0; // Start from the 3 o'clock position
        const endAngle = startAngle + (2 * Math.PI * (value / 100)); // Proportional end based on value
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = gradient; // Apply the gradient
        ctx.lineCap = 'round'; // Round the tip of the arc
        ctx.stroke();
        ctx.closePath();

        // Add the percentage text in the middle
        ctx.font = 'bold 40px Arial';
        ctx.fillStyle = '#000000'; // Black text color
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${doughnutValue}`, centerX, centerY); // Draw the percentage text at the center
    };


    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                drawDoughnut(ctx, value);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);


    return (
        <div className={styles.component}>
            <div className={styles.chartContainer}>
                <canvas ref={canvasRef} width="220" height="220" />
            </div>
        </div>
    );
};

export default DoughnutChart;

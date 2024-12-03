export const AutoFillLoader = () => {
    return (
        <svg
            width="102"
            height="102"
            viewBox="0 0 102 102"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="1"
                y="1"
                width="100"
                height="100"
                fill="url(#paint0_radial_762_1176)"
                fillOpacity="0.25"
            >
                <animate
                    attributeName="fill-opacity"
                    from="0"
                    to="0.25"
                    dur="2s"
                    repeatCount="indefinite"
                />
            </rect>
            <path
                d="M1 19V3C1 1.89543 1.89543 1 3 1H19"
                stroke="#D6F06B"
                strokeWidth="2"
                strokeLinecap="round"
            >
                <animate
                    attributeName="stroke-dasharray"
                    from="0,40"
                    to="40,0"
                    dur="2s"
                    repeatCount="indefinite"
                />
            </path>
            <path
                d="M19 101H3C1.89543 101 1 100.105 1 99L1 83"
                stroke="#D6F06B"
                strokeWidth="2"
                strokeLinecap="round"
            >
                <animate
                    attributeName="stroke-dasharray"
                    from="0,40"
                    to="40,0"
                    dur="2s"
                    begin="0.5s"
                    repeatCount="indefinite"
                />
            </path>
            <path
                d="M101 83V99C101 100.105 100.105 101 99 101H83"
                stroke="#D6F06B"
                strokeWidth="2"
                strokeLinecap="round"
            >
                <animate
                    attributeName="stroke-dasharray"
                    from="0,40"
                    to="40,0"
                    dur="2s"
                    begin="1s"
                    repeatCount="indefinite"
                />
            </path>
            <path
                d="M83 1L99 1C100.105 1 101 1.89543 101 3V19"
                stroke="#D6F06B"
                strokeWidth="2"
                strokeLinecap="round"
            >
                <animate
                    attributeName="stroke-dasharray"
                    from="0,40"
                    to="40,0"
                    dur="2s"
                    begin="1.5s"
                    repeatCount="indefinite"
                />
            </path>
            <path
                d="M1 51H101"
                stroke="url(#paint1_linear_762_1176)"
                strokeWidth="2"
                strokeLinecap="round"
            >
                <animate
                    attributeName="stroke-opacity"
                    from="0"
                    to="1"
                    dur="1.5s"
                    repeatCount="indefinite"
                />
            </path>
            <defs>
                <radialGradient
                    id="paint0_radial_762_1176"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(51 51) rotate(90) scale(50)"
                >
                    <stop stopColor="#D6F06B" />
                    <stop offset="1" stopColor="#D6F06B" stopOpacity="0" />
                </radialGradient>
                <linearGradient
                    id="paint1_linear_762_1176"
                    x1="1"
                    y1="51.5"
                    x2="101"
                    y2="51.5"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#D6F06B" stopOpacity="0" />
                    <stop offset="0.495" stopColor="#D6F06B" />
                    <stop offset="1" stopColor="#D6F06B" stopOpacity="0" />
                </linearGradient>
            </defs>
        </svg>
    )
}

export const Loader = () => {
  return (
    <svg width="102" height="102" viewBox="0 0 102 102" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="100" height="100" fill="url(#paint0_radial_734_448)" fillOpacity="0.25">
        <animate attributeName="fillOpacity" values="0.25; 0.4; 0.25" dur="2s" repeatCount="indefinite" />
      </rect>
      <path d="M1 19V3C1 1.89543 1.89543 1 3 1H19" stroke="#D6F06B" stroke-width="2" strokeLinecap="round">
        <animate attributeName="stroke-dasharray" values="0,20;20,0;0,20" dur="1.5s" repeatCount="indefinite" />
      </path>
      <path d="M19 101H3C1.89543 101 1 100.105 1 99L1 83" stroke="#D6F06B" stroke-width="2" strokeLinecap="round">
        <animate attributeName="stroke-dasharray" values="0,20;20,0;0,20" dur="1.5s" repeatCount="indefinite" begin="0.5s" />
      </path>
      <path d="M101 83V99C101 100.105 100.105 101 99 101H83" stroke="#D6F06B" stroke-width="2" strokeLinecap="round">
        <animate attributeName="stroke-dasharray" values="0,20;20,0;0,20" dur="1.5s" repeatCount="indefinite" begin="1s" />
      </path>
      <path d="M83 1L99 1C100.105 1 101 1.89543 101 3V19" stroke="#D6F06B" stroke-width="2" strokeLinecap="round">
        <animate attributeName="stroke-dasharray" values="0,20;20,0;0,20" dur="1.5s" repeatCount="indefinite" begin="1.5s" />
      </path>
      <path d="M1 51H101" stroke="url(#paint1_linear_734_448)" stroke-width="2" strokeLinecap="round">
        <animateTransform attributeName="transform" type="translate" values="0 0; 20 0; 0 0" dur="1.8s" repeatCount="indefinite" />
      </path>
      <defs>
        <radialGradient id="paint0_radial_734_448" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(51 51) rotate(90) scale(50)">
          <stop stopColor="#D6F06B" />
          <stop offset="1" stopColor="#D6F06B" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="paint1_linear_734_448" x1="1" y1="51.5" x2="101" y2="51.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D6F06B" stopOpacity="0" />
          <stop offset="0.495" stopColor="#D6F06B" />
          <stop offset="1" stopColor="#D6F06B" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}

import React from 'react';

export const AddBug = ( props ) => (
    <svg viewBox="0 0 49 49" {...props}>
        <defs>
            <rect id="path-1" x="0" y="0" width="41.0696264" height="40.1973186" rx="8"></rect>
            <filter x="-12.2%" y="-12.4%" width="134.1%" height="134.8%" filterUnits="objectBoundingBox" id="filter-2">
                <feOffset dx="2" dy="2" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                <feComposite in="shadowBlurOuter1" in2="SourceAlpha" operator="out" result="shadowBlurOuter1"></feComposite>
                <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
            </filter>
        </defs>
        <g id="Admin-+-registrere-bugs" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="Bug-Meny" transform="translate(-318.000000, -98.000000)">
                <g id="Group-4" transform="translate(320.000000, 100.000000)">
                    <g id="Rectangle-2">
                        <use fill="black" fillOpacity="1" filter="url(#filter-2)" href="#path-1"></use>
                        <use fill="#FFFFFF" fillRule="evenodd" href="#path-1"></use>
                        <rect stroke="#FFFFFF" strokeWidth="1" x="0.5" y="0.5" width="40.0696264" height="39.1973186" rx="8"></rect>
                    </g>
                    <g id="rgb_SB1_slett_16x16-Copy-14" transform="translate(20.606602, 19.606602) rotate(45.000000) translate(-20.606602, -19.606602) translate(13.106602, 12.106602)" fill="#C94096">
                        <g id="Logo" transform="translate(-0.000000, 0.000000)">
                            <path d="M14.4606132,11.5424216 L10.2427832,7.32459157 L14.4606132,3.10676158 C15.1024569,2.46491788 15.1941488,1.73138223 14.4606132,1.08953854 L14.0021534,0.631078757 C13.3603097,-0.0107649373 12.6267741,-0.0107649373 11.8932384,0.631078757 L7.67540843,4.75721679 L3.45757845,0.5393868 C2.7240428,-0.19414885 2.0821991,-0.102456894 1.34866345,0.5393868 L0.89020367,0.997846582 C0.248359976,1.63969028 0.248359976,2.37322593 0.89020367,3.01506962 L5.10803366,7.32459157 L0.89020367,11.5424216 C0.15666802,12.2759572 0.248359976,12.9178009 0.89020367,13.6513365 L1.34866345,14.1097963 C1.99050715,14.75164 2.7240428,14.75164 3.36588649,14.1097963 L7.67540843,9.89196634 L11.8932384,14.1097963 C12.5350821,14.75164 13.2686178,14.843332 13.9104615,14.1097963 L14.3689212,13.6513365 C15.1024569,13.0094929 15.1024569,12.2759572 14.4606132,11.5424216 L14.4606132,11.5424216 Z" id="Shape"></path>
                        </g>
                    </g>
                </g>
            </g>
        </g>
    </svg>
);

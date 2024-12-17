import React from "react";

const FeaturesTab = () => {
  const features = [
    "Fiber or filament: type, size, length",
    "Yarn: diameter, twist, weight or size, count, fiber content for mixed yarns, ply",
    "Weight: ounces per squared or yards per pound",
    "Thickness: vertical depth",
    "Fabric structure",
    "Woven fabrics: weave type, warp and filling yarn count per linear inch",
    "Knitted fabric: knit type, wale and course count per inch",
    "Finishes: chemicals such as resins, starches, waxes and mechanical effects",
    "Fabric width: The length of the filling or course",
  ];

  return (
    <ul className="sherah-features-list">
      {features.map((feature, index) => (
        <li key={index}>
          <svg
            className="sherah-offset__fill"
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="11"
            viewBox="0 0 12 11"
          >
            <g
              id="Group_1022"
              data-name="Group 1022"
              transform="translate(-165.75 -19.435)"
            >
              <path
                id="Path_550"
                data-name="Path 550"
                d="M165.75,24.587c.03-.212.052-.424.091-.634a5.39,5.39,0,0,1,7.9-3.832c.034.018.067.039.112.065l-.594,1.028a4.214,4.214,0,0,0-4.085-.04,4.027,4.027,0,0,0-2.048,2.56,4.254,4.254,0,0,0,3.005,5.353,4.023,4.023,0,0,0,3.607-.767,4.223,4.223,0,0,0,1.622-3.369h1.212c-.03.3-.042.6-.09.892a5.39,5.39,0,0,1-1.64,3.124,5.363,5.363,0,0,1-7.062.271,5.344,5.344,0,0,1-1.932-3.29c-.039-.214-.062-.43-.092-.646Z"
              />
              <path
                id="Path_551"
                data-name="Path 551"
                d="M271.957,39.458a1.187,1.187,0,0,0-.106.085l-5.782,5.782a1.168,1.168,0,0,0-.08.1L263,42.428l.807-.8,2.126,2.127,5.18-5.18.848.857Z"
                transform="translate(-94.207 -18.545)"
              />
            </g>
          </svg>
          {feature}
        </li>
      ))}
    </ul>
  );
};

export default FeaturesTab;

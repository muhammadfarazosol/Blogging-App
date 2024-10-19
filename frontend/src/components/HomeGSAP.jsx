// import React, { useEffect, useRef } from "react";
// import { gsap } from "gsap";

// export default function OsakaCard() {
//   const cardRef = useRef(null);

//   useEffect(() => {
//     const UPDATE = ({ x, y }) => {
//       gsap.set(document.documentElement, {
//         "--x": gsap.utils.mapRange(0, window.innerWidth, -1, 1, x),
//         "--y": gsap.utils.mapRange(0, window.innerHeight, -1, 1, y),
//       });
//     };

//     window.addEventListener("pointermove", UPDATE);

//     return () => {
//       window.removeEventListener("pointermove", UPDATE);
//     };
//   }, []);

//   return (
//     <article ref={cardRef} className="osaka-card bg-black">
//       <h3 className="pr-14">Neuro &nbsp;&nbsp; Nest</h3>

//       {/* add own image */}
//       <svg
//         className="osaka-tower"
//         viewBox="0 0 100 100"
//         preserveAspectRatio="none"
//         width={20}
//         height={10}
//       >
//         <polygon points="50,0 40,100 60,100" fill="#808080" />
//       </svg>

//       <div className="blur">
//         <svg
//           className="osaka-blur"
//           viewBox="0 0 100 100"
//           preserveAspectRatio="none"
//         >
//           <rect width="100" height="100" fill="#4B0082" />
//         </svg>
//         <div style={{ "--index": 7 }}></div>
//       </div>

//       <div className="content">
//         <p>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             fill="currentColor"
//             className="w-6 h-6"
//           >
//             <path d="M15.75 8.25a.75.75 0 0 1 .75.75c0 1.12-.492 2.126-1.27 2.812a.75.75 0 1 1-.992-1.124A2.243 2.243 0 0 0 15 9a.75.75 0 0 1 .75-.75Z" />
//             <path
//               fillRule="evenodd"
//               d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM4.575 15.6a8.25 8.25 0 0 0 9.348 4.425 1.966 1.966 0 0 0-1.84-1.275.983.983 0 0 1-.97-.822l-.073-.437c-.094-.565.25-1.11.8-1.267l.99-.282c.427-.123.783-.418.982-.816l.036-.073a1.453 1.453 0 0 1 2.328-.377L16.5 15h.628a2.25 2.25 0 0 1 1.983 1.186 8.25 8.25 0 0 0-6.345-12.4c.044.262.18.503.389.676l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.575 15.6Z"
//               clipRule="evenodd"
//             />
//           </svg>
//           <span>Unleash your words</span>
//         </p>
//         <p>and share with others</p>
//       </div>

//       <style jsx>{`
//         @import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");

//         .osaka-card {
//           width: full;
//           aspect-ratio: 2 / 0.5;
//           position: relative;
//           overflow: hidden;
//         }

//         .osaka-card h3 {
//           position: absolute;
//           left: 50%;
//           top: 6%;
//           margin: 0;
//           font-size: 8rem;
//           translate: -50% 0;
//           text-transform: uppercase;
//           font-family: "Bebas Neue", sans-serif;
//           color: white;
//           translate: calc(-50% + (var(--x) * -30px)) calc(var(--y) * -20px);
//         }

//         .osaka-card .content {
//           min-height: 32%;
//           position: absolute;
//           bottom: 0;
//           width: 100%;
//           color: white;
//           display: grid;
//           gap: 0.2rem;
//           place-items: center;
//           align-content: center;
//           padding-bottom: 0.5rem;
//         }

//         .osaka-card .content svg {
//           width: 20px;
//         }

//         .osaka-card .content p {
//           margin: 0;
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           font-size: 1.2rem;
//         }

//         .osaka-card .content p:first-of-type::after {
//           content: "";
//           position: absolute;
//           top: 1rem;
//           left: 50%;
//           width: 6ch;
//           background: white;
//           height: 1px;
//           translate: -50% 0;
//         }

//         .osaka-card .content p:last-of-type {
//           opacity: 0.8;
//         }

//         .osaka-card .blur {
//           position: absolute;
//           inset: 60% 0 -26% 0;
//           filter: blur(20px);
//           overflow: hidden;
//         }

//         .osaka-card .blur .osaka-blur {
//           object-position: calc(-50% + (var(--x) * 40px))
//             calc(47.5% + (var(--y) * -40px));
//           object-fit: cover;
//           left: 50%;
//           translate: -50% 0;
//           height: 330px;
//           position: absolute;
//           bottom: 25%;
//           width: 660px;
//           mask: radial-gradient(50% 100% at 50% 90%, white 50%, transparent);
//           filter: saturate(1.5) brightness(0.8);
//         }

//         .osaka-card > .osaka-tower {
//           position: absolute;
//           top: 0;
//           left: 50%;
//           translate: -50% 0;
//           height: 100%;
//           width: 660px;
//           object-fit: cover;
//           object-position: center 43%;
//           user-select: none;
//           pointer-events: none;
//         }

//         .osaka-card > .osaka-tower {
//           object-position: calc(-50% + (var(--x) * 40px))
//             calc(43% + (var(--y) * -40px));
//         }
//       `}</style>
//     </article>
//   );
// }

import React, { useEffect } from "react";
import { gsap } from "gsap";

export default function OsakaCard() {
  useEffect(() => {
    const UPDATE = ({ x, y }) => {
      gsap.set(document.documentElement, {
        "--x": gsap.utils.mapRange(0, window.innerWidth, -1, 1, x),
        "--y": gsap.utils.mapRange(0, window.innerHeight, -1, 1, y),
      });
    };

    window.addEventListener("pointermove", UPDATE);

    return () => {
      window.removeEventListener("pointermove", UPDATE);
    };
  }, []);

  return (
    <article className="osaka-card bg-slate-900 w-full relative overflow-hidden">
      <h3 className="absolute left-1/2 top-[6%] m-0 text-4xl sm:text-6xl md:text-8xl uppercase font-['Bebas_Neue',sans-serif] text-white transform translate-x-[calc(-50%+var(--x)*-30px)] translate-y-[calc(var(--y)*-20px)] lg:pr-12 max-sm:pr-4 custom-padding">
        Neuro &nbsp;&nbsp; Nest
      </h3>

      <svg
        className="osaka-tower absolute top-0 left-1/2 -translate-x-1/2 h-full w-full sm:w-[660px] object-cover object-center pointer-events-none select-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <polygon points="50,0 40,100 60,100" fill="#808080" />
      </svg>

      <div className="absolute inset-x-0 top-[60%] bottom-[-26%] filter blur-[20px] overflow-hidden">
        <svg
          className="osaka-blur absolute bottom-[25%] left-1/2 -translate-x-1/2 h-[330px] w-[860px] object-cover object-center mask-radial-gradient"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <rect width="100" height="100" fill="#4B0082" />
        </svg>
      </div>

      <div className="content absolute bottom-0 w-full text-white grid gap-2 place-items-center content-center pb-2 sm:pb-4">
        <p className="flex items-center gap-2 text-sm sm:text-base md:text-lg lg:text-xl relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
          >
            <path d="M15.75 8.25a.75.75 0 0 1 .75.75c0 1.12-.492 2.126-1.27 2.812a.75.75 0 1 1-.992-1.124A2.243 2.243 0 0 0 15 9a.75.75 0 0 1 .75-.75Z" />
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM4.575 15.6a8.25 8.25 0 0 0 9.348 4.425 1.966 1.966 0 0 0-1.84-1.275.983.983 0 0 1-.97-.822l-.073-.437c-.094-.565.25-1.11.8-1.267l.99-.282c.427-.123.783-.418.982-.816l.036-.073a1.453 1.453 0 0 1 2.328-.377L16.5 15h.628a2.25 2.25 0 0 1 1.983 1.186 8.25 8.25 0 0 0-6.345-12.4c.044.262.18.503.389.676l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.575 15.6Z"
              clipRule="evenodd"
            />
          </svg>
          <span>Unleash your words</span>
        </p>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl opacity-80">
          and share with others
        </p>
      </div>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");

        .osaka-card {
          aspect-ratio: 2 / 0.5;
          height: 400px;
        }

        .osaka-blur {
          object-position: calc(-50% + (var(--x) * 40px))
            calc(47.5% + (var(--y) * -40px));
          mask: radial-gradient(50% 100% at 50% 90%, white 50%, transparent);
          filter: saturate(1.5) brightness(0.8);
        }

        .osaka-tower {
          object-position: calc(-50% + (var(--x) * 40px))
            calc(43% + (var(--y) * -40px));
        }
      `}</style>
    </article>
  );
}

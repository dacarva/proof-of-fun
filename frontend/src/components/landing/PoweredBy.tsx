import { useEffect, useRef } from "react";

type Technologies = {
  name: string;
  src: string;
  url: string;
};
export default function PoweredBy(): JSX.Element {
  const scroller = useRef<HTMLDivElement>(null);
  const scrollerInner = useRef<HTMLUListElement>(null);

  const addAnimation = () => {
    scroller.current?.classList.add("active-scroller");
    const scrollerItems = Array.from(scrollerInner.current?.children || []);

    scrollerItems.forEach((item) => {
      const duplicate = item.cloneNode(true);
      scrollerInner.current?.appendChild(duplicate);
    });
  };

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addAnimation();
    }
  }, []);

  return (
    <section className="container mx-auto my-20">
      <h1 className="accent text-center font-extrabold mb-10">Powered by</h1>
      <div className="scroller" ref={scroller}>
        <ul className="inner-scroller" ref={scrollerInner}>
          {technologies.map((tech, index) => (
            <li key={index}>
              <a href={tech.url} target="_blank" rel="noreferrer noopener">
                <img
                  src={tech.src}
                  alt={tech.name}
                  className={`grayscale min-w-[200px]`}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const technologies: Technologies[] = [
  {
    name: "aave",
    src: "/images/aave.webp",
    url: "https://aave.com/",
  },
  {
    name: "scroll",
    src: "/images/scroll.webp",
    url: "https://scroll.io/",
  },
  {
    name: "thirdweb",
    src: "/images/thirdweb.webp",
    url: "https://thirdweb.com/",
  },
  {
    name: "zk-email",
    src: "/images/zk-email.webp",
    url: "https://zkemail.gitbook.io/zk-email/",
  },
];

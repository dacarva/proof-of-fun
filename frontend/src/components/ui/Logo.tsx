export default function Logo({
  className,
}: {
  className?: string;
}): JSX.Element {
  return (
    <svg
      width="157"
      height="135"
      viewBox="0 0 157 135"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M25.5 13C25.5 6.09644 19.9036 0.5 13 0.5C6.09644 0.5 0.5 6.09644 0.5 13H25.5ZM13 114.276H0.5C0.5 118.348 2.48377 122.165 5.81649 124.505L13 114.276ZM77 115.134L82.8378 126.187C86.9359 124.022 89.5 119.768 89.5 115.134H77ZM77 13V0.5C70.0964 0.5 64.5 6.09644 64.5 13L77 13ZM144 25.5C150.904 25.5 156.5 19.9036 156.5 13C156.5 6.09644 150.904 0.5 144 0.5V25.5ZM64 122V134.5H67.0982L69.8378 133.053L64 122ZM24 122L16.8165 132.23L20.0495 134.5H24V122ZM0.5 13V114.276H25.5V13H0.5ZM89.5 115.134V13H64.5V115.134H89.5ZM77 25.5H144V0.5H77V25.5ZM43 134.5H64V109.5H43V134.5ZM69.8378 133.053L82.8378 126.187L71.1622 104.081L58.1622 110.947L69.8378 133.053ZM5.81649 124.505L16.8165 132.23L31.1835 111.77L20.1835 104.046L5.81649 124.505ZM24 134.5H43V109.5H24V134.5Z" />
      <path
        d="M87 66H136"
        stroke="currentColor"
        stroke-width="25"
        stroke-linecap="round"
      />
    </svg>
  );
}

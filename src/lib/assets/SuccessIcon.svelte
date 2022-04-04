<svg
  class="checkmark"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 52 52"
>
  <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
</svg>

<style>
  .checkmark {
    stroke-width: 4;
    stroke: rgb(148, 150, 31);
    stroke-miterlimit: 10;
  }

  .checkmark__check {
    transform: scale(1.3);
    transform-origin: 50% 50%;
    stroke-dasharray: 48;
    stroke-dashoffset: 48;
    animation: stroke 0.1s ease-in 0.1s forwards;
  }

  @keyframes stroke {
    100% {
      stroke-dashoffset: 0;
    }
  }
</style>

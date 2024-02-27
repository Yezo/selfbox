import { cn } from "@/lib/utils";
import Image from "next/image";

export const HomeIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
};

export const BirdIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M16 7h.01" />
      <path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20" />
      <path d="m20 7 2 .5-2 .5" />
      <path d="M10 18v3" />
      <path d="M14 17.75V21" />
      <path d="M7 18a6 6 0 0 0 3.84-10.61" />
    </svg>
  );
};

export const ErrorIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="70"
      height="70"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-center text-foreground"
    >
      <path d="M19.07 4.93A10 10 0 0 0 6.99 3.34" />
      <path d="M4 6h.01" />
      <path d="M2.29 9.62A10 10 0 1 0 21.31 8.35" />
      <path d="M16.24 7.76A6 6 0 1 0 8.23 16.67" />
      <path d="M12 18h.01" />
      <path d="M17.99 11.66A6 6 0 0 1 15.77 16.67" />
      <circle cx="12" cy="12" r="2" />
      <path d="m13.41 10.59 5.66-5.66" />
    </svg>
  );
};

export const GithubIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="30"
      height="30"
      viewBox="0,0,256,256"
    >
      <g
        fill="#ffffff"
        fillRule="nonzero"
        stroke="none"
        strokeWidth="1"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit="10"
        strokeDasharray=""
        strokeDashoffset="0"
        fontFamily="none"
        fontWeight="none"
        fontSize="none"
        textAnchor="none"
      >
        <g transform="scale(4,4)">
          <path d="M32,10c-12.15,0 -22,9.85 -22,22c0,12.15 9.85,22 22,22c12.15,0 22,-9.85 22,-22c0,-12.15 -9.85,-22 -22,-22zM32,14c9.941,0 18,8.059 18,18c0,8.23871 -5.54128,15.16934 -13.0957,17.30664c-0.0928,-0.19124 -0.15645,-0.40072 -0.15039,-0.63867c0.031,-1.209 0,-4.03041 0,-5.06641c0,-1.778 -1.125,-3.03906 -1.125,-3.03906c0,0 8.82422,0.09959 8.82422,-9.31641c0,-3.633 -1.89844,-5.52539 -1.89844,-5.52539c0,0 0.9973,-3.87844 -0.3457,-5.52344c-1.505,-0.163 -4.20056,1.43755 -5.35156,2.18555c0,0 -1.82342,-0.74805 -4.85742,-0.74805c-3.034,0 -4.85742,0.74805 -4.85742,0.74805c-1.151,-0.748 -3.84656,-2.34755 -5.35156,-2.18555c-1.342,1.645 -0.3457,5.52344 -0.3457,5.52344c0,0 -1.89844,1.89044 -1.89844,5.52344c0,9.416 8.82422,9.31836 8.82422,9.31836c0,0 -1.00476,1.14381 -1.10547,2.7832c-0.58969,0.20793 -1.39349,0.45313 -2.16016,0.45313c-1.85,0 -3.25548,-1.79691 -3.77148,-2.62891c-0.508,-0.821 -1.54948,-1.50977 -2.52148,-1.50977c-0.64,0 -0.95312,0.3215 -0.95312,0.6875c0,0.366 0.89823,0.62083 1.49023,1.29883c1.248,1.43 1.22488,4.64648 5.67188,4.64648c0.5258,0 1.47056,-0.1211 2.22461,-0.22461c-0.00417,1.00955 -0.0159,1.97778 0,2.59766c0.00586,0.23869 -0.05897,0.44894 -0.15234,0.64063c-7.55349,-2.1379 -13.09375,-9.0686 -13.09375,-17.30664c0,-9.941 8.059,-18 18,-18z"></path>
        </g>
      </g>
    </svg>
  );
};

export const GoogleIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="20"
      height="20"
      viewBox="0 0 48 48"
    >
      <path
        fill="#FFC107"
        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
      ></path>
      <path
        fill="#FF3D00"
        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
      ></path>
      <path
        fill="#4CAF50"
        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
      ></path>
      <path
        fill="#1976D2"
        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
      ></path>
    </svg>
  );
};

export const WrenchIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
};

export const SocialMediaContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid min-h-11 min-w-11 place-items-center rounded-md bg-sky-800 p-1 shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const TwitterIcon = ({ size }: { size?: string }) => {
  return (
    <SocialMediaContainer
      className={`bg-black ${size === "small" && "min-h-6 min-w-6"}`}
    >
      <Image
        src="/images/logo/twitter.png"
        alt="Twitter's logo"
        width={size === "small" ? 12 : 24}
        height={size === "small" ? 12 : 24}
        className={`${size === "small" ? "max-h-[12px] max-w-[12px]" : "max-h-[24px] max-w-[24px]"}`}
        quality={100}
      />
    </SocialMediaContainer>
  );
};

export const InstagramIcon = ({ size }: { size?: string }) => {
  return (
    <SocialMediaContainer
      className={`bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] ${size === "small" && "min-h-6 min-w-6"}`}
    >
      <Image
        src="/images/logo/instagram.png"
        alt="Instagram's logo"
        width={size === "small" ? 14 : 28}
        height={size === "small" ? 14 : 28}
        className={`${size === "small" ? "max-h-[14px] max-w-[14px]" : "max-h-[28x] max-w-[28px]"}`}
        quality={100}
      />
    </SocialMediaContainer>
  );
};

export const LinkedInIcon = ({ size }: { size?: string }) => {
  return (
    <Image
      src="/images/logo/linkedin.png"
      alt="LinkedIn's logo"
      width={size === "small" ? 24 : 44}
      height={size === "small" ? 24 : 44}
      className={`rounded-md object-cover shadow-sm ${size === "small" ? "max-h-[24px] max-w-[24px]" : "max-h-[44x] max-w-[44px]"}`}
      quality={100}
    />
  );
};

export const GitHubLogoIcon = ({ size }: { size?: string }) => {
  return (
    <SocialMediaContainer
      className={`bg-slate-700 ${size === "small" && "min-h-6 min-w-6"}`}
    >
      <Image
        src="/images/logo/github.png"
        alt="GitHub's logo"
        width={size === "small" ? 14 : 28}
        height={size === "small" ? 14 : 28}
        className={`rounded-md object-cover shadow-sm ${size === "small" ? "max-h-[14px] max-w-[14px]" : "max-h-[28x] max-w-[28px]"}`}
        quality={100}
      />
    </SocialMediaContainer>
  );
};

export const YoutubeIcon = ({ size }: { size?: string }) => {
  return (
    <SocialMediaContainer
      className={`bg-[#FF0000] ${size === "small" && "min-h-6 min-w-6"} text-white`}
    >
      <svg
        width={size === "small" ? 16 : 36}
        height={size === "small" ? 16 : 36}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="40" height="40" rx="10" fill="#FFFFFFF"></rect>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M29.3766 12.5016C30.4093 12.7775 31.2225 13.5907 31.4986 14.6233L31.4985 14.6234C32 16.495 32 20.4001 32 20.4001C32 20.4001 32 24.305 31.4985 26.1768C31.2224 27.2094 30.4092 28.0225 29.3765 28.2986C27.505 28.8 19.9999 28.8 19.9999 28.8C19.9999 28.8 12.4949 28.8 10.6233 28.2986C9.59065 28.0224 8.77727 27.2094 8.50144 26.1767C8 24.3049 8 20.4 8 20.4C8 20.4 8 16.4949 8.50144 14.6233C8.77727 13.5907 9.59065 12.7775 10.6234 12.5016C12.495 12 20 12 20 12C20 12 27.5051 12 29.3766 12.5016ZM24.4429 20.6931L17.6001 24.5857V16.8L24.4429 20.6931Z"
          fill="white"
        ></path>
      </svg>
    </SocialMediaContainer>
  );
};

export const TwitchIcon = ({ size }: { size?: string }) => {
  return (
    <SocialMediaContainer
      className={`bg-[#6441a5] ${size === "small" && "min-h-6 min-w-6 text-white"}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size === "small" ? 12 : 24}
        height={size === "small" ? 12 : 24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7" />
      </svg>
    </SocialMediaContainer>
  );
};

export const TikTokIcon = ({ size }: { size?: string }) => {
  return (
    <Image
      src="/images/logo/tiktok.png"
      alt="TikTok's logo"
      width={size === "small" ? 24 : 44}
      height={size === "small" ? 24 : 44}
      className={`rounded-md object-cover shadow-sm ${size === "small" ? "max-h-[24px] max-w-[24px]" : "max-h-[44x] max-w-[44px]"}`}
      quality={100}
    />
  );
};

export const PatreonIcon = ({ size }: { size?: string }) => {
  return (
    <SocialMediaContainer
      className={`bg-white ${size === "small" && "min-h-6 min-w-6"}`}
    >
      <Image
        src="/images/logo/patreon.png"
        alt="Patreon's logo"
        width={size === "small" ? 14 : 28}
        height={size === "small" ? 14 : 28}
        className={`rounded-md object-cover shadow-sm ${size === "small" ? "max-h-[14px] max-w-[14px]" : "max-h-[28x] max-w-[28px]"}`}
        quality={100}
      />
    </SocialMediaContainer>
  );
};

export const BehanceIcon = ({ size }: { size?: string }) => {
  return (
    <svg
      width={size === "small" ? 24 : 44}
      height={size === "small" ? 24 : 44}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" rx="10" fill="#2193EE"></rect>
      <g clip-path="url(#clip0_1934_2795)">
        <path
          d="M14.9811 12C15.6726 12 16.3114 12.0527 16.8976 12.2107C17.4837 12.3161 17.9645 12.5335 18.3926 12.7969C18.8207 13.0603 19.1368 13.4357 19.3541 13.9165C19.5649 14.3973 19.6768 14.9834 19.6768 15.6223C19.6768 16.3665 19.5188 17.0053 19.1434 17.4861C18.8207 17.9668 18.2938 18.3949 17.6484 18.7111C18.5572 18.9745 19.2487 19.4553 19.6702 20.0941C20.0917 20.7329 20.3618 21.5298 20.3618 22.4387C20.3618 23.1829 20.2037 23.8217 19.9337 24.3552C19.6702 24.8886 19.2422 25.3694 18.7614 25.6855C18.2806 26.0082 17.6945 26.2717 17.0556 26.4297C16.4168 26.5878 15.778 26.6932 15.1391 26.6932L8 26.7064V12H14.9811ZM14.553 17.9668C15.1391 17.9668 15.6199 17.8088 15.9887 17.5388C16.3575 17.2687 16.5222 16.7945 16.5222 16.2084C16.5222 15.8857 16.4695 15.5696 16.3641 15.3588C16.2587 15.1481 16.1007 14.9834 15.8833 14.8254C15.6726 14.72 15.4553 14.6146 15.1918 14.5619C14.9284 14.5092 14.6584 14.5092 14.3422 14.5092H11.2534V17.9734C11.2534 17.9668 14.553 17.9668 14.553 17.9668ZM14.7111 24.2564C15.0338 24.2564 15.3499 24.2037 15.6199 24.151C15.8833 24.0983 16.1534 23.993 16.3641 23.8283C16.5749 23.6637 16.7395 23.5056 16.8976 23.2422C17.003 22.9787 17.1083 22.656 17.1083 22.2806C17.1083 21.5364 16.8976 21.003 16.4695 20.6276C16.0414 20.3048 15.4553 20.1468 14.7637 20.1468H11.2534V24.2498H14.7111V24.2564Z"
          fill="white"
        ></path>
        <path
          d="M24.9985 24.2037C25.4266 24.6318 26.0654 24.8425 26.915 24.8425C27.5012 24.8425 28.0346 24.6845 28.4627 24.4144C28.8908 24.0917 29.1542 23.7756 29.2596 23.4529H31.8676C31.4395 24.7306 30.8007 25.6394 29.9511 26.2256C29.1015 26.759 28.0873 27.0752 26.8623 27.0752C26.0127 27.0752 25.262 26.9171 24.5704 26.6471C23.8789 26.3836 23.3455 26.0082 22.8647 25.4748C22.3839 24.994 22.0151 24.4079 21.7978 23.7163C21.5343 23.0248 21.4224 22.2806 21.4224 21.4244C21.4224 20.6275 21.5277 19.8767 21.7978 19.1852C22.0678 18.4937 22.4366 17.9076 22.9174 17.3741C23.3981 16.8933 23.9843 16.4652 24.6231 16.2018C25.3146 15.9384 26.0062 15.7737 26.8623 15.7737C27.7712 15.7737 28.5681 15.9318 29.2596 16.3072C29.9511 16.6826 30.4846 17.1041 30.9127 17.7429C31.3408 18.3291 31.6569 19.0206 31.8742 19.7648C31.9796 20.509 32.0323 21.2598 31.9796 22.1094H24.2543C24.2543 22.9787 24.5704 23.7756 24.9985 24.2037ZM28.3573 18.6057C27.9819 18.2303 27.3958 18.0195 26.7043 18.0195C26.2235 18.0195 25.8547 18.1249 25.532 18.283C25.2093 18.441 24.9985 18.6584 24.7878 18.8691C24.577 19.0799 24.4651 19.3499 24.4124 19.6133C24.3597 19.8767 24.307 20.0941 24.307 20.3048H29.1015C28.9962 19.5145 28.7261 18.9811 28.3573 18.6057ZM23.6682 13.0142H29.635V14.45H23.6682V13.0142Z"
          fill="white"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_1934_2795">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(8 8)"
          ></rect>
        </clipPath>
      </defs>
    </svg>
  );
};

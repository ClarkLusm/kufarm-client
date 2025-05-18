import {
  Footer,
  FooterCopyright,
  FooterDivider,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";
import Link from "next/link";

import TeleIcon from "@/icons/telegram.svg";
import PancakeIcon from "@/icons/pancake.svg";

const FooterBase = () => {
  return (
    <Footer className="rounded-none">
      <div className="container max-w-[1100px] mx-auto">
        <div className="grid w-full items-center justify-between sm:flex sm:justify-between md:flex md:grid-cols-1 px-4 pt-4">
            <div className="mb-4">
              <Link href="/" className="flex items-center">
                <img
                  src="/images/logo.jpg"
                  className="mr-3 h-6 sm:h-9 sm:block rounded-[50%]"
                  alt="Miner86 Logo"
                />
                <span className="dark:text-white font-bold">Miner86</span>
              </Link>
            </div>
          <div className="grid grid-cols-3 gap-8 sm:mt-4 sm:gap-6">
            <div>
              <FooterTitle title="about" />
              <FooterLinkGroup col>
                <FooterLink href="#">Flowbite</FooterLink>
                <FooterLink href="#">Tailwind CSS</FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Join us" />
              <FooterLinkGroup col>
                <FooterLink
                  target="_blank"
                  href="https://t.me/minercakesupport"
                >
                  <span className="flex items-center">
                    <TeleIcon width={18} height={18} className="mr-1" />{" "}
                    <span>Support</span>
                  </span>
                </FooterLink>
                <FooterLink target="_blank" href="https://coinmarketcap.com/vi/currencies/pancakeswap">
                  <span className="flex items-center">
                    <PancakeIcon width={18} height={18} className="mr-1" />{" "}
                    <span>Coinmarketcap</span>
                  </span>
                </FooterLink>
              </FooterLinkGroup>
            </div>
            <div className="hidden sm:block">
              <FooterTitle title="Legal" />
              <FooterLinkGroup col>
                <FooterLink href="#">Privacy Policy</FooterLink>
                <FooterLink href="#">Terms &amp; Conditions</FooterLink>
              </FooterLinkGroup>
            </div>
          </div>
        </div>
        <FooterDivider className="my-2 lg:mb-2" />
        <div className="w-full sm:flex sm:items-center sm:justify-between p-4">
          <FooterCopyright href="#" by="miner86.com" year={2024} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <FooterIcon href="#" icon={BsFacebook} />
            <FooterIcon href="#" icon={BsInstagram} />
            <FooterIcon href="#" icon={BsTwitter} />
            <FooterIcon href="#" icon={BsGithub} />
            <FooterIcon href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterBase;

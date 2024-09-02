import {
  Footer,
  FooterBrand,
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

const FooterBase = () => {
  return (
    <Footer className="rounded-none">
      <div className="container max-w-[1100px] mx-auto">
        <div className="grid w-full items-center justify-between sm:flex sm:justify-between md:flex md:grid-cols-1 px-4 pt-4">
          <div>
            <FooterBrand
              href="https://flowbite.com"
              src="https://flowbite.com/docs/images/logo.svg"
              alt="Bitcoino2fi Logo"
              name="Bitcoino2fi"
            />
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
                <FooterLink target="_blank" href="https://t.me/bitcoino2support">Support</FooterLink>
                <FooterLink target="_blank" href="https://t.me/MiningBITCOINo2">Guide</FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Legal" />
              <FooterLinkGroup col>
                <FooterLink href="#">Privacy Policy</FooterLink>
                <FooterLink href="https://kufarm.io/conditions">
                  Terms &amp; Conditions
                </FooterLink>
              </FooterLinkGroup>
            </div>
          </div>
        </div>
        <FooterDivider />
        <div className="w-full sm:flex sm:items-center sm:justify-between p-4">
          <FooterCopyright href="#" by="Bitcoino2fi" year={2024} />
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

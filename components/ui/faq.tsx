import axios from "axios";
import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
} from "flowbite-react";

const FAQ = ({ setting }: any) => {
  return (
    <div className="my-5">
      <div className="my-5 w-full text-center">
        <span className="text-3xl font-semibold dark:text-white">FAQ</span>
      </div>
      <Accordion collapseAll className="mx-7">
        <AccordionPanel>
          <AccordionTitle className="text-xl">How does it work?</AccordionTitle>
          <AccordionContent>
            <p className="mb-2 font-semibold text-gray-500 dark:text-gray-400">
              It is very simple! You buy a miner and receive a daily profit from
              the miner during the term of the contract with the possibility of
              withdrawing funds at any time .While mining is being carried out,
              you can go about your business and visit the website only in order
              to withdraw your profits
            </p>
          </AccordionContent>
        </AccordionPanel>
        <AccordionPanel>
          <AccordionTitle className="text-xl">
            What is the service fee?
          </AccordionTitle>
          <AccordionContent>
            <p className="mb-2 font-semibold text-gray-500 dark:text-gray-400">
              Our service has a fee of {setting?.withdrawFeePercent}%.
            </p>
          </AccordionContent>
        </AccordionPanel>
        <AccordionPanel>
          <AccordionTitle className="text-xl">
            When can I withdraw funds from my account?
          </AccordionTitle>
          <AccordionContent>
            <p className="mb-2 font-semibold text-gray-500 dark:text-gray-400">
              You can withdraw funds immediately upon reaching the minimum
              withdrawal amount. The minimum withdrawal amount is{" "}
              {setting?.withdrawMin ?? 100} BTCO2.
            </p>
          </AccordionContent>
        </AccordionPanel>
        <AccordionPanel>
          <AccordionTitle className="text-xl">
            Can I buy several different miners?
          </AccordionTitle>
          <AccordionContent>
            <p className="mb-2 font-semibold text-gray-500 dark:text-gray-400">
              Yes! You can buy an unlimited number of different miners at your
              discretion and receive a combined income from them.
            </p>
          </AccordionContent>
        </AccordionPanel>
        <AccordionPanel>
          <AccordionTitle className="text-xl">
            What payment methods do you accept and what coins can be mined?
          </AccordionTitle>
          <AccordionContent>
            <p className="mb-2 font-semibold text-gray-500 dark:text-gray-400">
              At the moment we accept payments in BTC, ETH, LTC, BNB, BCH, DASH,
              ETC, XRP, TRX, USDT TRC20, ZCASH.
            </p>
          </AccordionContent>
        </AccordionPanel>
        <AccordionPanel>
          <AccordionTitle className="text-xl">
            Do you have an affiliate program and how does it work?
          </AccordionTitle>
          <AccordionContent>
            <p className="mb-2 font-semibold text-gray-500 dark:text-gray-400">
              You can earn extra money by referring your friends or family.
              anyone is welcome. You can even promote our company and earn extra
              without having to make any investment. when a user registers using
              your referral link and rents a miner. (10%f1) - (5%f2) - (3%f4-f5) - (2%f5-f10) - (1%f11-f15) of the rental price is
              sent as a reward to your BITCOINo2 account with the condition that 1f1 enjoy 1f - 10f1 enjoy 15f. You can find a referral
              link in your personal account on the referral page.
            </p>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </div>
  );
};

export default FAQ;

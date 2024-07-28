import { Button, Navbar, NavbarLink } from 'flowbite-react';

export default function About() {
  const members = [
    {
      id: 'Company Founder, CEO',
      position: 'Company Founder, CEO',
      image: 'https://kufarm.io/static/kufarm/about1.jfif',
      info_1:
        'Paul Wade is an entrepreneur and the founder of the cryptomining company, Kufarm. He is an experienced leader and innovator in the technology industry.',
      info_2:
        'Paul was born in San Francisco, California and attended Stanford University, where he received his degree in Computer Science. After graduating, he worked as a software engineer at several large companies, including Apple and Microsoft.',
      info_3:
        'Paul is a highly respected leader in the technology industry and is a frequent speaker at industry events.',
    },
    {
      id: 'Lead Developer',
      position: 'Lead Developer',
      image: 'https://kufarm.io/static/kufarm/about2.jfif',
      info_1:
        'Arthur Sanders is the Lead Developer at our company. He has over 10 years of experience in software development and is an expert in developing web applications and databases. He has a passion for coding and loves to solve complex problems.',
      info_2:
        'Arthur has a degree in Computer Science from the University of California, Berkeley and has worked in the software development industry since he graduated. He is an experienced programmer in multiple languages and has a strong understanding of software architecture.',
      info_3: '',
    },
    {
      id: 'Technical Support',
      position: 'Technical Support',
      image: 'https://kufarm.io/static/kufarm/about3.jfif',
      info_1:
        'John Anderson is the Technical Support at our company. He has been in the industry for over ten years, providing technical support to customers. He has a vast amount of experience in the field, and is highly knowledgeable in all aspects of technical support.',
      info_2:
        'John also has a great ability to explain complex technical concepts in an easy-to-understand way, making him an invaluable asset to the company. He is always willing to go the extra mile to ensure that customers are satisfied with their technical support experience.',
      info_3: '',
    },
  ];

  return (
    <div className="container m-auto py-24">
      <div className="m-12">
        <div className="text-center text-6xl font-bold">About Us</div>
        <div className="my-7 text-2xl font-semibold">
          KUFARM MINING COMPANY THAT PROVIDES RENTAL OF ASIC MINERS BY MEANS OF
          CLOUD MINING
        </div>
        <div className="my-3 text-xl font-semibold text-gray-500">
          This is a bitcoin mining company using a mining pool from Kucoin, as
          well as which provides cloud mining services for cryptocurrency ASIC
          and GPU miners that will take care of repetitive and tedious processes
          for you, giving you more time to focus on growing your income and
          creating your mining portfolio. Regardless of whether you are a
          beginner in crypto mining or an experienced expert, our mining and
          machine management platform combines a seamless and accessible
          cryptocurrency mining strategy around the world.
        </div>
        <div className="my-3 text-xl font-semibold text-gray-500">
          Kufarm offers bitcoin mining contracts from data centers in Asian
          countries. Kufarm uses technologies from leading companies and
          manufacturers in the industry. You get maximum performance at low
          cost.
        </div>
      </div>
      <div className="my-10 flex rounded-3xl bg-cyan-200 p-12">
        <div className="w-3/5">
          <div className="text-4xl font-bold">More Info</div>
          <div className="my-5 text-lg font-bold text-gray-400">
            Cloud mining is the easiest and most effective way to make money
            from cryptocurrency mining without buying and maintaining your
            equipment. It is realized through the lease of the companys
            equipment facilities. Such companies are called cloud mining
            providers.
          </div>
          <div className="my-5 text-lg font-bold text-gray-400">
            One of the main advantages of this investment type is the ability to
            start mining with literally two clicks. You just need to select a
            contract and buy it. So get stable passive income without
            unnecessary risk and difficulties of independent mining!
          </div>
          <Navbar className="list-none bg-transparent">
            <NavbarLink href="/auth/login">
              <Button className="w-48" color="blue" pill>
                LOG IN
              </Button>
            </NavbarLink>
          </Navbar>
        </div>
        <div className="w-2/5">
          <img
            className="float-end"
            src="https://kufarm.io/static/kufarm/info-block2.png"
            alt=""
          />
        </div>
      </div>
      <div className="m-12 flex list-none">
        <div className="w-3/5">
          <div className="text-5xl font-bold">Our documents</div>
          <div className="my-5 text-lg font-semibold text-gray-500">
            The company has all the necessary documents and licenses to provide
            services in the financial sector and successfully passes regular
            quality checks and official inspections of the services provided.
          </div>
          <Navbar>
            <NavbarLink href="https://find-and-update.company-information.service.gov.uk/company/14307013">
              <Button
                color="gray"
                className="flex items-center rounded-2xl border px-7 py-1"
              >
                <img src="https://kufarm.io/static/kufarm/c-logo.png" alt="" />
                <div className="ml-2">
                  <span className="text-xs">Co.Number</span>
                  <div className="text-lg">14307013</div>
                </div>
              </Button>
            </NavbarLink>
          </Navbar>
        </div>
        <Navbar className="ml-28 w-96 rounded-xl border">
          <NavbarLink href="https://kufarm.io/static/kufarm/sert.jpg">
            <img src="https://kufarm.io/static/kufarm/sert.jpg" />
          </NavbarLink>
        </Navbar>
      </div>
      <div>
        <div className="py-10 text-center text-5xl font-bold">
          Our working Team
        </div>
        <div className="flex">
          {members.map((m) => (
            <div className="list-none px-5 " key={m.id}>
              <div className="py-5 text-center text-xl font-bold text-gray-500">
                Company Founder, CEO
              </div>
              <div className="flex w-full justify-center">
                <img
                  className="size-96 rounded-xl border"
                  src={m.image}
                  alt=""
                />
              </div>
              <div className="my-3 px-5 text-lg font-semibold text-gray-500">
                {m.info_1}
              </div>
              <div className="my-3 px-5 text-lg font-semibold text-gray-500">
                {m.info_2}
              </div>
              <div className="my-3 px-5 text-lg font-semibold text-gray-500">
                {m.info_3}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <hr className="mt-5" />
        <div className="my-8 flex list-none justify-between">
          <div className="flex items-center">
            <div className="rounded-xl bg-emerald-700 p-2">
              <img src="https://kufarm.io/static/kufarm/email.svg" alt="" />
            </div>
            <Navbar>
              <NavbarLink
                href="mailto:support@ku.farm"
                className="text-xl font-semibold"
              >
                support@kufarm.cloud
              </NavbarLink>
            </Navbar>
          </div>
          <div className="flex items-center">
            <div className="mr-4 text-xl font-semibold">
              Middlesbrough, England, TS5 4DX
            </div>
            <div className="rounded-xl bg-emerald-700 p-2">
              <img src="https://kufarm.io/static/kufarm/location.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
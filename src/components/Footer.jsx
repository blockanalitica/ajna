import Image from "next/image";
import Link from "next/link";

const Footer = () => (
  <footer className="bg-black text-white">
    <div className="mx-auto w-full max-w-screen-xl px-4 py-10 lg:py-20">
      <div className="md:flex md:justify-between">
        {/* <div className="mb-6 md:mb-0">
          <Link
            href="https://www.blockanalitica.com"
            target="_blank"
            className="flex items-center"
          >
            <Image
              alt="Block Analitica"
              src="/assets/images/Logos/BlockAnalitica-Logo-white.svg"
              width={150}
              height={50}
            />
          </Link>
        </div> */}
        {/* <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-4">
            <div>
              <h2 className="mb-6 text-sm font-semibold font-syncopate text-ajna-lavender uppercase ">HOME</h2>
              <ul className="text-rubik  font-medium">
                  <li className="mb-4">
                      <a href="https://flowbite.com/" className="hover:underline">Pools</a>
                  </li>
                  <li className="mb-4">
                      <a href="https://tailwindcss.com/" className="hover:underline">Grants</a>
                  </li>
                  <li className="mb-4">
                      <a href="https://tailwindcss.com/" className="hover:underline">Docs</a>
                  </li>
                  <li className="mb-4">
                      <a href="https://tailwindcss.com/" className="hover:underline">FAQ</a>
                  </li>
              </ul>
            </div>
            <div>
                <h2 className="mb-6 text-sm font-semibold font-syncopate text-ajna-lavender uppercase ">ABOUT</h2>
                <ul className="text-rubik font-medium">
                    <li className="mb-4">
                        <a href="https://flowbite.com/" className="hover:underline">Ajna Labs</a>
                    </li>
                    <li className="mb-4">
                        <a href="https://tailwindcss.com/" className="hover:underline">Team</a>
                    </li>
                    <li className="mb-4">
                        <a href="https://tailwindcss.com/" className="hover:underline">Whitepaper</a>
                    </li>
                    <li className="mb-4">
                        <a href="https://tailwindcss.com/" className="hover:underline">Brand</a>
                    </li>
                </ul>
            </div>
            <div>
                <h2 className="mb-6 text-sm font-semibold font-syncopate text-ajna-lavender uppercase ">RESOURCES</h2>
                <ul className="text-rubik  font-medium">
                    <li className="mb-4">
                        <a href="https://github.com/themesberg/flowbite" className="hover:underline ">Newsletter</a>
                    </li>
                    <li className="mb-4">
                        <a href="https://discord.gg/4eeurUVvTy" className="hover:underline">Terms</a>
                    </li>
                    <li className="mb-4">
                        <a href="https://discord.gg/4eeurUVvTy" className="hover:underline">Privacy</a>
                    </li>
                </ul>
            </div>
            <div>
                <h2 className="mb-6 text-sm font-semibold font-syncopate text-ajna-lavender uppercase ">CONTACT</h2>
                <ul className="text-rubik  font-medium">
                    <li className=" text-rubik mb-4">
                        <a href="#" className="hover:underline">Contact</a>
                    </li>
                    <li className="mb-4">
                        <a href="#" className="hover:underline">Follow + DM</a>
                    </li>
                    <li className="mb-4">
                        <a href="#" className="hover:underline">Discord</a>
                    </li>
                </ul>
            </div>
          </div> */}
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center text-sm text-gray-13 sm:text-center space-x-2">
            <Link
              href="https://www.blockanalitica.com"
              target="_blank"
              className="flex items-center"
            >
              <Image
                alt="Block Analitica"
                src="/assets/images/logos/BlockAnalitica-Logo-white.svg"
                width={150}
                height={50}
              />
            </Link>
            <span>|</span>
            <span>© 2023. All rights reserved.</span>
            <span>|</span>
            <span>Made with love by</span>
            <span className="text-white">BA Labs LLC</span>
          </div>
        </div>
        <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
          <a href="#" className=" p-2 bg-gray-21 rounded-full hover:bg-gray-18">
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
            <span className="sr-only">Twitter page</span>
          </a>
          <a href="#" className=" p-2 bg-gray-21 rounded-full hover:bg-gray-18">
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            <span className="sr-only">GitHub account</span>
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

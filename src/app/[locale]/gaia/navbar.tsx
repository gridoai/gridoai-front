import { Navbar } from "@/app/Navbar";
import Container from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { getScopedI18n } from "@/locales/server";
import Link from "next/link";
export const GaiaNavbar = async () => {
  const t = await getScopedI18n(`landingPage`);
  const menuItems = [
    {
      title: `Blog`,
      path: `https://blog.gridoai.com`,
    },
    {
      title: t(`contactUs`),
      path: `https://wa.me/5585999065040`,
    },
  ];

  return (
    <nav className="flex flex-row justify-between items-center my-5">
      <div className="flex w-full lg:w-auto items-center justify-between">
        <a href="/" className="text-lg font-bold text-black">
          {t(`navTitle`)}
        </a>
        {/* <div className="block lg:hidden">
              <MenuIcon className="w-4 h-4 text-gray-800" />
            </div> */}
      </div>
      <div className="hidden w-full lg:w-auto mt-2 lg:flex lg:mt-0">
        <ul className="flex flex-col lg:flex-row lg:gap-3">
          {menuItems.map((item, index) => (
            <>
              {/* {item.children && (
                    <Dropdown
                      title={item.title}
                      children={item.children}
                      lastItem={index === menuitems.length - 1}
                    />
                  )} */}

              <li>
                <a
                  href={item.path}
                  className="flex lg:px-3 py-2 items-center text-gray-600 hover:text-gray-900"
                >
                  <span> {item.title}</span>
                </a>
              </li>
            </>
          ))}
        </ul>
        <div className="lg:hidden flex items-center mt-3 gap-4"></div>
      </div>

      <div>
        <div className="flex items-center gap-4">
          <Button className="bg-slate-900" href="#">
            <span className="text-nowrap font-medium whitespace-nowrap">
              {t(`chatNow`)}
            </span>
          </Button>
          {/* <Link href="#" size="md">
              Sign up
            </Link> */}
        </div>
      </div>
    </nav>
  );
};

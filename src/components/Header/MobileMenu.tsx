import { FC } from "react";
import { Disclosure } from "@headlessui/react";
import { classNames, navigation } from "@/components/Header/Header";

const MobileMenu: FC = () => {
  return (
    <Disclosure.Panel className="sm:hidden">
      <div className="space-y-1 px-2 pt-2 pb-3">
        {navigation.map((item) => (
          <Disclosure.Button
            key={item.name}
            as="a"
            href={item.href}
            className={classNames(
              item.current
                ? "bg-zinc-100"
                : "text-zinc-200 hover:bg-zinc-200 hover:text-black",
              "block px-3 py-2 rounded-md text-base font-medium"
            )}
            aria-current={item.current ? "page" : undefined}
          >
            {item.name}
          </Disclosure.Button>
        ))}
      </div>
    </Disclosure.Panel>
  );
};

export default MobileMenu;

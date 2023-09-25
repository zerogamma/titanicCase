'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { navItems } from '@/app/shared/routes';

export default function NavBar() {
  const pathname = usePathname() || '/';

  const [hoveredPath, setHoveredPath] = useState(pathname);

  useEffect(() => {
    setHoveredPath(pathname);
  }, [pathname]);

  return (
    <div className="navBar">
      <div>
        <nav className="flex flex-col gap-2 relative justify-start w-[5rem] z-[100]  rounded-lg">
          {navItems.map((item) => {
            const isActive = item.path === pathname;
            return (
              <Link
                key={item.path}
                className={`px-4 py-2 rounded-md text-center text-sm lg:text-base relative no-underline duration-300 ease-in ${
                  isActive ? 'text-zinc-100' : 'text-zinc-100'
                }`}
                data-active={isActive}
                href={{ pathname: item.path }}
                onMouseOver={() => setHoveredPath(item.path)}
                onMouseLeave={() => setHoveredPath(pathname)}
              >
                <span>{item.name}</span>
                {item.path === hoveredPath && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-full bg-zinc-400 rounded-md -z-10"
                    layoutId="navbar"
                    aria-hidden="true"
                    style={{
                      width: '100%',
                    }}
                    transition={{
                      type: 'spring',
                      bounce: 0.25,
                      stiffness: 130,
                      damping: 9,
                      duration: 0.3,
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

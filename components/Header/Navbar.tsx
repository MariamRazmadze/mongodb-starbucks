"use client";

import { useState } from "react";
import {
  Nav,
  NavbarContainer,
  NavbarLeft,
  NavbarRight,
  NavListItem,
} from "@/styles/StyledNav";
import { LightButton, DarkButton } from "../UI/Button";
import { ModalContent } from "./ModalContent";
import Link from "next/link";
import { NavbarBrand } from "./NavbarBrand";
import { NavLinks } from "./NavLinks";
import { ModalButton } from "./ModalButton";
import { NavbarModal } from "./NavbarModal";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const session = useSession();

  const toggleMenu = () => {
    setIsOpen((is) => !is);
  };

  return (
    <>
      <Nav>
        <NavbarContainer>
          <NavbarBrand />
          <NavbarLeft>
            <NavLinks />
          </NavbarLeft>

          <NavbarRight>
            <NavListItem>
              <Link href="/store-locator">
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  width="20"
                  focusable="false"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                >
                  <path d="M12,11.475 C10.5214286,11.475 9.32142857,10.299 9.32142857,8.85 C9.32142857,7.401 10.5214286,6.225 12,6.225 C13.4785714,6.225 14.6785714,7.401 14.6785714,8.85 C14.6785714,10.299 13.4785714,11.475 12,11.475 M12,1.5 C7.85357143,1.5 4.5,4.7865 4.5,8.85 C4.5,14.3625 12,22.5 12,22.5 C12,22.5 19.5,14.3625 19.5,8.85 C19.5,4.7865 16.1464286,1.5 12,1.5"></path>
                </svg>

                <span>Find a store</span>
              </Link>
            </NavListItem>

            <>
              <>
                {session.data ? (
                  <NavListItem>
                    <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
                  </NavListItem>
                ) : (
                  <>
                    <NavListItem>
                      <Link href="/api/auth/signin?callbackUrl=/">
                        <LightButton>Login</LightButton>
                      </Link>
                    </NavListItem>
                    <NavListItem>
                      <Link href="/register">
                        <DarkButton>Join Now </DarkButton>
                      </Link>
                    </NavListItem>
                  </>
                )}
              </>
            </>
          </NavbarRight>
          <ModalButton onClick={toggleMenu} $isOpen={isOpen} />
        </NavbarContainer>

        {isOpen && (
          <NavbarModal isOpen={isOpen} onRequestClose={toggleMenu}>
            <ModalContent isOpen={isOpen} toggleMenu={toggleMenu} />
          </NavbarModal>
        )}
      </Nav>
    </>
  );
}

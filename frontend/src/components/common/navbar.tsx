import { NavLink } from "react-router";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "@/store/slices/user-slice";
import type { IUserProfile } from "@/lib/types/user";
import { UserButton } from "../shared/user-btn";

interface NavbarProps {
  userProfile: IUserProfile | undefined;
}

export const Navbar = ({ userProfile }: NavbarProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log({ userProfile });
    dispatch(setUser(userProfile));
    return () => {};
  }, [userProfile]);

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="bg-primary text-white py-2 px-5 md:px-20 flex items-center justify-between sticky top-0 z-10">
        <NavLink to={"/"} className={`text-2xl font-bold `}>
          HRMS
        </NavLink>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 max-md:hidden"></div>
          <UserButton />
        </div>
      </nav>
    </>
  );
};

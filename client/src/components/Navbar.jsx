import { useAuthStore } from "../store/useAuthStore.js";
import { Link } from "react-router-dom";
import {  User, LogOut, Sun , Moon} from "lucide-react";
import { useThemeStore } from "../store/useThemeStore.js";

export default function Navbar() {
  const { logout, authUser } = useAuthStore();
  const { theme, setTheme } = useThemeStore();
  return (
    <header className="bg-base-100/80 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg ">
      <div className="container mx-auto px-4 h-16 ">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9  rounded-lg bg-primary/10 flex items-center justify-center">
                <img src="/logo.svg" className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Conversa</h1>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            {authUser && (
              <>
                <Link
                  to={"/profile"}
                  className={`btn btn-sm gap-2 transition-colors`}
                >
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>
                <button className={`flex gap-2 items-center`} onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
            {theme === "dark" ? (
              <button
                className={`flex gap-2 items-center`}
                onClick={() => setTheme("light")}
              >
                <Sun className="size-5" />
              </button>
            ) : (
              <button
                className={`flex gap-2 items-center`}
                onClick={() => setTheme("dark")}
              >
                < Moon className="size-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
  const username = "Snehasish";
  const email = "snehasish@example.com";

  const handleLogout = () => {
    console.log("Logged out");
  };

  return (
    <nav className="w-full flex justify-center bg-black border-b border-gray-700 shadow-sm py-3">
      <div className="w-full max-w-3xl px-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">TaskFlow</h1>

        <DropdownMenu className="bg-gray-600">
          <DropdownMenuTrigger className="flex items-center gap-3 focus:outline-none">
            <Avatar className="h-9 w-9">
              <AvatarImage src="" />
              <AvatarFallback className="bg-blue-700 text-white">
                {username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="hidden sm:flex flex-col items-start">
              <span className="text-sm font-medium text-yellow-500">
                {username}
              </span>
              <span className="text-xs text-white-500">{email}</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel className="font-medium text-black">
              {username}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-600 hover:bg-red-50"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}

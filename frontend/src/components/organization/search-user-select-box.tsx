import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { useSearchUserMutation } from "@/api/mutations/user";
import type { IUserProfile } from "@/lib/types/user";
import { CustomLoader } from "../common/custol-loader";
import { CustomEmpty } from "../shared/custom-empty";
import { ScrollArea } from "../ui/scroll-area";
import { NavLink } from "react-router";
import { Skeleton } from "../ui/skeleton";

export const SearchUserSelectBox = () => {
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [users, setUsers] = useState<IUserProfile[]>([]);
  const { mutateAsync: searchUser } = useSearchUserMutation();

  useEffect(() => {
    if (!searchText) {
      setUsers([]);
      return;
    }
    setIsSearching(true);
    const debounceTimer = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchText]);

  const handleSearch = async () => {
    const data = await searchUser(searchText);
    setIsSearching(false);
    setUsers(data);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">Find User</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <Input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search users"
        />
        {isSearching &&
          [1, 2, 3, 4].map((ele) => (
            <Skeleton key={ele} className="h-14 w-full mb-0.5" />
          ))}

        {!searchText && users.length == 0 && (
          <CustomEmpty
            title="No Users"
            description={`Start typing in search box for getting users`}
          />
        )}

        {searchText && !isSearching && users.length == 0 && (
          <CustomEmpty
            title="No Users"
            description={`No users found for query: ${searchText} by name or email`}
          />
        )}

        {!isSearching && users.length > 0 && (
          <ScrollArea className="w-full pr-1">
            <div className="flex flex-col gap-0.5 mt-2 max-h-[50vh]!">
              {users.map((user) => (
                <Button
                  key={user.userId}
                  variant={"ghost"}
                  className="items-start justify-start flex-col h-max text-sm gap-0.5 pl-1.5"
                  asChild
                  onClick={() => setOpen(false)}
                >
                  <NavLink to={`/organization-chart/${user.userId}`}>
                    <div className="text-muted-foreground">
                      Name:{" "}
                      <span className="text-foreground font-medium">
                        {user.name}
                      </span>
                    </div>
                    <div className="text-muted-foreground">
                      Email:{" "}
                      <span className="text-foreground font-medium">
                        {user.email}
                      </span>
                    </div>
                  </NavLink>
                </Button>
              ))}
            </div>
          </ScrollArea>
        )}
      </PopoverContent>
    </Popover>
  );
};

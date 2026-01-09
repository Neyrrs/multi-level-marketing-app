import React from "react";
import { Input } from "../ui/input";
import { SearchIcon } from "lucide-react";

type Props = {
    value: string;
    onSearchChange: (value: string) => void;
};

const SearchInput: React.FC<Props> = ({value, onSearchChange}) => {

    return (
        <div className="relative">
            <SearchIcon className="absolute top-1/2 -translate-y-1/2 size-4 left-3 text-primary"/>
            <Input
                placeholder="Cari..."
                className="pl-8"
                value={value}
                onChange={(e) => onSearchChange(e.target.value)}
            />
        </div>
    );
};

export default SearchInput;

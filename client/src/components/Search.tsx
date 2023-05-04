import { BiSearchAlt2 } from "react-icons/bi";

interface SearchProps {
  search: string;
  setSearch: (e: any) => void;
}

const Search = ({ search, setSearch }: SearchProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="flex justify-between items-center bg-soft_dark rounded-sm p-2 mb-2">
      <BiSearchAlt2 className="text-white" />
      <input
        type="text"
        placeholder="Search for a chat"
        className="w-full ml-6 outline-none text-white  bg-soft_dark"
        onChange={handleChange}
        value={search}
      />
    </div>
  );
};
export default Search;

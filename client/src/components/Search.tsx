import { BiSearchAlt2 } from "react-icons/bi";
import { useSelector } from "react-redux";
import { selectTheme } from "../redux/slices/theme.slice";

interface SearchProps {
  search: string;
  setSearch: (e: any) => void;
}

const Search = ({ search, setSearch }: SearchProps) => {
  const { headingColor, textColor } = useSelector(selectTheme);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div
      className={`flex mx-4 justify-between items-center ${headingColor} rounded-sm p-2 mb-2 rounded-xl`}
    >
      <BiSearchAlt2 className={`${textColor}`} />
      <input
        type="text"
        placeholder="Search for a chat"
        className={`w-full ml-6 outline-none ${textColor}  ${headingColor}`}
        onChange={handleChange}
        value={search}
      />
    </div>
  );
};
export default Search;

import { createContext, useContext, useEffect, useState } from "react";
import { client } from "../client";
import { feedQuery, searchQuery } from "../Utils/data";
import { toast } from "react-toastify";

const SearchContext = createContext();

export const SearchContextProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [pins, setPins] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (search) {
      setLoading(true);
      const query = searchQuery(search.toLowerCase());
      client
        .fetch(query)
        .then((data) => {
          setLoading(false);
          setPins(data);
        })
        .catch((err) => {
          toast.error("Something went wrong, Try again");
        });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [search]);

  return (
    <SearchContext.Provider
      value={{ search, setSearch, pins, setPins, loading, setLoading }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => useContext(SearchContext);

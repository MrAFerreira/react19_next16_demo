import Form from "next/form";
import SearchFormReset from "./SearchFormReset";
import { Search } from "lucide-react";
export default function SearchForm({ query }: { query?: string }) {
  return (
    <Form
      action="/posts"
      scroll={false}
      className="search-form"
    >
      <div className="join">
        <input
          name="query"
          defaultValue={query}
          className="input input-bordered join-item w-full sm:w-64"
          placeholder="Search posts..."
        />
        <button type="submit" className="btn btn-primary join-item">
          <Search className="w-5 h-5" />
        </button>
        {query && <SearchFormReset />}
      </div>
    </Form>
  );
}

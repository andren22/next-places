import { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Props {
  children?: ReactNode;
}

export default function Layout({ children }: Props) {
  const router = useRouter();
  const [input, setInput] = useState("");

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary bg-primary m-0 p-0"
        style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
      >
        <div className="container-fluid bg-primary m-0 p-2">
          <a className="navbar-brand text-white ms-3" href="/">
            NextPlaces
          </a>
          <form className="d-flex w-auto" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search city or profession"
              aria-label="Search"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Link
              href={{
                pathname: "/search",
                query: { query: input },
              }}
            >
              <button
                className="btn btn-light text-black"
                type="submit"
                onClick={() => router.push(`/search?query=${input}`)}
              >
                Search
              </button>
            </Link>
          </form>
        </div>
      </nav>
      <main className="p-3">{children}</main>
    </>
  );
}

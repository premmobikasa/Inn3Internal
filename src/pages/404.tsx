import Link from "next/link";
const Custom404 = () => {
  return (
    <>
      <div className="pagenot-found-wrapper h-96 flex items-center justify-center">
        <div className="pagenot-found-content-wrap w-96 mx-auto text-center">
          <h1 className="text-base font-semibold">404 - Page Not Found </h1>
          <Link
            href={"/"}
            title="back to home page"
            className="text-base px-4 py-3 hover:opacity-80 hover:transition-all 
            transition-all  rounded-md mx-auto bg-blue-600 text-white block mt-4 w-max"
            aria-label="home page"
          >
            {" "}
            Home page
          </Link>
        </div>
      </div>
    </>
  );
};
export default Custom404;

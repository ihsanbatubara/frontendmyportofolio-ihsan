import Pagination from "../../../components/Pagination";

const DataTable = ({
  pageTitle,
  dataListName,
  searchKeywordOnSubmitHandler,
  searchInputPlaceHolder,
  searchKeywordOnChangeHandler,
  searchKeyword,
  tableHeaderTitleList,
  isLoading,
  isFetching,
  data,
  children,
  setCurrentPage,
  currentPage,
  headers,
  actionButton,
}) => {
  return (
    <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full md:w-auto">
          <div>
            <h1 className="text-4xl font-black text-black uppercase tracking-tight mb-2">
              {pageTitle}
            </h1>
            <p className="text-gray-500 font-bold text-sm uppercase tracking-widest">
              {dataListName} Management
            </p>
          </div>
          {actionButton && (
            <div className="mt-4 md:mt-0">
              {actionButton}
            </div>
          )}
        </div>

        <div className="w-full md:w-auto">
          <form
            onSubmit={searchKeywordOnSubmitHandler}
            className="flex gap-3"
          >
            <div className="relative flex-1 md:w-64">
              <input
                type="text"
                className="w-full bg-white border-2 border-black px-4 py-3 rounded-xl font-bold text-black placeholder-gray-400 focus:outline-none focus:shadow-[4px_4px_0px_#000] transition-all"
                placeholder={searchInputPlaceHolder}
                onChange={searchKeywordOnChangeHandler}
                value={searchKeyword}
              />
            </div>
            <button
              className="bg-black text-white px-6 py-3 rounded-xl font-black uppercase text-sm border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.3)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              type="submit"
            >
              Filter
            </button>
          </form>
        </div>

      <div className="bg-white border-4 border-black rounded-3xl overflow-hidden shadow-[12px_12px_0px_rgba(0,0,0,0.1)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black text-white">
                {tableHeaderTitleList.map((title, index) => (
                  <th
                    key={index}
                    className="px-6 py-5 text-xs font-black uppercase tracking-widest border-r border-white/20 last:border-0"
                  >
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-black/5">
              {isLoading || isFetching ? (
                <tr>
                  <td colSpan={tableHeaderTitleList.length} className="text-center py-20">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                      <span className="font-black uppercase text-xs tracking-widest">Loading Data...</span>
                    </div>
                  </td>
                </tr>
              ) : data?.length === 0 ? (
                <tr>
                  <td colSpan={tableHeaderTitleList.length} className="text-center py-20">
                    <span className="font-black uppercase text-xs tracking-widest text-gray-400">No records found</span>
                  </td>
                </tr>
              ) : (
                children
              )}
            </tbody>
          </table>
        </div>
        
        {!isLoading && headers?.["x-totalpagecount"] && (
          <div className="p-6 border-t-2 border-black bg-gray-50">
            <Pagination
              onPageChange={(page) => setCurrentPage(page)}
              currentPage={currentPage}
              totalPageCount={JSON.parse(headers?.["x-totalpagecount"])}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTable;

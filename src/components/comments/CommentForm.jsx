import React, { useState } from "react";

const CommentForm = ({
  btnLabel,
  formSubmitHanlder,
  formCancelHandler = null,
  initialText = "",
  loading = false,
}) => {
  const [value, setValue] = useState(initialText);

  const submitHandler = (e) => {
    e.preventDefault();
    formSubmitHanlder(value);
    setValue("");
  };

  return (
    <form onSubmit={submitHandler} className="w-full">
      <div className="flex flex-col items-end border-2 border-black rounded-2xl p-4 bg-[#f8f8f8] focus-within:shadow-[6px_6px_0px_#000] transition-all">
        <textarea
          className="text-black w-full focus:outline-none bg-transparent font-medium placeholder:text-gray-400"
          rows="5"
          placeholder="Leave your comment here..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="flex flex-col-reverse gap-y-2 items-center gap-x-3 pt-4 min-[420px]:flex-row">
          {formCancelHandler && (
            <button
              onClick={formCancelHandler}
              className="px-6 py-2.5 rounded-xl border-2 border-black font-black uppercase text-xs tracking-widest text-black hover:bg-red-50 transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            disabled={loading}
            type="submit"
            className="px-8 py-3 rounded-xl bg-black text-white font-black uppercase text-xs tracking-[0.2em] border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.3)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : btnLabel}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;

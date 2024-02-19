import './yearselector.css';

/**
 * YearSelector component for displaying a navigation bar with buttons to change the page.
 *
 * @component
 * @param {number} page - The current page number.
 * @param {function} setPage - Function to set the current page.
 * @param {ReactNode} children - Content to display in the component.
 * @param {function} loading - Function to handle loading state.
 * @param {number} lastPage - The last page number.
 * @returns {JSX.Element} Rendered YearSelector component.
 */
export default function YearSelector({ page, setPage, children, loading, lastPage }) {
  // SVG path for the arrow icon.
  const arrow =
    'M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c' +
    '-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303' +
    ',0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547' +
    ',0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z';

  return (
    <div className="yearselector">
      {/* Button for navigating to the next page. */}
      <button className="yearselector-btn"
        onClick={() => {
          if (page === lastPage) {
            return;
          }
          loading();
          setPage(page + 1);
        }}
      >
        <svg className="button-icon" viewBox="0 0 20 20">
          <path
            fill="none"
            d={arrow}
          />
        </svg>
      </button>
      
      {/* Label displaying the content (children) of the component. */}
      <div className="yearselector-lbl">{children}</div>
      
      {/* Button for navigating to the previous page. */}
      <button id="next"
        className="yearselector-btn"
        onClick={() => {
          if (page === 1) {
            return;
          }
          loading();
          setPage(page - 1);
        }}
      >
        <svg className="button-icon" viewBox="0 0 20 20">
          <path
            fill="none"
            d={arrow}
          />
        </svg>
      </button>
    </div>
  );
}
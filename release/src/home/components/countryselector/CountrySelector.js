import ReactFlagsSelect from 'react-flags-select';
import './countryselector.css';

/**
 * CountrySelector component for displaying a flag-based country selector.
 *
 * @component
 * @param {string} selected - The code of the selected country.
 * @param {function} onSelect - Function to handle country selection.
 * @param {string} id - Optional ID for the component.
 * @returns {JSX.Element} Rendered CountrySelector component.
 */
function CountrySelector({ selected, onSelect, id }) {
  return (
    <div className="countryselector" id={id}>
      {/* ReactFlagsSelect component for displaying flags and handling country selection. */}
      <ReactFlagsSelect
        selected={selected}
        onSelect={onSelect}
      />
    </div>
  );
}

export default CountrySelector;
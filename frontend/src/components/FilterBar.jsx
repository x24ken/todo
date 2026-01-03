export default function FilterBar({ currentFilter, onFilterChange }) {
  const filters = [
    { value: 'all', label: 'すべて' },
    { value: 'active', label: '未完了' },
    { value: 'completed', label: '完了' },
  ];

  return (
    <div className="filter-bar">
      {filters.map(filter => (
        <button
          key={filter.value}
          className={`filter-btn ${currentFilter === filter.value ? 'active' : ''}`}
          onClick={() => onFilterChange(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

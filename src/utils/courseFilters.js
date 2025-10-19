export const normalizeCategory = (value) => {
  if (!value) {
    return '';
  }

  const normalizedValue = value
    .toString()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

  if (normalizedValue === 'all') {
    return 'all';
  }

  return normalizedValue.replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
};

export const normalizeSearchTerm = (value) => {
  if (!value) {
    return '';
  }

  return value.toString().toLowerCase().trim();
};

export const matchesSearch = (text, searchTerm) => {
  if (searchTerm === '') {
    return true;
  }

  return (text ?? '').toLowerCase().includes(searchTerm);
};

export const evaluateCourseGroups = (groups, searchTermInput, selectedCategoryInput) => {
  const searchTerm = normalizeSearchTerm(searchTermInput);
  const selectedCategoryKey = normalizeCategory(selectedCategoryInput) || 'all';

  let totalVisible = 0;

  const results = groups.map(({ category, items }) => {
    const matchesCategory = selectedCategoryKey === 'all' || category === selectedCategoryKey;

    if (!matchesCategory) {
      return {
        matchesCategory,
        visibleCount: 0,
        itemVisibilities: items.map(() => false),
      };
    }

    const itemVisibilities = items.map(({ text }) => matchesSearch(text, searchTerm));
    const visibleCount = itemVisibilities.reduce((count, isVisible) => (isVisible ? count + 1 : count), 0);

    totalVisible += visibleCount;

    return {
      matchesCategory,
      visibleCount,
      itemVisibilities,
    };
  });

  return {
    totalVisible,
    groups: results,
  };
};

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const getExcerpt = (post: { excerpt: string }) => {
    const raw = post.excerpt?.replace(/<[^>]+>/g, '') || 'No desc...';
    return raw.substring(0, 150) + '...';
};

export {
    getExcerpt,
    formatDate
}
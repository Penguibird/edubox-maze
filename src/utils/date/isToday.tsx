export default (d: Date) => {
  const t = new Date();
  return (t.getDate() == d.getDate() && t.getMonth() == d.getMonth() && t.getFullYear() == d.getFullYear());
};

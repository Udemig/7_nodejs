const Doc = async ({ params }) => {
  const { slug } = await params;

  return (
    <div className="page">
      <h1>Belge Detay Sayfası</h1>

      {slug.map((param) => (
        <p className="font-bold">{param}</p>
      ))}
    </div>
  );
};

export default Doc;

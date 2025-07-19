const Description = ({ text }) => {
  return (
    <div className="bg-gray-100 p-4 rounded m-2">
      <h2 className="text-xl font-bold mb-2">AI Description</h2>
      <p>{text}</p>
    </div>
  );
};

export default Description;

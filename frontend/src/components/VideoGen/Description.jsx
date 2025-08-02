const Description = ({ text }) => {
  return (
    <div className="bg-gray-300/75 p-4 rounded mt-6 w-2/3 mx-auto border-2 border-black/40 relative z-20">
      {text ? (
        <div>
          <h3 className="text-xl font-bold mb-2 text-black">AI Description</h3>
          <p>{text}</p>
        </div>
      ) : (
        <h3 className="text-xl font-bold mb-2 text-black">AI is Thinking...</h3>
      )}
    </div>
  );
};

export default Description;

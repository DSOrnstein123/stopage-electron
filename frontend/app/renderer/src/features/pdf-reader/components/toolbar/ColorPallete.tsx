const ColorPallete = () => {
  return (
    <button
      className="border"
      onClick={() => {
        const selection = window.getSelection();
        const selectedText = selection?.toString().trim();
      }}
    >
      yellow
    </button>
  );
};

export default ColorPallete;

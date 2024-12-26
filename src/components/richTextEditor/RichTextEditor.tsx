import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RichTextEditor = ({ value, onChange, style }: any) => {
    return (
        <ReactQuill
            theme="snow"
            value={value}
            onChange={onChange}
            className={style}
            placeholder="Write the product description here..."
            modules={{
                toolbar: [
                    [{ header: [1, 2, 3, false] }], // Header options
                    ["bold", "italic", "underline", "strike"], // Basic text styling
                    [{ list: "ordered" }, { list: "bullet" }], // Ordered and unordered lists
                    ["clean"], // Clear formatting
                ],
            }}
            formats={[
                "header",
                "bold",
                "italic",
                "underline",
                "strike",
                "list",
                "bullet",
            ]}
        />
    );
};

export default RichTextEditor;
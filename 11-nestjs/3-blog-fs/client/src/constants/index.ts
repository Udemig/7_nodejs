const registerInitialValues = {
  username: "",
  email: "",
  password: "",
};

const loginInitialValues = {
  username: "",
  password: "",
};

const mdeOptions = {
  toolbar: [
    "bold",
    "italic",
    "heading",
    "|",
    "quote",
    "unordered-list",
    "ordered-list",
    "|",
    "link",
    "image",
    "code",
    "|",
    "preview",
  ],
  previewClass: ["bg-zinc-100", "text-black", "p-4", "rounded-md"],
  placeholder: "Not içeriğini yazınız...",
} as const;

export { registerInitialValues, loginInitialValues, mdeOptions };

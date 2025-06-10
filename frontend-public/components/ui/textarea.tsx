const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    {...props}
    className={"border rounded px-3 py-2 " + (props.className || "")}
  />
);

export default Textarea;

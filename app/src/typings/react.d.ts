namespace React {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // extends React's HTMLAttributes
  }
  interface HTMLAttributes<T> {
    preset?: string;
  }
}


export interface HTTPStatusCode {
  code: number;
  message: string;
}

export type APIResponse<T> = {
  status: HTTPStatusCode;
  data?: T;
};

export const HTTPStatusCode: { [k: string]: HTTPStatusCode } = {
  _100: {
    code: 100,
    message: "Continue",
  },
  _101: {
    code: 101,
    message: "Switching Protocol",
  },
  _102: {
    code: 102,
    message: "Processing",
  },
  _103: {
    code: 103,
    message: "Early Hints",
  },
  _200: {
    code: 200,
    message: "OK",
  },
  _201: {
    code: 201,
    message: "Created",
  },
  _202: {
    code: 202,
    message: "Accepted",
  },
  _203: {
    code: 203,
    message: "Non-Authoritative Information",
  },
  _204: {
    code: 204,
    message: "No Content",
  },
  _205: {
    code: 205,
    message: "Reset Content",
  },
  _206: {
    code: 206,
    message: "Partial Content",
  },
  _207: {
    code: 207,
    message: "Multi-Status",
  },
  _208: {
    code: 208,
    message: "Already Reported",
  },
  _226: {
    code: 226,
    message: "IM Used",
  },
  _300: {
    code: 300,
    message: "Multiple Choice",
  },
  _301: {
    code: 301,
    message: "Moved Permanently",
  },
  _302: {
    code: 302,
    message: "Found",
  },
  _303: {
    code: 303,
    message: "See Other",
  },
  _304: {
    code: 304,
    message: "Not Modified",
  },
  _305: {
    code: 305,
    message: "Use Proxy ",
  },
  _306: {
    code: 306,
    message: "unused",
  },
  _307: {
    code: 307,
    message: "Temporary Redirect",
  },
  _308: {
    code: 308,
    message: "Permanent Redirect",
  },
  _400: {
    code: 400,
    message: "Bad Request",
  },
  _401: {
    code: 401,
    message: "Unauthorized",
  },
  _402: {
    code: 402,
    message: "Payment Required ",
  },
  _403: {
    code: 403,
    message: "Forbidden",
  },
  _404: {
    code: 404,
    message: "Not Found",
  },
  _405: {
    code: 405,
    message: "Method Not Allowed",
  },
  _406: {
    code: 406,
    message: "Not Acceptable",
  },
  _407: {
    code: 407,
    message: "Proxy Authentication Required",
  },
  _408: {
    code: 408,
    message: "Request Timeout",
  },
  _409: {
    code: 409,
    message: "Conflict",
  },
  _410: {
    code: 410,
    message: "Gone",
  },
  _411: {
    code: 411,
    message: "Length Required",
  },
  _412: {
    code: 412,
    message: "Precondition Failed",
  },
  _413: {
    code: 413,
    message: "Payload Too Large",
  },
  _414: {
    code: 414,
    message: "URI Too Long",
  },
  _415: {
    code: 415,
    message: "Unsupported Media Type",
  },
  _416: {
    code: 416,
    message: "Range Not Satisfiable",
  },
  _417: {
    code: 417,
    message: "Expectation Failed",
  },
  _418: {
    code: 418,
    message: "I’m a teapot",
  },
  _421: {
    code: 421,
    message: "Misdirected Request",
  },
  _422: {
    code: 422,
    message: "Unprocessable Entity",
  },
  _423: {
    code: 423,
    message: "Locked",
  },
  _424: {
    code: 424,
    message: "Failed Dependency",
  },
  _425: {
    code: 425,
    message: "Too Early ",
  },
  _426: {
    code: 426,
    message: "Upgrade Required",
  },
  _428: {
    code: 428,
    message: "Precondition Required",
  },
  _429: {
    code: 429,
    message: "Too Many Requests",
  },
  _431: {
    code: 431,
    message: "Request Header Fields Too Large",
  },
  _451: {
    code: 451,
    message: "Unavailable For Legal Reasons",
  },
  _500: {
    code: 500,
    message: "Internal Server Error",
  },
  _501: {
    code: 501,
    message: "Not Implemented",
  },
  _502: {
    code: 502,
    message: "Bad Gateway",
  },
  _503: {
    code: 503,
    message: "Service Unavailable",
  },
  _504: {
    code: 504,
    message: "Gateway Timeout",
  },
  _505: {
    code: 505,
    message: "HTTP Version Not Supported",
  },
  _506: {
    code: 506,
    message: "Variant Also Negotiates",
  },
  _507: {
    code: 507,
    message: "Insufficient Storage",
  },
  _508: {
    code: 508,
    message: "Loop Detected",
  },
  _510: {
    code: 510,
    message: "Not Extended",
  },
  _511: {
    code: 511,
    message: "Network Authentication Required",
  },
};

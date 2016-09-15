// credit to @ronco
// and https://gist.github.com/jlong/2428561
export function parse(url) {
  const parser = document.createElement('a');
  parser.href = url;
  // This api is very similar to node's url
  return {
    protocol: parser.protocol,
    host: parser.host,
    port: parser.port,
    hostname: parser.hostname,
    hash: parser.hash,
    search: parser.search,
    pathname: parser.pathname,
    origin: parser.origin,
    href: parser.href,
  };
}

const query = (select, root = document, visited = []) => {
  if (root === null) return;
  if (root.className === select) {
    return root;
  } else {
    let result;
    root.childNodes.forEach((node) => {
      if (result) return;
      if (!visited.includes(node)) {
        visited.push(node);
        root = node;
        result = query(select, root);
      }
    });
    return result;
  }
};
